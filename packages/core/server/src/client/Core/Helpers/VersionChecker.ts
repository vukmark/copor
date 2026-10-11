import {OutdatedVersionException} from '@copor/core/domain/Core/Exceptions/OutdatedVersionException';

export class VersionChecker {


	public static validateVersion(clientVersion: string): void {
		if (!clientVersion) {
			throw new Error('Version header is missing');
		}

		if (this.isVersionOutdated(clientVersion)) {
			throw new OutdatedVersionException('Your version is outdated. Please update the application.');
		}
	}

	private static isVersionOutdated(clientVersion: string): boolean {
		const minimumVersion = process!.env.MINIMUM_VERSION as string;
		const clientParts = clientVersion.split('.').map(Number);
		const minimumParts = minimumVersion.split('.').map(Number);

		for (let i = 0; i < Math.max(clientParts.length, minimumParts.length); i++) {
			const clientPart = clientParts[i] || 0;
			const minimumPart = minimumParts[i] || 0;

			if (clientPart < minimumPart) {
				return true;
			} else if (clientPart > minimumPart) {
				return false;
			}
		}

		return false;
	}
}
