import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {IsForbiddenAttachmentForToDoAccessRepo} from '../repository/IsForbiddenAttachmentForToDoAccessRepo';
import {ForbiddenToDoAttachmentAccessException} from '../exception/ForbiddenToDoAttachmentAccessException';

export interface ValidateCanAccessAttachmentForToDoInput {
	attachmentId: string;
	actorId: string;
}

export class ValidateCanAccessAttachmentForToDo implements Validator {
	private readonly repository: IsForbiddenAttachmentForToDoAccessRepo;
	private readonly input: ValidateCanAccessAttachmentForToDoInput;

	constructor(repository: IsForbiddenAttachmentForToDoAccessRepo, input: ValidateCanAccessAttachmentForToDoInput) {
		this.repository = repository;
		this.input = input;
	}

	public async validate(): Promise<void> {
		if (await this.repository.isForbiddenAttachmentForToDoAccess(this.input.attachmentId, this.input.actorId))
			throw new ForbiddenToDoAttachmentAccessException();
	}
}
