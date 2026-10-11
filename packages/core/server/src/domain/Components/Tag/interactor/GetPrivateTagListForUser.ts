import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {GetTagDTO} from './dto/GetTagDTO';
import {GetPrivateTagListForUserRepo} from '../repository/GetPrivateTagListForUserRepo';
import {GetPrivateTagListForUserDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetPrivateTagListForUserDTO';

export class GetPrivateTagListForUser extends ExecuteUseCase<GetPrivateTagListForUserDTO, GetPrivateTagListForUserRepo, GetTagDTO[]> {
	public execute(): Promise<GetTagDTO[]> {
		return this.repository.load(this.input.actorId, this.input.prompt);
	}
}
