import {ValidateCanGetContractTypeList}
	from '@copor/core/domain/Components/ContractType/validations/validators/ValidateCanGetContractTypeList';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';

export class ValidateGetContractTypeList extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetContractTypeList(this.permissionRepo, this.input)
		];
	}
}
