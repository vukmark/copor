import fs from 'node:fs/promises';
import {SystemFileHelper} from '@copor/core/client/Core/Helpers/SystemFileHelper';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {AppTimeZoneStore} from '@copor/core/client/Core/Helpers/AppTimeZoneStore';
import {GetTimeZoneSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetTimeZoneSystemSettingsDTO';

export class SetupGlobalConfigurationFiles {
	async createFilesIfNotExists() : Promise<void> {
		await this.createSMTPIfNotExists();
		await this.createGlobalIfNotExists();
		await this.createDisplayIfNotExists();
		await this.createWorkflowIfNotExists();
		await this.createNotifierIfNotExists();
		await this.createPasswordIfNotExists();
		await this.createTimeZoneIfNotExists();
		await this.loadTimeZoneIntoStore();
	}

	private async createSMTPIfNotExists() : Promise<void> {
		const smtpPath = SystemFileHelper.settingsPath(SystemSettingsType.SMTP);
		const smtpExists = await SystemFileHelper.fileExists(smtpPath);

		if (!smtpExists) {
			await fs.copyFile(SystemFileHelper.settingsDistPath(SystemSettingsType.SMTP), smtpPath);
		}
	}

	private async createGlobalIfNotExists() : Promise<void> {
		const path = SystemFileHelper.settingsPath(SystemSettingsType.GLOBAL);
		const doesExist = await SystemFileHelper.fileExists(path);

		if (!doesExist) {
			await fs.copyFile(SystemFileHelper.settingsDistPath(SystemSettingsType.GLOBAL), path);
		}
	}

	private async createTimeZoneIfNotExists() : Promise<void> {
		const path = SystemFileHelper.settingsPath(SystemSettingsType.TIME_ZONE);
		const doesExist = await SystemFileHelper.fileExists(path);

		if (!doesExist) {
			await fs.copyFile(SystemFileHelper.settingsDistPath(SystemSettingsType.TIME_ZONE), path);
		}
	}

	private async loadTimeZoneIntoStore() : Promise<void> {
		try {
			const path = SystemFileHelper.settingsPath(SystemSettingsType.TIME_ZONE);
			const content = await fs.readFile(path, 'utf-8');
			const settings = JSON.parse(content) as GetTimeZoneSystemSettingsDTO;

			if (settings.timeZone) {
				AppTimeZoneStore.set(settings.timeZone);
			}
		} catch (err) {
			console.error('Failed to load time zone system settings', err);
		}
	}

	private async createDisplayIfNotExists() : Promise<void> {
		const path = SystemFileHelper.settingsPath(SystemSettingsType.DISPLAY);
		const doesExist = await SystemFileHelper.fileExists(path);

		if (!doesExist) {
			await fs.copyFile(SystemFileHelper.settingsDistPath(SystemSettingsType.DISPLAY), path);
		}
	}

	private async createWorkflowIfNotExists() : Promise<void> {
		const path = SystemFileHelper.settingsPath(SystemSettingsType.WORKFLOW);
		const doesExist = await SystemFileHelper.fileExists(path);

		if (!doesExist) {
			await fs.copyFile(SystemFileHelper.settingsDistPath(SystemSettingsType.WORKFLOW), path);
		}
	}

	private async createNotifierIfNotExists() : Promise<void> {
		const path = SystemFileHelper.settingsPath(SystemSettingsType.NOTIFIER);
		const doesExist = await SystemFileHelper.fileExists(path);

		if (!doesExist) {
			await fs.copyFile(SystemFileHelper.settingsDistPath(SystemSettingsType.NOTIFIER), path);
		}
	}

	private async createPasswordIfNotExists() : Promise<void> {
		const path = SystemFileHelper.settingsPath(SystemSettingsType.PASSWORD);
		const doesExist = await SystemFileHelper.fileExists(path);

		if (!doesExist) {
			await fs.copyFile(SystemFileHelper.settingsDistPath(SystemSettingsType.PASSWORD), path);
		}
	}
}