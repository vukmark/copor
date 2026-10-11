import {ExecuteUseCase} from './ExecuteUseCase';
import {DeleteItem} from '../Repository/DeleteItem';

export abstract class DeleteUseCase extends ExecuteUseCase<string, DeleteItem, void> {
	public execute(): Promise<void> {
		return Promise.resolve(this.repository.delete(this.input));
	}
}