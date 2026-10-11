import {Emailer} from '@copor/core/client/Core/Email/Emailer';
import {SystemSettingsFactory} from '@copor/core/client/SystemSettings/GetSystemSettings/SystemSettingsFactory';
import {
	GetSMTPSystemSettingsDTO,
	SmtpAuthMethod,
	SmtpConnectionSecurity
} from '@copor/core/domain/SystemSettings/interactor/dto/GetSMTPSystemSettingsDTO';
import {Email} from '@copor/core/domain/Core/global/Email/Email';

const sendMail = jest.fn().mockResolvedValue(undefined);
const createTransport = jest.fn().mockReturnValue({sendMail});

jest.mock('nodemailer', () => ({
	createTransport: (options: unknown) => createTransport(options)
}));

jest.mock('i18next', () => ({
	setDefaultNamespace: jest.fn(),
	t: jest.fn().mockReturnValue('"signature"')
}));

describe('Emailer', () => {
	let emailer: Emailer;
	let baseSettings: GetSMTPSystemSettingsDTO;

	beforeEach(() => {
		jest.clearAllMocks();
		emailer = new Emailer();
		baseSettings = {
			smtpHost: 'mail.space421.de',
			smtpPort: 465,
			smtpEmail: 'test@example.com',
			smtpPassword: 'secret',
			smtpConnectionSecurity: SmtpConnectionSecurity.sslTls,
			smtpAuthMethod: SmtpAuthMethod.normalPassword
		};
	});

	const sendTestEmail = async () => {
		const email: jest.Mocked<Email> = {
			getContent: jest.fn().mockReturnValue('body'),
			getSubject: jest.fn().mockReturnValue('subject'),
			getReceiver: jest.fn().mockReturnValue('receiver@example.com')
		};

		await emailer.sendEmail(email);
	};

	it('uses implicit TLS for SSL/TLS connection security', async () => {
		jest.spyOn(SystemSettingsFactory, 'getSMTP').mockResolvedValue(baseSettings);

		await sendTestEmail();

		expect(createTransport).toHaveBeenCalledWith(expect.objectContaining({secure: true}));
	});

	it('forces STARTTLS for STARTTLS connection security', async () => {
		jest.spyOn(SystemSettingsFactory, 'getSMTP').mockResolvedValue({
			...baseSettings,
			smtpConnectionSecurity: SmtpConnectionSecurity.starttls
		});

		await sendTestEmail();

		expect(createTransport).toHaveBeenCalledWith(expect.objectContaining({secure: false, requireTLS: true}));
	});

	it('disables TLS for None connection security', async () => {
		jest.spyOn(SystemSettingsFactory, 'getSMTP').mockResolvedValue({
			...baseSettings,
			smtpConnectionSecurity: SmtpConnectionSecurity.none
		});

		await sendTestEmail();

		expect(createTransport).toHaveBeenCalledWith(expect.objectContaining({secure: false, ignoreTLS: true}));
	});

	it('sends credentials for Normal Password authentication', async () => {
		jest.spyOn(SystemSettingsFactory, 'getSMTP').mockResolvedValue(baseSettings);

		await sendTestEmail();

		expect(createTransport).toHaveBeenCalledWith(
			expect.objectContaining({auth: {user: baseSettings.smtpEmail, pass: baseSettings.smtpPassword}})
		);
	});

	it('omits auth entirely for No Authentication', async () => {
		jest.spyOn(SystemSettingsFactory, 'getSMTP').mockResolvedValue({
			...baseSettings,
			smtpAuthMethod: SmtpAuthMethod.none
		});

		await sendTestEmail();

		expect(createTransport).toHaveBeenCalledWith(expect.objectContaining({auth: undefined}));
	});
});
