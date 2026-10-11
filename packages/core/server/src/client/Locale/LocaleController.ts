import {BaseController} from '../Core/BaseController';
import i18next from 'i18next';

export interface ResourceBundle {
	[key: string]: string | ResourceBundle;
}

interface LocalesParams {
	ns: string;
}

export class LocaleController extends BaseController<void, ResourceBundle> {
	getResponse() {
		const params: LocalesParams = this.request.params as LocalesParams;
		const ns = params.ns;
		const lng = this.request.language;

		const resources = i18next.getResourceBundle(lng, ns) as ResourceBundle;

		this.response.send(resources);
	}
}