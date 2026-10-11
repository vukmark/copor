import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateNotificationTokenReqBodyDTO} from './dto/CreateNotificationTokenReqBodyDTO';
import {SaveNotificationTokenDTO} from '@copor/core/domain/Components/NotificationToken/interactor/dto/SaveNotificationTokenDTO';
import {CreateNotificationTokenInteractorRepoPicker} from './repo/repoPicker/CreateNotificationTokenInteractorRepoPicker';
import {CreateNotificationToken} from '@copor/core/domain/Components/NotificationToken/interactor/CreateNotificationToken';
import {CreateNotificationTokenLoggerRepoPicker} from './repo/repoPicker/CreateNotificationTokenLoggerRepoPicker';
import {
	LogCreateNotificationToken,
	LogDataForCreateNotificationToken
} from '@copor/core/domain/Components/NotificationToken/logger/LogCreateNotificationToken';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';

export class CreateNotificationTokenController extends BaseController<CreateNotificationTokenReqBodyDTO, string> {
	async getResponse() {
		const uniqueId = await this.getUniqueId();

		const interactor = this.getInteractor(uniqueId);
		const logger = this.getLogger(uniqueId);

		const response = await interactor.execute().then((responseFromInteractor) => {
			void logger.log();
			return responseFromInteractor;
		});

		this.response.status(200);
		this.response.send(response);
	}

	private async getUniqueId(): Promise<string> {
		const uniqueIdGenerator = this.container.getRepository(IdGenerator);

		return await uniqueIdGenerator.getNewId();
	}

	private getInteractor(uniqueId: string) : UseCase<string> {
		const container = this.container;
		const interactorInput: SaveNotificationTokenDTO = {
			... this.request.body,
			user: this.actorId,
			id: uniqueId
		};
		const interactorRepo = container.getNewRepoPicker(CreateNotificationTokenInteractorRepoPicker);

		return container.getInteractor(
			CreateNotificationToken,
			interactorRepo,
			interactorInput
		);
	}

	private getLogger(uniqueId: string) : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(CreateNotificationTokenLoggerRepoPicker);
		const logData = this.getLogData(uniqueId);

		return container.getLogger(
			LogCreateNotificationToken,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getLogData(uniqueId: string): LogDataForCreateNotificationToken {
		return {
			... this.request.body,
			id: uniqueId,
			userId: this.actorId
		};
	}
}
