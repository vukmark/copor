import {ValidateCanPrivateCreateToDo} from './validator/ValidateCanPrivateCreateToDo';
import {ValidateCreatePrivateToDoRepo} from '../repository/ValidateCreatePrivateToDoRepo';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateEmptyTitle} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyTitle';
import {ValidateCreatePrivateToDoDTO} from './dto/ValidateCreatePrivateToDoDTO';
import {ValidateTag} from '@copor/core/domain/Core/Validations/Validators/ValidateTag';

export class ValidateCreatePrivateToDo extends
	ValidationWithPermissionAndRepo<ValidateCreatePrivateToDoDTO, ValidateCreatePrivateToDoRepo> {
	private validators: Validator[] = [
		new ValidateCanPrivateCreateToDo(this.permissionRepo, this.input.actorId),
		new ValidateEmptyTitle(this.input.title)
	];

	public getValidators(): Validator[] {
		this.addValidationForOptionalParameters();
		return this.validators;
	}

	private addValidationForOptionalParameters(): void {
		this.addTagListValidator();
	}

	private addTagListValidator(): void {
		if (this.input.tagList) {
			this.input.tagList.forEach((tag) => {
				this.validators.push(new ValidateTag(this.storageRepo, tag));
			});
		}
	}
}
