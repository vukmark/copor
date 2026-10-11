import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetRegionCityListInteractorRepoPicker} from './repo/repoPicker/GetRegionCityListInteractorRepoPicker';
import {GetRegionCityList} from '@copor/core/domain/Components/RegionCity/interactor/GetRegionCityList';
import {GetRegionCityListLoggerRepoPicker} from './repo/repoPicker/GetRegionCityListLoggerRepoPicker';
import {LogGetRegionCityList} from '@copor/core/domain/Components/RegionCity/logger/LogGetRegionCityList';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {GetRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/GetRegionCityDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetRegionCityViewModel} from '../GetRegionCity/GetRegionCityViewModel';
import {GetRegionCityListPresenter} from '@copor/core/client/Components/RegionCity/GetRegionCityList/GetRegionCityListPresenter';
import {GetListReqBodyDTO} from '@copor/core/client/Core/dto/GetListReqBodyDTO';
import {PaginatedResponse} from '@copor/core/client/Core/Presenter/PaginatedResponse';

export class GetRegionCityListController extends BaseController<GetListReqBodyDTO, PaginatedResponse<GetRegionCityViewModel>> {
	async getResponse() {
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
			GetRegionCityListPresenter,
			response,
			this.container.appContext,
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
			}
		);
	}

	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetRegionCityListLoggerRepoPicker);

		return container.getLogger(
			LogGetRegionCityList,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			undefined
		);
	}
}