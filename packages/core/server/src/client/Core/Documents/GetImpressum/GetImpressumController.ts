import {StaticDocumentController} from '@copor/core/client/Core/Documents/StaticDocumentController';

export class GetImpressumController extends StaticDocumentController {
	protected getFileName(): string {
		return 'Impressum.pdf';
	}
}
