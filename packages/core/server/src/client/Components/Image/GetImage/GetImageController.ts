import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetImageDTO} from '@copor/core/domain/Components/Image/interactor/dto/GetImageDTO';
import {GetImage} from '@copor/core/domain/Components/Image/interactor/GetImage';
import {LogGetImage} from '@copor/core/domain/Components/Image/logger/LogGetImage';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetImageViewModel} from './GetImageViewModel';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetImageValidatorStorageRepoPicker} from './repo/repoPicker/GetImageValidatorStorageRepoPicker';
import {GetImageInteractorRepoPicker} from './repo/repoPicker/GetImageInteractorRepoPicker';
import {GetImageLoggerRepoPicker} from './repo/repoPicker/GetImageLoggerRepoPicker';
import {GetImagePresenter} from './GetImagePresenter';
import {ValidateGetImageDTO} from '@copor/core/domain/Components/Image/validation/dto/ValidateGetImageDTO';
import {ValidateGetImage} from '@copor/core/domain/Components/Image/validation/ValidateGetImage';

export interface GetImageParams {
	id: string;
}

export class GetImageController extends BaseController<undefined, GetImageViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetImageParams;
		const id: string = params.id;
		const actorId = this.actorId;

		const factory = this.container.getFactory(
			RunFactory<GetImageDTO>,
			this.getValidator(actorId, id),
			this.getInteractor(id),
			this.getLogger(actorId, id)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = this.container.getPresenter(
			GetImagePresenter,
			response,
			this.container.appContext
		);
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}

	private getValidator(actorId: string, id: string) {
		const c = this.container;
		const validatorInput: ValidateGetImageDTO = {actorId, id: id};

		return c.getValidator(
			ValidateGetImage,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetImageValidatorStorageRepoPicker)
		);
	}

	private getLogger(actorId: string, id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetImageLoggerRepoPicker);
		const logData = {
			image: id
		};

		return this.container.getLogger(
			LogGetImage,
			loggerRepository,
			new CreateLogDetails(actorId),
			logData
		);
	}

	private getInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetImageInteractorRepoPicker);

		return this.container.getInteractor(
			GetImage,
			interactorRepository,
			id
		);
	}
}
