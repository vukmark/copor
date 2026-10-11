import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateDeleteRegionCityDTO} from '@copor/core/domain/Components/RegionCity/validations/dto/ValidateDeleteRegionCityDTO';
import {ValidateDeleteRegionCity} from '@copor/core/domain/Components/RegionCity/validations/ValidateDeleteRegionCity';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	DeleteRegionCityValidatorStorageRepoPicker
} from '@copor/core/client/Components/RegionCity/DeleteRegionCity/repo/repoPicker/DeleteRegionCityValidatorStorageRepoPicker';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {
	DeleteRegionCityInteractorRepoPicker
} from '@copor/core/client/Components/RegionCity/DeleteRegionCity/repo/repoPicker/DeleteRegionCityInteractorRepoPicker';
import {DeleteRegionCity} from '@copor/core/domain/Components/RegionCity/interactor/DeleteRegionCity';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {LogDeleteRegionCity} from '@copor/core/domain/Components/RegionCity/logger/LogDeleteRegionCity';
import {
	DeleteRegionCityLoggerRepoPicker
} from '@copor/core/client/Components/RegionCity/DeleteRegionCity/repo/repoPicker/DeleteRegionCityLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {DeleteBaseController} from '@copor/core/client/Core/Controller/DeleteBaseController';

export interface DeleteRegionCityParams {
	id: string;
}

export class DeleteRegionCityController extends DeleteBaseController<DeleteRegionCityParams> {

	protected getValidator(id: string): Validator {
		const c = this.container;
		const input: ValidateDeleteRegionCityDTO = {
			actorId: this.actorId,
			regionCityId: id
		};

		return c.getValidator(
			ValidateDeleteRegionCity,
			input,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(DeleteRegionCityValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(id: string): UseCase<void> {
		const c = this.container;
		const repo = c.getNewRepoPicker(DeleteRegionCityInteractorRepoPicker);

		return c.getInteractor(DeleteRegionCity, repo, id);
	}

	protected getLogger(id: string): LogAction {
		return this.container.getLogger(
			LogDeleteRegionCity,
			this.container.getNewRepoPicker(DeleteRegionCityLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{regionCityId: id}
		);
	}
}