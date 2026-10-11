import {BaseController} from '@copor/core/client/Core/BaseController';
import {SetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/SetFilterDTO';
import {
	GetFilterListInteractorRepoPicker
} from '@copor/core/client/Filter/GetFilterList/repo/repoPicker/GetFilterListInteractorRepoPicker';
import {GetFilterList} from '@copor/core/domain/Core/global/Filter/interactor/GetFilterList';


export interface GetFilterListParams {
	page: string;
}

export class GetFilterListController extends BaseController<string, SetFilterDTO[]> {
	async getResponse() {
		const params = this.request.params as GetFilterListParams;
		const page = params.page;
		const repo = this.container.getNewRepoPicker(GetFilterListInteractorRepoPicker);
		const interactor = this.container.getInteractor(GetFilterList, repo, {
			actorId: this.actorId,
			page: page
		});
		const result = await interactor.execute();

		this.response.status(200);
		this.response.send(result);
	}
}