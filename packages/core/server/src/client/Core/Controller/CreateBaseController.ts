import {BaseController} from '@copor/core/client/Core/BaseController';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';

export abstract class CreateBaseController<RequestBodyDto> extends BaseController<RequestBodyDto, string> {
	async getResponse() {
		const container = this.container;
		const uniqueId = await this.getUniqueId();

		const factory = container.getFactory(
			RunFactory<string>,
			this.getValidator(),
			this.getInteractor(uniqueId),
			this.getLogger(uniqueId)
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		await this.afterCreate(uniqueId);

		this.response.status(200);
		this.response.send(response);
	}

	protected async afterCreate(_uniqueId: string): Promise<void> {
		return Promise.resolve();
	}

	protected async getUniqueId(): Promise<string> {
		const uniqueIdGenerator = this.container.getRepository(IdGenerator);

		return await uniqueIdGenerator.getNewId();
	}

	protected abstract getValidator(): Validator;

	protected abstract getInteractor(uniqueId: string) : UseCase<string>;

	protected abstract getLogger(uniqueId: string) : LogAction;
}
