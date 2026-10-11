import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {IsForbiddenToDoAttachmentAccessRepo} from '../repository/IsForbiddenToDoAttachmentAccessRepo';
import {ForbiddenToDoAttachmentAccessException} from '../exception/ForbiddenToDoAttachmentAccessException';

export interface ValidateCanAccessToDoForAttachmentInput {
	todoId: string;
	actorId: string;
}

export class ValidateCanAccessToDoForAttachment implements Validator {
	private readonly repository: IsForbiddenToDoAttachmentAccessRepo;
	private readonly input: ValidateCanAccessToDoForAttachmentInput;

	constructor(repository: IsForbiddenToDoAttachmentAccessRepo, input: ValidateCanAccessToDoForAttachmentInput) {
		this.repository = repository;
		this.input = input;
	}

	public async validate(): Promise<void> {
		if (await this.repository.isForbiddenToDoAttachmentAccess(this.input.todoId, this.input.actorId))
			throw new ForbiddenToDoAttachmentAccessException();
	}
}
