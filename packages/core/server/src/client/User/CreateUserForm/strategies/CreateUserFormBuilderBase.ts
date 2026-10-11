import {Container} from '@copor/core/client/Interface/Container';
import {Presenter} from '@copor/core/client/Interface/Presenter';
import {GetFormViewModel} from '@copor/core/client/Core/Form/GetFormViewModel';
import {GetCountryList} from '@copor/core/domain/Components/Country/interactor/GetCountryList';
import {
	GetCountryListInteractorRepoPicker
} from '@copor/core/client/Components/Country/GetCountryList/repo/repoPicker/GetCountryListInteractorRepoPicker';
import {GetStateList} from '@copor/core/domain/Components/State/interactor/GetStateList';
import {
	GetStateListInteractorRepoPicker
} from '@copor/core/client/Components/State/GetStateList/repo/repoPicker/GetStateListInteractorRepoPicker';
import {
	GetNativeLanguageListInteractorRepoPicker
} from '@copor/core/client/Components/NativeLanguage/GetNativeLanguageList/repo/repoPicker/GetNativeLanguageListInteractorRepoPicker';
import {GetNativeLanguageList} from '@copor/core/domain/Components/NativeLanguage/interactor/GetNativeLanguageList';

export abstract class CreateUserFormBuilderBase {
	protected readonly container: Container;

	constructor(container: Container) {
		this.container = container;
	}

	protected async getCountryList() {
		const repo = this.container.getNewRepoPicker(GetCountryListInteractorRepoPicker);

		return this.container.getInteractor(GetCountryList, repo, {filters: []}).execute();
	}

	protected async getStateList(countryId?: string) {
		const repo = this.container.getNewRepoPicker(GetStateListInteractorRepoPicker);

		return this.container.getInteractor(GetStateList, repo, countryId ?? '').execute();
	}

	protected async getCitizenshipList() {
		const repo = this.container.getNewRepoPicker(GetCountryListInteractorRepoPicker);

		return this.container.getInteractor(GetCountryList, repo, {filters: []}).execute();
	}

	protected async getNativeLanguageList() {
		const repo = this.container.getNewRepoPicker(GetNativeLanguageListInteractorRepoPicker);

		return this.container.getInteractor(GetNativeLanguageList, repo, {filters: []}).execute();
	}

	abstract buildPresenter(): Promise<Presenter<GetFormViewModel>>;
}
