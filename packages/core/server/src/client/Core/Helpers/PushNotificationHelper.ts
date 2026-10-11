import {GetNotificationTokenDTO}
	from '@copor/core/domain/Components/NotificationToken/interactor/dto/GetNotificationTokenDTO';
import {BaseMessage, getMessaging} from 'firebase-admin/messaging';
import {db} from '@copor/core/client/AppDataSource';
import {NotificationTokenType} from '@copor/core/domain/Core/enum/NotificationTokenType';

interface NotificationMessage extends BaseMessage {
	tokenList: GetNotificationTokenDTO[];
}

export interface PushNotificationResult {
	targetedDeviceCount: number;
	deliveredDeviceCount: number;
	failedDeviceCount: number;
	failureCodes: string[];
}

export class PushNotificationHelper {
	public static async send(message: NotificationMessage): Promise<PushNotificationResult> {
		let deliveredDeviceCount = 0;
		let failedDeviceCount = 0;
		const failureCodes = new Set<string>();

		for (const token of message.tokenList) {
			const notificationMessage = this.getNotificationMessage(message, token);

			try {
				await getMessaging().send(notificationMessage);
				deliveredDeviceCount++;
			} catch (error) {
				failedDeviceCount++;
				const errorCode = this.getErrorCode(error);
				failureCodes.add(errorCode);
				console.error('Error sending push notification:', {
					code: errorCode,
					message: error instanceof Error ? error.message : String(error),
					tokenType: token.type
				});

				if (this.isLikelyCredentialMismatch(errorCode)) {
					// Distinguishable from a single bad/expired token: this error
					// shape means the Admin SDK's Firebase project doesn't match the
					// project that issued the token (e.g. FIREBASE_ADMIN_KEY_FILE
					// pointing at a different Firebase project than the client app
					// is built against) — every send will fail the same way until
					// the credentials are fixed, not just this one token.
					console.error(
						'🚨 Push notification failed with a credential/argument error ' +
						`(${errorCode}) — this usually means the Firebase Admin SDK's ` +
						'service account belongs to a different Firebase project than ' +
						'the one the client app registers tokens against. Check ' +
						'FIREBASE_ADMIN_KEY_FILE\'s project_id against the app\'s Firebase config.'
					);
				}

				if (this.shouldDeleteToken(errorCode)) {
					try {
						await db.deleteFrom('notificationToken')
							.where('token', '=', token.token)
							.execute();
					} catch (deleteError) {
						console.error('Error deleting invalid notification token:', {
							message: deleteError instanceof Error ? deleteError.message : String(deleteError),
							tokenType: token.type
						});
					}
				}
			}
		}

		const result = {
			targetedDeviceCount: message.tokenList.length,
			deliveredDeviceCount,
			failedDeviceCount,
			failureCodes: [...failureCodes]
		};
		console.info('Firebase push result:', result);

		return result;
	}

	private static getNotificationMessage(message: NotificationMessage, token: GetNotificationTokenDTO) {
		const platformConfig = this.getPlatformConfig(message, token.type);

		if (message.notification) {
			return {
				notification: {
					title: message.notification?.title,
					body: message.notification?.body
				},
				data: message?.data,
				token: token.token,
				...platformConfig
			};
		}

		return {
			data: message?.data,
			token: token.token,
			...platformConfig
		};
	}

	private static getPlatformConfig(
		message: NotificationMessage,
		tokenType: NotificationTokenType
	): Pick<BaseMessage, 'android' | 'apns' | 'webpush'> {
		if (tokenType === NotificationTokenType.WEB) {
			return {webpush: message.webpush};
		}

		if (tokenType === NotificationTokenType.IOS) {
			return {apns: message.apns};
		}

		return {
			android: {
				...message.android,
				priority: 'high'
			}
		};
	}

	private static getErrorCode(error: unknown): string {
		if (typeof error === 'object' && error !== null && 'code' in error
			&& typeof error.code === 'string') {
			return error.code;
		}

		return 'messaging/unknown-error';
	}

	private static shouldDeleteToken(errorCode: string): boolean {
		return errorCode === 'messaging/invalid-registration-token'
			|| errorCode === 'messaging/registration-token-not-registered';
	}

	private static isLikelyCredentialMismatch(errorCode: string): boolean {
		return errorCode === 'messaging/invalid-argument'
			|| errorCode === 'messaging/mismatched-credential'
			|| errorCode === 'messaging/authentication-error'
			|| errorCode === 'messaging/third-party-auth-error'
			|| errorCode === 'messaging/sender-id-mismatch';
	}
}
