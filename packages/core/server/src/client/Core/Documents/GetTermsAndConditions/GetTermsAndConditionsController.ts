import {StaticDocumentController} from '@copor/core/client/Core/Documents/StaticDocumentController';

export class GetTermsAndConditionsController extends StaticDocumentController {
	protected getFileName(): string {
		return 'TermsAndConditions.pdf';
	}
}
