import nodemailer from 'nodemailer';
import {Email} from '@copor/core/domain/Core/global/Email/Email';
import {
	GetSMTPSystemSettingsDTO,
	SmtpAuthMethod,
	SmtpConnectionSecurity
} from '@copor/core/domain/SystemSettings/interactor/dto/GetSMTPSystemSettingsDTO';
import {SystemSettingsFactory} from '@copor/core/client/SystemSettings/GetSystemSettings/SystemSettingsFactory';
import {EmailNotSentException} from '@copor/core/domain/Core/Exceptions/invalid/EmailNotSentException';
import i18next from 'i18next';

export class Emailer {
	async sendEmail(email: Email): Promise<void> {
		try {
			const systemSettings = await this.getSystemSettings();
			const transporter = this.getTransporter(systemSettings);

			const html = email.getContent().replace(/^\s*[\\/]*"\s*|[\\/]*"\s*$/g, '');

			const subjectInput = 'Copor - ' + email.getSubject();

			await transporter.sendMail({
				from: systemSettings.smtpEmail ?? 'no-reply@example.com',
				to: email.getReceiver(),
				subject: subjectInput,
				html: html + this.getSignature()
			});
			console.log(`Email sent to ${email.getReceiver()}`);
		} catch (error) {
			console.error('Error sending email:', error);
			throw new EmailNotSentException(String(error));
		}
	}
	public async sendRawEmail(input: {
		receiver: string;
		subject: string;
		html: string;
	}): Promise<void> {
		try {
			const systemSettings = await this.getSystemSettings();
			const transporter = this.getTransporter(systemSettings);

			const html = input.html.replace(/^\s*[\\/]*"\s*|[\\/]*"\s*$/g, '');

			const subjectInput = 'Copor - ' + input.subject;

			await transporter.sendMail({
				from: systemSettings.smtpEmail ?? 'no-reply@example.com',
				to: input.receiver,
				subject: subjectInput,
				html: html + this.getSignature()
			});
		} catch (error) {
			console.error('Error sending email:', error);
			throw new EmailNotSentException(String(error));
		}
	}
	private getTransporter(systemSettings: GetSMTPSystemSettingsDTO) {
		return nodemailer.createTransport({
			host: systemSettings.smtpHost ?? 'smtp.example.com',
			port: systemSettings.smtpPort ?? 587,
			...this.getConnectionSecurityOptions(systemSettings.smtpConnectionSecurity),
			auth: this.getAuthOptions(systemSettings)
		});
	}

	private getConnectionSecurityOptions(
		connectionSecurity: SmtpConnectionSecurity
	): {secure: boolean; requireTLS?: boolean; ignoreTLS?: boolean} {
		switch (connectionSecurity) {
			case SmtpConnectionSecurity.sslTls:
				return {secure: true};
			case SmtpConnectionSecurity.starttls:
				return {secure: false, requireTLS: true};
			case SmtpConnectionSecurity.none:
			default:
				return {secure: false, ignoreTLS: true};
		}
	}

	private getAuthOptions(
		systemSettings: GetSMTPSystemSettingsDTO
	): {user: string; pass: string} | undefined {
		if (systemSettings.smtpAuthMethod === SmtpAuthMethod.none)
			return undefined;

		return {
			user: systemSettings.smtpEmail ?? 'your-email@example.com',
			pass: systemSettings.smtpPassword ?? 'your-email-password'
		};
	}
	private async getSystemSettings() {
		return SystemSettingsFactory.getSMTP();
	}

	private getSignature(): string {
		i18next.setDefaultNamespace('default');
		const signature = i18next.t('translationStringList.EMAIL_SIGNATURE');
		const signatureForReturn = signature.replace(/^"|"$/g, '');

		return signatureForReturn;
	}
}

