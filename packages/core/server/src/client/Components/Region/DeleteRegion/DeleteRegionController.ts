import {ValidateDeleteRegionDTO} from '@copor/core/domain/Components/Region/validations/dto/ValidateDeleteRegionDTO';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {DeleteRegionValidatorStorageRepoPicker} from './repo/repoPicker/DeleteRegionValidatorStorageRepoPicker';
import {ValidateDeleteRegion} from '@copor/core/domain/Components/Region/validations/ValidateDeleteRegion';
import {DeleteRegionInteractorRepoPicker} from './repo/repoPicker/DeleteRegionInteractorRepoPicker';
import {DeleteRegion} from '@copor/core/domain/Components/Region/interactor/DeleteRegion';
import {LogDeleteRegion} from '@copor/core/domain/Components/Region/logger/LogDeleteRegion';
import {DeleteRegionLoggerRepoPicker} from './repo/repoPicker/DeleteRegionLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {DeleteBaseController} from '@copor/core/client/Core/Controller/DeleteBaseController';

export interface DeleteRegionParams {
	id: string;
}

export class DeleteRegionController extends DeleteBaseController<DeleteRegionParams> {
	protected getValidator(id: string) : Validator {
		const c = this.container;
		const input: ValidateDeleteRegionDTO = {
			actorId: this.actorId,
			regionId: id
		};

		return c.getValidator(
			ValidateDeleteRegion,
			input,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(DeleteRegionValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(id: string) : UseCase<void> {
		const c = this.container;
		const repo = c.getNewRepoPicker(DeleteRegionInteractorRepoPicker);

		return c.getInteractor(DeleteRegion, repo, id);
	}

	protected getLogger(id: string) : LogAction {
		return this.container.getLogger(
			LogDeleteRegion,
			this.container.getNewRepoPicker(DeleteRegionLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{regionId: id}
		);
	}
}
