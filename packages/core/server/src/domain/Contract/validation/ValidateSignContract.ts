import {ValidationWithPermissionAndRepo} from '../../Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '../../Core/Validations/Validators/Validator';
import {ValidateContractType} from './validator/ValidateContractType';
import {ValidateCanSignContract, ValidateCanSignContractContext} from './validator/ValidateCanSignContract';
import {ValidateSignContractDTO} from './dto/ValidateSignContractDTO';
import {ValidateSignContractRepo} from '../repository/ValidateSignContractRepo';

export class ValidateSignContract
	extends ValidationWithPermissionAndRepo<ValidateSignContractDTO, ValidateSignContractRepo, ValidateCanSignContractContext> {
	public getValidators(): Validator[] {
		const context: ValidateCanSignContractContext = {userId: this.input.userId};

		return [
			new ValidateCanSignContract(this.permissionRepo, this.input.userId, context),
			new ValidateContractType(this.storageRepo, this.input.contractType)
		];
	}
}