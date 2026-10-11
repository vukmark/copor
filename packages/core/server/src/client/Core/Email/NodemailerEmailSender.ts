import {Emailer} from '@copor/core/client/Core/Email/Emailer';
import {SendRawEmailDTO} from '@copor/core/domain/Core/EmailOutbox/interactor/dto/SendRawEmailDTO';
import {EmailSender} from '@copor/core/domain/Core/EmailOutbox/repository/EmailSender';

export class NodemailerEmailSender implements EmailSender {
	private readonly emailer = new Emailer();

	async sendRawEmail(input: SendRawEmailDTO): Promise<void> {
		await this.emailer.sendRawEmail(input);
	}
}