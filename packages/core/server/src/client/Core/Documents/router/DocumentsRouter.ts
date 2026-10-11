import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {GetTermsAndConditionsController} from '@copor/core/client/Core/Documents/GetTermsAndConditions/GetTermsAndConditionsController';
import {GetImpressumController} from '@copor/core/client/Core/Documents/GetImpressum/GetImpressumController';

export class DocumentsRouter extends BaseRouter {
	initializeRoutes(): void {
		this.get('/TermsAndConditions/', GetTermsAndConditionsController);
		this.get('/Impressum/', GetImpressumController);
	}
}
