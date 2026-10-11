import {BaseController} from '@copor/core/client/Core/BaseController';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateSearchTenantList} from '@copor/core/domain/Components/Tenant/validations/ValidateSearchTenantList';
import {SearchTenantList} from '@copor/core/domain/Components/Tenant/interactor/SearchTenantList';
import {SearchTenantListInteractorRepoPicker} from './repo/repoPicker/SearchTenantListInteractorRepoPicker';
import {SearchTenantListPresenter} from './SearchTenantListPresenter';
import {SearchTenantListViewModel} from './SearchTenantListViewModel';

export class SearchTenantListParams {
	prompt: string;
}

export class SearchTenantListController extends BaseController<void, SearchTenantListViewModel[]> {
	async getResponse() {
		const params = this.request.params as SearchTenantListParams;
		const validator = this.getValidator();
		const interactor = this.getInteractor(params.prompt);

		try {
			await validator.validate();
			const result = await interactor.execute();
			const presenter = this.container.getPresenter(SearchTenantListPresenter, result);
			const presentedResult = presenter.present();

			this.response.status(200);
			this.response.send(presentedResult);
		} catch (error) {
			this.next(error);
		}
	}

	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput = this.actorId;

		return container.getValidator(
			ValidateSearchTenantList,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}

	private getInteractor(prompt: string) {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(SearchTenantListInteractorRepoPicker);

		return container.getInteractor(SearchTenantList, interactorRepo, prompt);
	}
}