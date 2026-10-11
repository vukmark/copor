import {BaseRouter} from '../../Core/BaseRouter';
import {UpdateUserLoginInformationController}
	from '@copor/core/client/AccountInformation/UpdateUserLoginInformation/UpdateUserLoginInformationController';
import {
	UpdatePersonalProfileImageController
} from '@copor/core/client/User/UpdatePersonalProfileImage/UpdatePersonalProfileImageController';
import {UpdateUserProfileImageController} from '@copor/core/client/User/UpdateUserProfileImage/UpdateUserProfileImageController';
import {
	DeleteUserProfileImageController
} from '@copor/core/client/User/DeleteUserProfileImage/DeleteUserProfileImageController';
import {MulterImageMiddleware} from '@copor/core/client/Core/Middleware/MulterImageMiddleware';
import {GetUserController} from '@copor/core/client/User/GetUser/GetUserController';
import {GetUserAccountInformationController}
	from '@copor/core/client/AccountInformation/GetUserAccountInformation/GetUserAccountInformationController';
import {GetUserListController} from '@copor/core/client/User/GetUserList/GetUserListController';
import {GetUserListTableController} from '@copor/core/client/User/GetUserListTable/GetUserListTableController';
import {UpdateAuthUserInformationController}
	from '@copor/core/client/AccountInformation/UpdateAuthUserInformation/UpdateAuthUserInformationController';
import {GetUserFormController} from '@copor/core/client/User/GetUserForm/GetUserFormController';
import {CreateUserFormController} from '@copor/core/client/User/CreateUserForm/CreateUserFormController';
import {
	CreateUserAccountInformationController
} from '@copor/core/client/User/CreateUser/CreateUserAccountInformationController';
import {ForgotPasswordController} from '@copor/core/client/User/PasswordReset/PasswordResetEmailCode/ForgotPasswordController';
import {VerifyResetCodeController} from '@copor/core/client/User/PasswordReset/VerifyResetCode/VerifyResetCodeController';
import {ResetPasswordController} from '@copor/core/client/User/PasswordReset/ResetPassword/ResetPasswordController';
import {ToggleUserActiveStatusController} from '@copor/core/client/User/ToggleUserActiveStatus/ToggleUserActiveStatusController';
import {RequestAccountDeletionController} from '@copor/core/client/User/RequestAccountDeletion/RequestAccountDeletionController';
import {CancelAccountDeletionController} from '@copor/core/client/User/CancelAccountDeletion/CancelAccountDeletionController';
import {DeleteUserController} from '@copor/core/client/User/DeleteUser/DeleteUserController';

export class UserRouter extends BaseRouter {
	protected initializeRoutes() {
		this.get('/form', CreateUserFormController);
		this.get('/form/:id', GetUserFormController);
		this.post('/', CreateUserAccountInformationController);
		this.patch('/change-password', UpdateUserLoginInformationController);
		this.patch('/auth-information', UpdateAuthUserInformationController);
		this.patch('/:id/active', ToggleUserActiveStatusController);
		this.patch('/deletion-requests', RequestAccountDeletionController);
		this.delete('/deletion-requests', CancelAccountDeletionController);
		this.delete('/image/:id', DeleteUserProfileImageController);
		this.delete('/image', DeleteUserProfileImageController);
		this.delete('/:id', DeleteUserController);
		this.router.post(
			'/personal-image',
			MulterImageMiddleware.single(this.container.appContext),
			(req, res, next) => {
				const controller = new UpdatePersonalProfileImageController(this.container, req, res, next);

				void controller.getResponse();
			}
		);
		this.router.post(
			'/image',
			MulterImageMiddleware.single(this.container.appContext),
			(req, res, next) => {
				const controller = new UpdateUserProfileImageController(this.container, req, res, next);

				void controller.getResponse();
			}
		);
		this.router.post(
			'/image/:id',
			MulterImageMiddleware.single(this.container.appContext),
			(req, res, next) => {
				const controller = new UpdateUserProfileImageController(this.container, req, res, next);

				void controller.getResponse();
			}
		);
		this.get('/account-full-info/:userId?', GetUserAccountInformationController);
		this.post('/list', GetUserListController);
		this.table(GetUserListTableController);
		this.get('/:id', GetUserController);

		this.post('/forgot-password/send-code', ForgotPasswordController);
		this.post('/forgot-password/verify-code', VerifyResetCodeController);
		this.post('/forgot-password/reset-password', ResetPasswordController);
	}
}
