import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {GetRegistrationStatusController} from '@copor/core/client/Registration/GetRegistrationStatusController';
import {RegisterController} from '@copor/core/client/Registration/RegisterController';
import {VerifyRegistrationController} from '@copor/core/client/Registration/VerifyRegistrationController';
import {ResendRegistrationCodeController} from '@copor/core/client/Registration/ResendRegistrationCodeController';

// All routes are public; keep JwtAuthenticationMiddleware.excludedEndpoints and
// frontend/lib/src/network/public_routes.dart in sync.
export class RegistrationRouter extends BaseRouter {
	protected initializeRoutes(): void {
		this.get('/status', GetRegistrationStatusController);
		this.post('/', RegisterController);
		this.post('/verify', VerifyRegistrationController);
		this.post('/resend-code', ResendRegistrationCodeController);
	}
}
