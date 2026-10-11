import {SendQueuedEmailsRepo} from '@copor/core/domain/Core/EmailOutbox/repository/SendQueuedEmailsRepo';
import {EmailSender} from '@copor/core/domain/Core/EmailOutbox/repository/EmailSender';
import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SendQueuedEmailsDTO} from '@copor/core/domain/Core/EmailOutbox/interactor/dto/SendQueuedEmailsDTO';
import {EmailNotSentException} from '@copor/core/domain/Core/Exceptions/invalid/EmailNotSentException';

export interface SendQueuedEmailsDependencies {
	repo: SendQueuedEmailsRepo;
	emailSender: EmailSender;
}

export class SendQueuedEmails extends ExecuteUseCase<SendQueuedEmailsDTO, SendQueuedEmailsDependencies, void> {
	async execute(): Promise<void> {
		const emails = await this.repository.repo.getReadyToSend(
			this.input.limit
		);

		for (const email of emails) {
			try {
				await this.repository.repo.markAsSending(email.id);

				await this.repository.emailSender.sendRawEmail({
					receiver: email.receiver,
					subject: email.subject,
					html: email.payload
				});

				await this.repository.repo.markAsSent(email.id);
			} catch (error) {
				await this.repository.repo.markAsFailedAttempt(
					email.id,
					String(error)
				);
				//throw new EmailNotSentException();
				console.log(error);
			}
		}
	}
}