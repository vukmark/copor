import {BaseController} from '@copor/core/client/Core/BaseController';
import {PasswordRegexReqBodyDTO} from '@copor/core/client/Core/dto/PasswordRegexReqBodyDTO';
import {PasswordValidationDTO} from '@copor/core/client/Core/PasswordValidation/PasswordValidationDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ValidatePasswordInput} from '@copor/core/domain/Core/Validations/ValidatePasswordInput';
import {
	GetPasswordPolicyRepoPicker
} from '@copor/core/client/Core/PasswordPolicy/repo/repoPicker/GetPasswordPolicyRepoPicker';

export class PasswordValidationController extends BaseController<PasswordRegexReqBodyDTO, PasswordValidationDTO> {
	async getResponse() {
		const {password, confirmPassword, userName, email, firstName, lastName} = this.request.body;

		if (!password && !confirmPassword) {
			this.response.status(200).send();
			return;
		}

		const passwordPolicyRepo = this.container.getNewRepoPicker(GetPasswordPolicyRepoPicker);

		const validator = this.container.getValidator(
			ValidatePasswordInput,
			{password, confirmPassword, userName, email, firstName, lastName},
			passwordPolicyRepo,
			undefined
		);

		const result = await validator.validate();


		if (result instanceof ErrorList) {
			this.next(result);
			return;
		}

		this.response.status(200).send();
	}
}
