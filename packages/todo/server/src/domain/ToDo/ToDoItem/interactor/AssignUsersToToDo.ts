import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {AssignUsersToToDoRepo} from '../repository/AssignUsersToToDoRepo';
import {AssignUsersToToDoDTO} from './dto/AssignUsersToToDoDTO';

export class AssignUsersToToDo extends ExecuteUseCase<AssignUsersToToDoDTO, AssignUsersToToDoRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.assignUsersToToDo(this.input.userIds, this.input.todoId);
	}
}
