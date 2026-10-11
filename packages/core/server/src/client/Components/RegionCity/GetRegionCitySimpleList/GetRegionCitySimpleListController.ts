import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetListReqBodyDTO} from '@copor/core/client/Core/dto/GetListReqBodyDTO';
import {PaginatedResponse} from '@copor/core/client/Core/Presenter/PaginatedResponse';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {
	GetRegionCityListInteractorRepoPicker
} from '@copor/core/client/Components/RegionCity/GetRegionCityList/repo/repoPicker/GetRegionCityListInteractorRepoPicker';
import {GetRegionCityList} from '@copor/core/domain/Components/RegionCity/interactor/GetRegionCityList';
import {
	GetRegionCityListLoggerRepoPicker
} from '@copor/core/client/Components/RegionCity/GetRegionCityList/repo/repoPicker/GetRegionCityListLoggerRepoPicker';
import {LogGetRegionCityList} from '@copor/core/domain/Components/RegionCity/logger/LogGetRegionCityList';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/GetRegionCityDTO';
import {GetRegionCitySimpleListPresenter} from '@copor/core/client/Components/RegionCity/GetRegionCitySimpleList/GetRegionCitySimpleListPresenter';

export class GetRegionCitySimpleListController extends BaseController<GetListReqBodyDTO, PaginatedResponse<NameAndIdDTO>> {
	public async getResponse(): Promise<void> {
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<GetRegionCityDTO[]>,
			undefined,
			this.getInteractor(),
			this.getLogger()
		);
		const response = await factory.run({skipValidation: true});

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = this.container.getPresenter(
			GetRegionCitySimpleListPresenter,
			response,
			container.appContext,
			{
				limit: this.request.body.limit,
				offset: this.request.body.offset
			}
		);
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}
	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetRegionCityListInteractorRepoPicker);

		return container.getInteractor(
			GetRegionCityList,
			interactorRepo,
			{
				filters: this.request.body.filterList,
				limit: this.request.body.limit,
				offset: this.request.body.offset
			});
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetRegionCityListLoggerRepoPicker);

		return container.getLogger(LogGetRegionCityList, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
