import {BaseController} from '@copor/core/client/Core/BaseController';
import {SearchTagListInteractorRepoPicker} from './repo/repoPicker/SearchTagListInteractorRepoPicker';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateSearchTag} from '@copor/core/domain/Components/Tag/validation/ValidateSearchTag';
import {SearchTag} from '@copor/core/domain/Components/Tag/interactor/SearchTag';
import {SearchTagListViewModel} from './SearchTagListViewModel';
import {SearchTagListPresenter} from './SearchTagListPresenter';

export class SearchTagListParams {
	prompt: string;
}
export class SearchTagListController extends BaseController<void, SearchTagListViewModel[]> {
	async getResponse() {
		const params = this.request.params as SearchTagListParams;
		const validator = this.getValidator();
		const interactor = this.getInteractor(params.prompt, this.actorId);

		try {
			await validator.validate();
			const result = await interactor.execute();
			const presenter = this.container.getPresenter(SearchTagListPresenter, result);
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
			ValidateSearchTag,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}
	private getInteractor(search: string, actorId: string) {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(SearchTagListInteractorRepoPicker);

		return container.getInteractor(SearchTag, interactorRepo, {search, actorId});
	}
}
