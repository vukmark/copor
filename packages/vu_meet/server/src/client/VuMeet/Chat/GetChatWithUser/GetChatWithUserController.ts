import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetChatWithUserInteractorRepoPicker} from './repo/repoPicker/GetChatWithUserInteractorRepoPicker';
import {GetChatWithUserLoggerRepoPicker} from './repo/repoPicker/GetChatWithUserLoggerRepoPicker';
import {GetChatWithUserValidatorStorageRepoPicker} from './repo/repoPicker/GetChatWithUserValidatorStorageRepoPicker';
import {GetChatWithUserPresenter} from './GetChatWithUserPresenter';
import {
	ValidateGetChatWithUserDTO
} from '@copor/vu_meet/domain/VuMeet/Chat/validations/dto/ValidateGetChatWithUserDTO';
import {ValidateGetChatWithUser} from '@copor/vu_meet/domain/VuMeet/Chat/validations/ValidateGetChatWithUser';
import {LogGetChatWithUser} from '@copor/vu_meet/domain/VuMeet/Chat/logger/LogGetChatWithUser';
import {GetChatWithUser} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/GetChatWithUser';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';
import {VuMeetWebSocket} from '@copor/vu_meet/client/VuMeet/Core/WebSocket/VuMeetWebSocket';

export interface GetChatWithUserParams {
	users: string[];
	groupName: string
}

export class GetChatWithUserController extends BaseController<GetChatWithUserParams, string> {
	async getResponse(): Promise<void> {
		const params = this.request.body;
		const users: string[] = params.users;
		const actorId = this.actorId;
		const uniqueId = await this.getUniqueId();
		const factory = this.container.getFactory(
			RunFactory<string>,
			this.getValidator(actorId, users, params.groupName),
			this.getInteractor(users, uniqueId, params.groupName),
			this.getLogger(actorId, users)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const otherUsers = users.filter((userId) => userId !== actorId);

		VuMeetWebSocket.sendChatListUpdatedNotification(otherUsers, {chatId: response});

		const presenter = this.container.getPresenter(GetChatWithUserPresenter, response);
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}
	private async getUniqueId(): Promise<string> {
		const uniqueIdGenerator = this.container.getRepository(IdGenerator);

		return await uniqueIdGenerator.getNewId();
	}

	private getValidator(actorId: string, users: string[], groupName: string) {
		const c = this.container;
		const validatorInput: ValidateGetChatWithUserDTO = {actorId, users, groupName};

		return c.getValidator(
			ValidateGetChatWithUser,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetChatWithUserValidatorStorageRepoPicker)
		);
	}

	private getLogger(actorId: string, users: string[]) {
		const loggerRepository = this.container.getNewRepoPicker(GetChatWithUserLoggerRepoPicker);
		const logData = {
			actorId: this.actorId,
			users: users
		};

		return this.container.getLogger(
			LogGetChatWithUser,
			loggerRepository,
			new CreateLogDetails(actorId),
			logData
		);
	}

	private getInteractor(users: string[], uniqueId: string, groupName: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetChatWithUserInteractorRepoPicker);

		return this.container.getInteractor(
			GetChatWithUser,
			interactorRepository,
			{actorId: this.actorId, users: users, uniqueId: uniqueId, groupName: groupName}
		);
	}
}
