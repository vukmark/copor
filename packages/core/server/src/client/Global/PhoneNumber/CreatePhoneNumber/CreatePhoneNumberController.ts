import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreatePhoneNumberReqBodyDTO} from './dto/CreatePhoneNumberReqBodyDTO';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {CreatePhoneNumberValidatorStorageRepoPicker} from './repo/repoPicker/CreatePhoneNumberValidatorStorageRepoPicker';
import {CreatePhoneNumberInteractorRepoPicker} from './repo/repoPicker/CreatePhoneNumberInteractorRepoPicker';
import {CreatePhoneNumberLoggerRepoPicker} from './repo/repoPicker/CreatePhoneNumberLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';
import {SavePhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/dto/SavePhoneNumberDTO';
import {CreatePhoneNumber} from '@copor/core/domain/Core/global/PhoneNumber/interactor/CreatePhoneNumber';
import {LogCreatePhoneNumber, LogDataForCreatePhoneNumber}
	from '@copor/core/domain/Core/global/PhoneNumber/logger/LogCreatePhoneNumber';
import {ValidateCreatePhoneNumberDTO}
	from '@copor/core/domain/Core/global/PhoneNumber/validations/dto/ValidateCreatePhoneNumberDTO';
import {ValidateCreatePhoneNumber}
	from '@copor/core/domain/Core/global/PhoneNumber/validations/ValidateCreatePhoneNumber';

export class CreatePhoneNumberController extends BaseController<CreatePhoneNumberReqBodyDTO[], void> {
	async getResponse() {
		const container = this.container;
		const uniqueIds: string[] = await Promise.all(
			this.request.body.map(async () => {
				return await this.getUniqueId();
			})
		);

		const factory = container.getFactory(
			RunFactory<void>,
			this.getValidator(),
			await this.getInteractor(uniqueIds),
			this.getLogger(uniqueIds)
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		this.response.status(200);
		this.response.send(response);
	}

	private async getUniqueId(): Promise<string> {
		const uniqueIdGenerator = this.container.getRepository(IdGenerator);

		return await uniqueIdGenerator.getNewId();
	}

	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = container.getNewRepoPicker(CreatePhoneNumberValidatorStorageRepoPicker);
		const validatorInput: ValidateCreatePhoneNumberDTO[] = this.request.body.map((phone) => ({
			... phone,
			actorId: this.actorId
		}));

		return container.getValidator(
			ValidateCreatePhoneNumber,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	private async getInteractor(uniqueIds: string[]) : Promise<UseCase<void>> {
		const container = this.container;
		const interactorInput: SavePhoneNumberDTO[] = await Promise.all(
			this.request.body.map((phone, index) => ({
				... phone,
				actorId: this.actorId,
				id: uniqueIds[index]
			}))
		);

		const interactorRepo = container.getNewRepoPicker(CreatePhoneNumberInteractorRepoPicker);

		return container.getInteractor(
			CreatePhoneNumber,
			interactorRepo,
			interactorInput
		);
	}

	private getLogger(uniqueIds: string[]) : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(CreatePhoneNumberLoggerRepoPicker);
		const logData = this.getLogData(uniqueIds);

		return container.getLogger(
			LogCreatePhoneNumber,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getLogData(uniqueIds: string[]): LogDataForCreatePhoneNumber[] {
		const logData: LogDataForCreatePhoneNumber[]
			= this.request.body.map((phone, index) => ({
				... phone,
				id: uniqueIds[index]
			}));

		return logData;
	}
}
