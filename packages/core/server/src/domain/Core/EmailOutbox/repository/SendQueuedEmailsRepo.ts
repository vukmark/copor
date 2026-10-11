import {QueuedEmailDTO} from '@copor/core/domain/Core/EmailOutbox/interactor/dto/QueuedEmailDTO';

export interface SendQueuedEmailsRepo {
	getReadyToSend(limit: number): Promise<QueuedEmailDTO[]>;
	markAsSending(id: string): Promise<void>;
	markAsSent(id: string): Promise<void>;
	markAsFailedAttempt(id: string, errorMessage: string): Promise<void>;
}