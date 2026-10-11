import crypto from 'crypto';
import http2 from 'http2';

// FCM cannot deliver to a PushKit VoIP token - Apple requires those to go through a
// direct APNs connection with `apns-push-type: voip`. This sender exists solely for
// that path (see PushNotificationHelper, which routes NotificationTokenType.IOS_VOIP
// tokens here instead of through Firebase). Configuration (an APNs Auth Key) is a
// one-time setup step in the Apple Developer portal that this project may not have
// done yet, so a missing config logs a warning and no-ops rather than throwing -
// the rest of push notifications work fine without it.
interface ApnsVoipConfig {
	keyId: string;
	teamId: string;
	authKey: string;
	bundleId: string;
}

let cachedToken: {jwt: string; issuedAt: number} | undefined;
let warnedAboutMissingConfig = false;

const TOKEN_LIFETIME_MS = 55 * 60 * 1000;

export class ApnsVoipSender {
	public static async send(deviceToken: string, data: Record<string, string>): Promise<void> {
		const config = this.getConfig();

		if (!config) {
			if (!warnedAboutMissingConfig) {
				warnedAboutMissingConfig = true;
				console.warn(
					'ApnsVoipSender: APNS_VOIP_KEY_ID / APNS_VOIP_TEAM_ID / APNS_VOIP_AUTH_KEY / ' +
					'APNS_VOIP_BUNDLE_ID are not fully configured - skipping VoIP push delivery.'
				);
			}
			return;
		}

		const jwt = this.getProviderToken(config);
		const payload = JSON.stringify({aps: {'content-available': 1}, ...data});

		await this.postToApns(deviceToken, jwt, config.bundleId, payload);
	}

	private static getConfig(): ApnsVoipConfig | undefined {
		const keyId = process.env.APNS_VOIP_KEY_ID;
		const teamId = process.env.APNS_VOIP_TEAM_ID;
		const authKey = process.env.APNS_VOIP_AUTH_KEY;
		const bundleId = process.env.APNS_VOIP_BUNDLE_ID;

		if (!keyId || !teamId || !authKey || !bundleId) {
			return undefined;
		}

		return {keyId, teamId, authKey: authKey.replace(/\\n/g, '\n'), bundleId};
	}

	private static getProviderToken(config: ApnsVoipConfig): string {
		if (cachedToken && Date.now() - cachedToken.issuedAt < TOKEN_LIFETIME_MS) {
			return cachedToken.jwt;
		}

		const issuedAt = Math.floor(Date.now() / 1000);
		const header = this.base64Url(JSON.stringify({alg: 'ES256', kid: config.keyId}));
		const claims = this.base64Url(JSON.stringify({iss: config.teamId, iat: issuedAt}));
		const unsignedToken = `${header}.${claims}`;
		const signature = crypto.sign('sha256', Buffer.from(unsignedToken), {
			key: config.authKey,
			dsaEncoding: 'ieee-p1363'
		});
		const jwt = `${unsignedToken}.${signature.toString('base64url')}`;

		cachedToken = {jwt, issuedAt: Date.now()};

		return jwt;
	}

	private static base64Url(value: string): string {
		return Buffer.from(value).toString('base64url');
	}

	private static postToApns(deviceToken: string, jwt: string, bundleId: string, payload: string): Promise<void> {
		return new Promise((resolve) => {
			const client = http2.connect('https://api.push.apple.com:443');

			client.on('error', (error) => {
				console.error('ApnsVoipSender: connection error', error);
				resolve();
			});

			const req = client.request({
				':method': 'POST',
				':path': `/3/device/${deviceToken}`,
				authorization: `bearer ${jwt}`,
				'apns-topic': `${bundleId}.voip`,
				'apns-push-type': 'voip',
				'apns-priority': '10',
				'apns-expiration': '0'
			});

			req.setEncoding('utf8');

			let responseBody = '';
			let statusCode: number | undefined;

			req.on('response', (headers) => {
				statusCode = headers[':status'] as number;
			});
			req.on('data', (chunk) => {
				responseBody += chunk;
			});
			req.on('end', () => {
				if (statusCode !== undefined && statusCode >= 400) {
					console.error('ApnsVoipSender: APNs rejected the VoIP push', {statusCode, responseBody});
				}
				client.close();
				resolve();
			});
			req.on('error', (error) => {
				console.error('ApnsVoipSender: request error', error);
				client.close();
				resolve();
			});

			req.end(payload);
		});
	}
}
