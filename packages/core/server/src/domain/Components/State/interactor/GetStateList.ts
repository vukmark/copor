import {GetStateDTO} from './dto/GetStateDTO';
import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {GetStateListRepo} from '@copor/core/domain/Components/State/repository/GetStateListRepo';

export class GetStateList extends ExecuteUseCase<string, GetStateListRepo, GetStateDTO[]> {
	public execute(): Promise<GetStateDTO[]> {
		return this.repository.list(this.input);
	}
}