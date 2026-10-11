import {Container} from '@copor/core/client/Interface/Container';
import {GetUserAccountInformationDTO} from '@copor/core/domain/User/interactor/dto/GetUserAccountInformationDTO';
import {Presenter} from '@copor/core/client/Interface/Presenter';
import {GetFormViewModel} from '@copor/core/client/Core/Form/GetFormViewModel';
import {GetStateList} from '@copor/core/domain/Components/State/interactor/GetStateList';
import {
	GetStateListInteractorRepoPicker
} from '@copor/core/client/Components/State/GetStateList/repo/repoPicker/GetStateListInteractorRepoPicker';
import {
	GetNativeLanguageListInteractorRepoPicker
} from '@copor/core/client/Components/NativeLanguage/GetNativeLanguageList/repo/repoPicker/GetNativeLanguageListInteractorRepoPicker';
import {GetNativeLanguageList} from '@copor/core/domain/Components/NativeLanguage/interactor/GetNativeLanguageList';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {CannotUpdateAccountException} from '@copor/core/domain/User/exception/CannotUpdateAccountException';
import {
	AccountInformationFormPresenterMap
} from '@copor/core/client/AccountInformation/AccountInformationFormPresenterMap';
import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {GetCountryList} from '@copor/core/domain/Components/Country/interactor/GetCountryList';
import {GetDefaultCountry} from '@copor/core/domain/Components/Country/interactor/GetDefaultCountry';
import {
	GetDefaultCountryInteractorRepoPicker
} from '@copor/core/client/Components/Country/GetDefaultCountry/repo/repoPicker/GetDefaultCountryInteractorRepoPicker';
import {
	GetCountryListInteractorRepoPicker
} from '@copor/core/client/Components/Country/GetCountryList/repo/repoPicker/GetCountryListInteractorRepoPicker';

abstract class AccountInformationFormBuilderBase {
	protected readonly accountInformation: GetUserAccountInformationDTO;

	protected readonly container: Container;

	constructor(
		accountInformation: GetUserAccountInformationDTO,
		container: Container
	) {
		this.container = container;
		this.accountInformation = accountInformation;
	}

	protected async getCountryList() {
		const repo = this.container.getNewRepoPicker(GetDefaultCountryInteractorRepoPicker);

		return this.container.getInteractor(GetDefaultCountry, repo, '').execute();
	}

	protected async getCitizenshipList() {
		const repo = this.container.getNewRepoPicker(GetCountryListInteractorRepoPicker);

		return this.container.getInteractor(GetCountryList, repo, {filters: []}).execute();
	}


	protected async getStateList(countryId?: string) {
		const repo = this.container.getNewRepoPicker(GetStateListInteractorRepoPicker);

		return this.container.getInteractor(GetStateList, repo, countryId ?? '').execute();
	}

	protected async getNativeLanguageList() {
		const repo = this.container.getNewRepoPicker(GetNativeLanguageListInteractorRepoPicker);

		return this.container.getInteractor(GetNativeLanguageList, repo, {filters: []}).execute();
	}

	protected resolvePresenter<Input>(
		actorRoleType: RoleType
	): new (input: Input, context: AppContext) => PresenterInstance<Input, GetFormViewModel> {
		const presenter = AccountInformationFormPresenterMap.resolve(
			this.accountInformation.roleType,
			actorRoleType
		);

		if (!presenter) {
			throw new CannotUpdateAccountException();
		}

		return presenter as unknown as
			new (input: Input, context: AppContext) => PresenterInstance<Input, GetFormViewModel>;
	}

	abstract buildPresenter(roleType:RoleType): Promise<Presenter<GetFormViewModel>>;
}

export default AccountInformationFormBuilderBase;
