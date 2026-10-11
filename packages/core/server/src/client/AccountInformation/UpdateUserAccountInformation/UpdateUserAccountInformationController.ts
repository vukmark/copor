import {BaseController} from '@copor/core/client/Core/BaseController';
import {UpdateUserAccountInformationReqBodyDTO} from './dto/UpdateUserAccountInformationReqBodyDTO';
import {UpdateUserAccountInformationValidatorStorageRepoPicker}
	from './repo/repoPicker/UpdateUserAccountInformationValidatorStorageRepoPicker';
import {UpdateUserAccountInformationLoggerRepoPicker}
	from './repo/repoPicker/UpdateUserAccountInformationLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	ValidateUpdateUserAccountInformation
} from '@copor/core/domain/User/validation/ValidateUpdateUserAccountInformation';
import {
	UpdateUserAccountInformation
} from '@copor/core/domain/User/interactor/UpdateUserAccountInformation';
import {
	LogDataForUpdateUserAccountInformation,
	LogUpdateUserAccountInformation
} from '@copor/core/domain/User/logger/LogUpdateUserAccountInformation';
import {
	UpdateUserAccountInformationDTO
} from '@copor/core/domain/User/interactor/dto/UpdateUserAccountInformationDTO';
import {
	ValidateUpdatePersonalAccountInformation
} from '@copor/core/domain/User/validation/ValidateUpdatePersonalAccountInformation';
import {SavePhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/dto/SavePhoneNumberDTO';
import {
	UpdatePhoneNumberValidatorStorageRepoPicker
} from '@copor/core/client/Global/PhoneNumber/UpdatePhoneNumber/repo/repoPicker/UpdatePhoneNumberValidatorStorageRepoPicker';
import {ValidateUpdatePhoneNumber} from '@copor/core/domain/Core/global/PhoneNumber/validations/ValidateUpdatePhoneNumber';
import {UpdatePhoneNumber} from '@copor/core/domain/Core/global/PhoneNumber/interactor/UpdatePhoneNumber';
import {
	UpdatePhoneNumberInteractorRepoPicker
} from '@copor/core/client/Global/PhoneNumber/UpdatePhoneNumber/repo/repoPicker/UpdatePhoneNumberInteractorRepoPicker';
import {
	UpdatePhoneNumberLoggerRepoPicker
} from '@copor/core/client/Global/PhoneNumber/UpdatePhoneNumber/repo/repoPicker/UpdatePhoneNumberLoggerRepoPicker';
import {
	LogUpdatePhoneNumber
} from '@copor/core/domain/Core/global/PhoneNumber/logger/LogUpdatePhoneNumber';

import {
	CreatePhoneNumberValidatorStorageRepoPicker
} from '@copor/core/client/Global/PhoneNumber/CreatePhoneNumber/repo/repoPicker/CreatePhoneNumberValidatorStorageRepoPicker';
import {ValidateCreatePhoneNumber} from '@copor/core/domain/Core/global/PhoneNumber/validations/ValidateCreatePhoneNumber';
import {CreatePhoneNumber} from '@copor/core/domain/Core/global/PhoneNumber/interactor/CreatePhoneNumber';
import {
	CreatePhoneNumberInteractorRepoPicker
} from '@copor/core/client/Global/PhoneNumber/CreatePhoneNumber/repo/repoPicker/CreatePhoneNumberInteractorRepoPicker';
import {
	CreatePhoneNumberLoggerRepoPicker
} from '@copor/core/client/Global/PhoneNumber/CreatePhoneNumber/repo/repoPicker/CreatePhoneNumberLoggerRepoPicker';
import {
	LogCreatePhoneNumber
} from '@copor/core/domain/Core/global/PhoneNumber/logger/LogCreatePhoneNumber';

import {
	DeletePhoneNumberValidatorStorageRepoPicker
} from '@copor/core/client/Global/PhoneNumber/DeletePhoneNumber/repo/repoPicker/DeletePhoneNumberValidatorStorageRepoPicker';
import {ValidateDeletePhoneNumber} from '@copor/core/domain/Core/global/PhoneNumber/validations/ValidateDeletePhoneNumber';
import {
	ValidateDeletePhoneNumberDTO
} from '@copor/core/domain/Core/global/PhoneNumber/validations/dto/ValidateDeletePhoneNumberDTO';
import {DeletePhoneNumber} from '@copor/core/domain/Core/global/PhoneNumber/interactor/DeletePhoneNumber';
import {
	DeletePhoneNumberInteractorRepoPicker
} from '@copor/core/client/Global/PhoneNumber/DeletePhoneNumber/repo/repoPicker/DeletePhoneNumberInteractorRepoPicker';
import {
	DeletePhoneNumberLoggerRepoPicker
} from '@copor/core/client/Global/PhoneNumber/DeletePhoneNumber/repo/repoPicker/DeletePhoneNumberLoggerRepoPicker';
import {
	LogDeletePhoneNumber
} from '@copor/core/domain/Core/global/PhoneNumber/logger/LogDeletePhoneNumber';

import {GetPhoneNumberList} from '@copor/core/domain/Core/global/PhoneNumber/interactor/GetPhoneNumberList';
import {GetPhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/dto/GetPhoneNumberDTO';
import {
	GetPhoneNumberListInteractorRepoPicker
} from '@copor/core/client/Global/PhoneNumber/GetPhoneNumberList/repo/repoPicker/GetPhoneNumberListInteractorRepoPicker';

import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';
import {
	UpdateUserAccountInformationValidatorPermissionRepoPicker
} from '@copor/core/client/AccountInformation/UpdateUserAccountInformation/repo/repoPicker/UpdateUserAccountInformationValidatorPermissionRepoPicker';
import {
	UpdateUserAccountInformationInteractorRepoPicker
} from '@copor/core/client/AccountInformation/UpdateUserAccountInformation/repo/repoPicker/UpdateUserAccountInformationInteractorRepoPicker';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {GetUserRoleType} from '@copor/core/domain/Components/Role/interactor/GetUserRoleType';
import {
	GetUserRoleTypeInteractorRepoPicker
} from '@copor/core/client/Components/Role/GetUserRoleType/repo/repoPicker/GetUserRoleTypeInteractorRepoPicker';
import {CannotUpdateAccountException} from '@copor/core/domain/User/exception/CannotUpdateAccountException';
import {
	AccountInformationFormVariantResolver
} from '@copor/core/client/AccountInformation/AccountInformationFormVariantResolver';
import {
	AccountInformationClearableFields
} from '@copor/core/client/AccountInformation/AccountInformationClearableFields';

export class UpdateUserAccountInformationController extends BaseController<UpdateUserAccountInformationReqBodyDTO, void> {
	async getResponse() {
		if (!await this.isClaimedFormVariantValid()) {
			this.next(new ErrorList([new CannotUpdateAccountException()]));
			return;
		}

		this.clearOmittedFields();

		const factory = this.container.getFactory(
			RunFactory,
			this.getValidator(),
			this.getInteractor(),
			this.getLogger()
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		if (this.request.body.phoneNumberList) {
			await this.processPhoneNumbers();
		}

		this.response.status(200);
		this.response.send(response);
	}

	private clearOmittedFields(): void {
		const variant = this.request.body.formVariant;

		if (!variant)
			return;

		const body = this.request.body as unknown as Record<string, unknown>;

		for (const fieldName of AccountInformationClearableFields.get(variant, this.container.appContext)) {
			if (!(fieldName in body))
				body[fieldName] = null;
		}
	}

	private async isClaimedFormVariantValid(): Promise<boolean> {
		const claimedVariant = this.request.body.formVariant;

		if (!claimedVariant)
			return true;

		const [actorRoleType, targetRoleType] = await Promise.all([
			this.getRoleType(this.actorId),
			this.getRoleType(this.request.body.id ?? this.actorId)
		]);

		return AccountInformationFormVariantResolver.resolve(
			targetRoleType,
			actorRoleType,
			this.container.appContext
		) === claimedVariant;
	}

	private async getRoleType(userId: string): Promise<RoleType> {
		const repo = this.container.getNewRepoPicker(GetUserRoleTypeInteractorRepoPicker);

		return this.container.getInteractor(GetUserRoleType, repo, userId).execute();
	}

	private async processPhoneNumbers(): Promise<void> {
		if (!this.request.body.phoneNumberList)
			return;

		if (!await this.deleteRemovedPhones())
			return;

		const {createList, updateList} = await this.separateNewAndExistingPhones();

		if (updateList.length) {
			const updateFactory = this.container.getFactory(
				RunFactory,
				this.getUpdatePhoneValidator(updateList),
				this.getUpdatePhoneInteractor(updateList),
				this.getUpdatePhoneLogger(updateList)
			);

			const updateResponse = await updateFactory.run({skipValidation: true});

			if (updateResponse instanceof ErrorList) {
				this.next(updateResponse);
				return;
			}
		}

		if (createList.length) {
			const createFactory = this.container.getFactory(
				RunFactory,
				this.getCreatePhoneValidator(createList),
				this.getCreatePhoneInteractor(createList),
				this.getCreatePhoneLogger(createList)
			);

			const createResponse = await createFactory.run({skipValidation: true});

			if (createResponse instanceof ErrorList) {
				this.next(createResponse);
			}
		}
	}

	private async deleteRemovedPhones(): Promise<boolean> {
		const submittedIds = new Set(
			(this.request.body.phoneNumberList ?? [])
				.map((phone) => phone.id)
				.filter((id) => !!id)
		);

		for (const stored of await this.getStoredPhoneNumbers()) {
			if (submittedIds.has(stored.id))
				continue;

			const deleteFactory = this.container.getFactory(
				RunFactory,
				this.getDeletePhoneValidator(stored.id),
				this.getDeletePhoneInteractor(stored.id),
				this.getDeletePhoneLogger(stored.id)
			);

			const deleteResponse = await deleteFactory.run({skipValidation: true});

			if (deleteResponse instanceof ErrorList) {
				this.next(deleteResponse);
				return false;
			}
		}

		return true;
	}

	private getStoredPhoneNumbers(): Promise<GetPhoneNumberDTO[]> {
		return this.container.getInteractor(
			GetPhoneNumberList,
			this.container.getNewRepoPicker(GetPhoneNumberListInteractorRepoPicker),
			this.request.body.id ?? this.actorId
		).execute();
	}

	private async separateNewAndExistingPhones(): Promise<{
		createList: SavePhoneNumberDTO[];
		updateList: SavePhoneNumberDTO[];
	}> {
		const phoneNumberList = this.request.body.phoneNumberList ?? [];

		const idGenerator = this.container.getRepository(IdGenerator);

		const createList: SavePhoneNumberDTO[] = [];
		const updateList: SavePhoneNumberDTO[] = [];

		for (const phone of phoneNumberList) {
			if (!phone.id || phone.id === '') {
				createList.push({
					id: await idGenerator.getNewId(),
					phoneNumber: phone.phoneNumber,
					phoneNumberType: phone.phoneNumberType,
					actorId: this.actorId,
					user: this.request.body.id ?? this.actorId
				});
				continue;
			}

			updateList.push({
				id: phone.id,
				phoneNumber: phone.phoneNumber,
				phoneNumberType: phone.phoneNumberType,
				actorId: this.actorId,
				user: this.request.body.id ?? this.actorId
			});
		}

		return {createList, updateList};
	}


	private getUpdatePhoneValidator(list: SavePhoneNumberDTO[]): Validator {
		return this.container.getValidator(
			ValidateUpdatePhoneNumber,
			list,
			this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
			this.container.getNewRepoPicker(UpdatePhoneNumberValidatorStorageRepoPicker)
		);
	}

	private getUpdatePhoneInteractor(list: SavePhoneNumberDTO[]) {
		return this.container.getInteractor(
			UpdatePhoneNumber,
			this.container.getNewRepoPicker(UpdatePhoneNumberInteractorRepoPicker),
			list
		);
	}

	private getUpdatePhoneLogger(list: SavePhoneNumberDTO[]) {
		return this.container.getLogger(
			LogUpdatePhoneNumber,
			this.container.getNewRepoPicker(UpdatePhoneNumberLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			list
		);
	}

	private getCreatePhoneValidator(list: SavePhoneNumberDTO[]): Validator {
		return this.container.getValidator(
			ValidateCreatePhoneNumber,
			list,
			this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
			this.container.getNewRepoPicker(CreatePhoneNumberValidatorStorageRepoPicker)
		);
	}

	private getCreatePhoneInteractor(list: SavePhoneNumberDTO[]) {
		return this.container.getInteractor(
			CreatePhoneNumber,
			this.container.getNewRepoPicker(CreatePhoneNumberInteractorRepoPicker),
			list
		);
	}

	private getCreatePhoneLogger(list: SavePhoneNumberDTO[]) {
		return this.container.getLogger(
			LogCreatePhoneNumber,
			this.container.getNewRepoPicker(CreatePhoneNumberLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			list
		);
	}

	private getDeletePhoneValidator(id: string): Validator {
		const input: ValidateDeletePhoneNumberDTO = {
			actorId: this.actorId,
			id: id
		};

		return this.container.getValidator(
			ValidateDeletePhoneNumber,
			input,
			this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
			this.container.getNewRepoPicker(DeletePhoneNumberValidatorStorageRepoPicker)
		);
	}

	private getDeletePhoneInteractor(id: string) {
		return this.container.getInteractor(
			DeletePhoneNumber,
			this.container.getNewRepoPicker(DeletePhoneNumberInteractorRepoPicker),
			id
		);
	}

	private getDeletePhoneLogger(id: string) {
		return this.container.getLogger(
			LogDeletePhoneNumber,
			this.container.getNewRepoPicker(DeletePhoneNumberLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{id: id}
		);
	}

	private getValidator(): Validator {
		const validatorPermissionRepo
			= this.container.getNewRepoPicker(UpdateUserAccountInformationValidatorPermissionRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(
			UpdateUserAccountInformationValidatorStorageRepoPicker
		);

		return this.container.getValidator(
			this.request.body.id
				? ValidateUpdateUserAccountInformation
				: ValidateUpdatePersonalAccountInformation,
			this.getValidatorInput(),
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	private getInteractor() {
		return this.container.getInteractor(
			UpdateUserAccountInformation,
			this.container.getNewRepoPicker(UpdateUserAccountInformationInteractorRepoPicker),
			this.getValidatorInput()
		);
	}

	private getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdateUserAccountInformationLoggerRepoPicker);

		const logData: LogDataForUpdateUserAccountInformation = {
			... this.request.body,
			id: this.actorId
		};

		return this.container.getLogger(
			LogUpdateUserAccountInformation,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getValidatorInput(): UpdateUserAccountInformationDTO {
		if (!this.request.body.id)
			return {
				... this.request.body,
				... this.getMappedFields(),
				id: this.actorId,
				actorId: this.actorId
			};
		return {
			... this.request.body,
			... this.getMappedFields(),
			id: this.request.body.id ?? this.actorId,
			actorId: this.actorId
		};
	}

	private getMappedFields() {
		return {
			nativeLanguage: this.request.body.nativeLanguageId,
			placeOfBirth: this.request.body.placeOfBirth,
			qualifications: this.request.body.qualifications
		};
	}
}
