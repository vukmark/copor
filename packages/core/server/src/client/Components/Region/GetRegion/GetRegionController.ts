import {ValidateGetRegionDTO} from '@copor/core/domain/Components/Region/validations/dto/ValidateGetRegionDTO';
import {ValidateGetRegion} from '@copor/core/domain/Components/Region/validations/ValidateGetRegion';
import {GetRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/GetRegionDTO';
import {GetRegion} from '@copor/core/domain/Components/Region/interactor/GetRegion';
import {LogGetRegion} from '@copor/core/domain/Components/Region/logger/LogGetRegion';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {GetRegionViewModel} from './GetRegionViewModel';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetRegionValidatorStorageRepoPicker} from './repo/repoPicker/GetRegionValidatorStorageRepoPicker';
import {GetRegionInteractorRepoPicker} from './repo/repoPicker/GetRegionInteractorRepoPicker';
import {GetRegionLoggerRepoPicker} from './repo/repoPicker/GetRegionLoggerRepoPicker';
import {GetRegionPresenter} from './GetRegionPresenter';
import {SingleItemBaseController} from '@copor/core/client/Core/Controller/SingleItemBaseController';
import {Presenter} from '@copor/core/client/Interface/Presenter';


export class GetRegionController extends SingleItemBaseController<GetRegionDTO, GetRegionViewModel> {
	protected getPresenter(response: GetRegionDTO): Presenter<GetRegionViewModel> {
		return this.container.getPresenter(GetRegionPresenter, response);
	}

	protected getValidator(id: string) {
		const c = this.container;
		const validatorInput: ValidateGetRegionDTO = {actorId: this.actorId, regionId: id};

		return c.getValidator(
			ValidateGetRegion,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetRegionValidatorStorageRepoPicker)
		);
	}

	protected getLogger(id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetRegionLoggerRepoPicker);
		const logData = {
			region: id
		};

		return this.container.getLogger(
			LogGetRegion,
			loggerRepository,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	protected getInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetRegionInteractorRepoPicker);

		return this.container.getInteractor(
			GetRegion,
			interactorRepository,
			id
		);
	}
}
