import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';

export class FakeGetHtmlPagesInteractorRepo implements GetItem<string> {
	async load(): Promise<string> {
		return Promise.resolve('html page');
	}
}