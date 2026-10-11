import fs from 'node:fs/promises';
import path from 'node:path';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';

export class SystemFileHelper {
	static async fileExists(path: string): Promise<boolean> {
		try {
			await fs.access(path);
			return true;
		} catch {
			return false;
		}
	}

	static filePath(destinations: string[]) {
		return path.join(
			process.cwd(),
			... destinations
		);
	}

	static settingsPath(settingsFile: SystemSettingsType): string {
		return SystemFileHelper.filePath(['settings', settingsFile + '.json']);
	}

	static settingsDistPath(settingsFile: SystemSettingsType): string {
		return SystemFileHelper.filePath(['settings', settingsFile + '.json.dist']);
	}
}