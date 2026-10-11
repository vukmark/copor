import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {PasswordValidationController} from '@copor/core/client/Core/PasswordValidation/PasswordValidationController';
import {GetPasswordPolicyController} from '@copor/core/client/Core/PasswordValidation/GetPasswordPolicyController';

export class PasswordValidationRouter extends BaseRouter {
	protected initializeRoutes(): void {
		this.post('/validate', PasswordValidationController);
		this.get('/policy', GetPasswordPolicyController);
	}
}