import {Id} from '../Repository/Id';
import {ExecuteUseCase} from './ExecuteUseCase';
import {CreateNewItem} from '../Repository/CreateNewItem';

export abstract class CreateUseCase<InputDTO extends Id> extends ExecuteUseCase<InputDTO, CreateNewItem<InputDTO>, string> {
	public async execute(): Promise<string> {
		await this.repository.save(this.input);
		return this.input.id;
	}
}
