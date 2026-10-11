import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import i18next from 'i18next';
import {LoginResponseViewModel} from '@copor/core/client/Login/Login/LoginResponseViewModel';
import {LoginPresenterInput} from '@copor/core/client/Login/Login/dto/LoginPresenterInput';

export class LoginPresenter extends PresenterInstance<LoginPresenterInput, LoginResponseViewModel> {
	present(): LoginResponseViewModel {
		const {contractResult, authToken, refreshToken, role} = this.input;

		if (!contractResult) {
			return {authToken, refreshToken};
		}

		i18next.setDefaultNamespace('login');

		const missingContracts
			= contractResult.missingContracts.map((c) => c.name)
				.join(` ${i18next.t('translationStringList.AND')} `);

		if (role === RoleType.ADMIN) {
			return {
				authToken,
				refreshToken,
				message: i18next.t('translationStringList.ADMIN_NOT_SIGNED_CONTRACTS', {
					tenantName: contractResult.tenantName,
					missingContracts
				}),
				redirect: 'admin/contracts/form'
			};
		}

		return {
			authToken,
			refreshToken,
			error: i18next.t('translationStringList.USER_NOT_SIGNED_CONTRACTS', {
				tenantName: contractResult.tenantName,
				missingContracts
			})
		};
	}
}
