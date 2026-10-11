import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {GetContactInfoForUserRepo} from '@copor/contacts/domain/Contacts/repository/GetContactInfoForUserRepo';
import {GetContactInfoForUserDTO} from '@copor/contacts/domain/Contacts/interactor/dto/GetContactInfoForUserDTO';


export class GetContactInfoForUser extends ExecuteUseCase<string, GetContactInfoForUserRepo, GetContactInfoForUserDTO> {
	public async execute(): Promise<GetContactInfoForUserDTO> {
		return this.repository.load(this.input);
	}
}
