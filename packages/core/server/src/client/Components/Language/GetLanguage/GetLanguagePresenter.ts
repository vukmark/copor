import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetLanguageDTO} from '@copor/core/domain/Components/Language/interactor/dto/GetLanguageDTO';
import {GetLanguageViewModel} from './GetLanguageViewModel';

export class GetLanguagePresenter extends PresenterInstance<GetLanguageDTO, GetLanguageViewModel> {
	present(): GetLanguageViewModel {
		return {
			id: this.input.id,
			name: this.input.name,
			code: this.input.code,
			nativeName: this.input.nativeName,
			publishStatus: this.input.publishStatus
		};
	}
}
