import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {GetAllToDosForUserInputDTO} from './dto/GetAllToDosForUserInputDTO';
import {GetAllToDosForUserRepo} from '../repository/GetAllToDosForUserRepo';
import {GetAllToDosForUserDTO} from './dto/GetAllToDosForUserDTO';

export class GetAllToDosForUser extends ExecuteUseCase<GetAllToDosForUserInputDTO, GetAllToDosForUserRepo, GetAllToDosForUserDTO[]> {
	public execute(): Promise<GetAllToDosForUserDTO[]> {
		return this.repository.load(this.input.userId, this.input.filterList);
	}
}
