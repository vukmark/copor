import {SendRawEmailDTO} from '@copor/core/domain/Core/EmailOutbox/interactor/dto/SendRawEmailDTO';

export interface EmailSender {
	sendRawEmail(input: SendRawEmailDTO): Promise<void>;
}