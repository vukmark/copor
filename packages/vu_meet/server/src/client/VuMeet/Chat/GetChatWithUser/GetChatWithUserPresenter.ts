import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';


export class GetChatWithUserPresenter
	extends PresenterInstance<string, string> {
	present(): string {
		return this.input;
	}
}
