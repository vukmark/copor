import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateImage} from './validator/ValidateImage';
import {ValidateCanDeleteImage} from './validator/ValidateCanDeleteImage';
import {ValidateDeleteImageDTO} from './dto/ValidateDeleteImageDTO';
import {ValidateDeleteImageRepo} from '../repository/ValidateDeleteImageRepo';

export class ValidateDeleteImage extends ValidationWithPermissionAndRepo<ValidateDeleteImageDTO, ValidateDeleteImageRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeleteImage(this.permissionRepo, this.input.actorId),
			new ValidateImage(this.storageRepo, this.input.imageId)
		];
	}
}