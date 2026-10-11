import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetFormViewModel} from '@copor/core/client/Core/Form/GetFormViewModel';
import {GetTagFormPresenter} from '@copor/core/client/Components/Tag/GetTagForm/GetTagFormPresenter';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	GetTagValidatorStorageRepoPicker
} from '@copor/core/client/Components/Tag/GetTag/repo/repoPicker/GetTagValidatorStorageRepoPicker';
import {ValidateGetTag} from '@copor/core/domain/Components/Tag/validation/ValidateGetTag';
import {ValidateGetTagDTO} from '@copor/core/domain/Components/Tag/validation/dto/ValidateGetTagDTO';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {GetTagLoggerRepoPicker} from '@copor/core/client/Components/Tag/GetTag/repo/repoPicker/GetTagLoggerRepoPicker';
import {LogGetTag} from '@copor/core/domain/Components/Tag/logger/LogGetTag';
import {GetTagInteractorRepoPicker} from '@copor/core/client/Components/Tag/GetTag/repo/repoPicker/GetTagInteractorRepoPicker';
import {GetTag} from '@copor/core/domain/Components/Tag/interactor/GetTag';
import {GetTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetTagDTO';
import {Color} from '@copor/core/domain/Core/enum/Color';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';
import {GetUserPreferences} from '@copor/core/domain/User/UserPreferences/interactor/GetUserPreferences';
import {
	GetUserPreferencesInteractorRepoPicker
} from '@copor/core/client/User/UserPreferences/GetUserPreferences/repo/repoPicker/GetUserPreferencesInteractorRepoPicker';

export interface GetTagParams {
	id: string;
}


export class GetTagFormController extends BaseController<undefined, GetFormViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetTagParams;

		if (!params.id) {
			const presenter = this.container.getPresenter(GetTagFormPresenter, await this.getDefaultFormValues());

			this.response.status(200);
			this.response.send(presenter.present());
			return;
		}

		const tagFactory = this.container.getFactory(
            RunFactory<GetTagDTO>,
            this.getTagValidator(this.actorId, params.id),
            this.getTagInteractor(params.id),
            this.getTagLogger(this.actorId, params.id)
		);

		const tag = await tagFactory.run();

		if (tag instanceof ErrorList) {
			this.next(tag);
			return;
		}

		const presenter = this.container.getPresenter(GetTagFormPresenter, tag);

		this.response.status(200);
		this.response.send(presenter.present());
	}

	private async getDefaultFormValues(): Promise<GetTagDTO> {
		const userPreferenceRepo = this.container.getNewRepoPicker(GetUserPreferencesInteractorRepoPicker);
		const userPreferences = await this.container.getInteractor(GetUserPreferences, userPreferenceRepo, this.actorId).execute();

		return {
			color: Color.blueGrey,
			id: '',
			isPrivate: false,
			colorSet: userPreferences.colorSet ?? ColorSet.SET9,
			name: ''
		};
	}

	private getTagValidator(actorId: string, id: string) {
		const c = this.container;
		const validatorInput: ValidateGetTagDTO = {actorId, tagId: id};

		return c.getValidator(
			ValidateGetTag,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetTagValidatorStorageRepoPicker)
		);
	}

	private getTagLogger(actorId: string, id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetTagLoggerRepoPicker);
		const logData = {
			tag: id
		};

		return this.container.getLogger(
			LogGetTag,
			loggerRepository,
			new CreateLogDetails(actorId),
			logData
		);
	}

	private getTagInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetTagInteractorRepoPicker);

		return this.container.getInteractor(
			GetTag,
			interactorRepository,
			id
		);
	}
}