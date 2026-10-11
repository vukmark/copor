import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateUserAccountInformationReqBodyDTO} from './dto/CreateUserAccountInformationReqBodyDTO';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateCreateUserAccountInformation} from '@copor/core/domain/User/AccountInformation/validations/ValidateCreateUserAccountInformation';
import {CreateUserAccountInformation} from '@copor/core/domain/User/AccountInformation/interactor/CreateUserAccountInformation';
import {
	LogCreateUserAccountInformation
} from '@copor/core/domain/User/AccountInformation/logger/LogCreateUserAccountInformation';
import {SaveUserAccountInformationDTO} from '@copor/core/domain/User/AccountInformation/interactor/dto/SaveUserAccountInformationDTO';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';
import {SavePhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/dto/SavePhoneNumberDTO';
import {
	CreateUserAccountInformationInteractorRepoPicker
} from './repo/repoPicker/CreateUserAccountInformationInteractorRepoPicker';
import {
	CreateUserAccountInformationValidatorStorageRepoPicker
} from './repo/repoPicker/CreateUserAccountInformationValidatorStorageRepoPicker';
import {
	CreateUserAccountInformationLoggerRepoPicker
} from './repo/repoPicker/CreateUserAccountInformationLoggerRepoPicker';
import {ValidateCreatePhoneNumber} from '@copor/core/domain/Core/global/PhoneNumber/validations/ValidateCreatePhoneNumber';
import {CreatePhoneNumber} from '@copor/core/domain/Core/global/PhoneNumber/interactor/CreatePhoneNumber';
import {LogCreatePhoneNumber} from '@copor/core/domain/Core/global/PhoneNumber/logger/LogCreatePhoneNumber';
import {
	CreatePhoneNumberValidatorStorageRepoPicker
} from '@copor/core/client/Global/PhoneNumber/CreatePhoneNumber/repo/repoPicker/CreatePhoneNumberValidatorStorageRepoPicker';
import {
	CreatePhoneNumberInteractorRepoPicker
} from '@copor/core/client/Global/PhoneNumber/CreatePhoneNumber/repo/repoPicker/CreatePhoneNumberInteractorRepoPicker';
import {
	CreatePhoneNumberLoggerRepoPicker
} from '@copor/core/client/Global/PhoneNumber/CreatePhoneNumber/repo/repoPicker/CreatePhoneNumberLoggerRepoPicker';
import {UpdateUserPreferences} from '@copor/core/domain/User/UserPreferences/interactor/UpdateUserPreferences';
import {LogUpdateUserPreferences} from '@copor/core/domain/User/UserPreferences/logger/LogUpdateUserPreferences';
import {DefaultUserPreferencesHelper} from '@copor/core/client/User/UserPreferences/Helper/DefaultUserPreferencesHelper';
import {
	UpdateUserPreferencesInteractorRepoPicker
} from '@copor/core/client/User/UserPreferences/UpdateUserPreferences/repo/repoPicker/UpdateUserPreferencesInteractorRepoPicker';
import {
	UpdateUserPreferencesLoggerRepoPicker
} from '@copor/core/client/User/UserPreferences/UpdateUserPreferences/repo/repoPicker/UpdateUserPreferencesLoggerRepoPicker';

export class CreateUserAccountInformationController extends BaseController<CreateUserAccountInformationReqBodyDTO, {id: string}> {
	async getResponse() {
		const userId = await new IdGenerator().getNewId();
		const validatorInput = this.getValidatorInput(userId);

		const factory = this.container.getFactory(
			RunFactory,
			this.getValidator(validatorInput),
			this.getInteractor(validatorInput),
			this.getLogger()
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		await this.createPhoneNumbers(userId);
		await this.createDefaultPreferences(userId);

		this.response.status(200);
		this.response.send({id: userId});
	}

	private async createDefaultPreferences(userId: string): Promise<void> {
		const preferences = DefaultUserPreferencesHelper.build(userId);

		await this.container.getInteractor(
			UpdateUserPreferences,
			this.container.getNewRepoPicker(UpdateUserPreferencesInteractorRepoPicker),
			preferences
		).execute();

		await this.container.getLogger(
			LogUpdateUserPreferences,
			this.container.getNewRepoPicker(UpdateUserPreferencesLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{
				language: preferences.language ?? '',
				themeMode: preferences.themeMode,
				contrast: preferences.contrast,
				colorSet: preferences.colorSet,
				contactPrivacy: preferences.contactPrivacy,
				useIcons: preferences.useIcons,
				fontSize: preferences.fontSize,
				actionFeedbackDuration: preferences.actionFeedbackDuration
			}
		).log();
	}

	private async createPhoneNumbers(userId: string): Promise<void> {
		const idGenerator = this.container.getRepository(IdGenerator);

		const phoneNumberList: SavePhoneNumberDTO[] = [];

		for (const phone of this.request.body.phoneNumberList ?? []) {
			phoneNumberList.push({
				id: await idGenerator.getNewId(),
				phoneNumber: phone.phoneNumber,
				phoneNumberType: phone.phoneNumberType,
				actorId: this.actorId,
				user: userId
			});
		}

		if (!phoneNumberList.length)
			return;

		const createFactory = this.container.getFactory(
			RunFactory,
			this.getCreatePhoneValidator(phoneNumberList),
			this.getCreatePhoneInteractor(phoneNumberList),
			this.getCreatePhoneLogger(phoneNumberList)
		);

		const createResponse = await createFactory.run({skipValidation: true});

		if (createResponse instanceof ErrorList) {
			this.next(createResponse);
		}
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

	private getValidator(validatorInput: SaveUserAccountInformationDTO): Validator {
		return this.container.getValidator(
			ValidateCreateUserAccountInformation,
			{
				actorId: this.actorId,
				roleType: validatorInput.roleType,
				email: validatorInput.email
			},
			this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
			this.container.getNewRepoPicker(CreateUserAccountInformationValidatorStorageRepoPicker)
		);
	}

	private getInteractor(validatorInput: SaveUserAccountInformationDTO) {
		return this.container.getInteractor(
			CreateUserAccountInformation,
			this.container.getNewRepoPicker(CreateUserAccountInformationInteractorRepoPicker),
			validatorInput
		);
	}

	private getLogger() {
		return this.container.getLogger(
			LogCreateUserAccountInformation,
			this.container.getNewRepoPicker(CreateUserAccountInformationLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{roleType: this.request.body.roleType, email: this.request.body.email}
		);
	}

	private getValidatorInput(userId: string): SaveUserAccountInformationDTO {
		return {
			...this.request.body,
			id: userId,
			actorId: this.actorId
		};
	}
}
