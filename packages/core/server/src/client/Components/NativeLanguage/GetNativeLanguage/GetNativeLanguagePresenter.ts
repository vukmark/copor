import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetNativeLanguageDTO} from '@copor/core/domain/Components/NativeLanguage/interactor/dto/GetNativeLanguageDTO';
import {GetNativeLanguageViewModel} from './GetNativeLanguageViewModel';

export class GetNativeLanguagePresenter extends PresenterInstance<GetNativeLanguageDTO, GetNativeLanguageViewModel> {
	present(): GetNativeLanguageViewModel {
		return {
			id: this.input.id,
			name: this.input.name,
			code: this.input.code,
			nativeName: this.input.nativeName,
			publishStatus: this.input.publishStatus
		};
	}
}
