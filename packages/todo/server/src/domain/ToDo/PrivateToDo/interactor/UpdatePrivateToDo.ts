import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SavePrivateToDoDTO} from './dto/SavePrivateToDoDTO';
import {SavePrivateToDoRepo} from '../repository/SavePrivateToDoRepo';

export class UpdatePrivateToDo extends ExecuteUseCase<SavePrivateToDoDTO, SavePrivateToDoRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}