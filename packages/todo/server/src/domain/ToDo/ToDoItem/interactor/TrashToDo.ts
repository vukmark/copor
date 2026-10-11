import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {TrashToDoRepo} from '../repository/TrashToDoRepo';

export class TrashToDo extends ExecuteUseCase<string, TrashToDoRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.trashToDo(this.input);
	}
}