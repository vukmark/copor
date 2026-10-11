import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {UntrashToDoRepo} from '../repository/UntrashToDoRepo';

export class UntrashToDo extends ExecuteUseCase<string, UntrashToDoRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.untrashToDo(this.input);
	}
}