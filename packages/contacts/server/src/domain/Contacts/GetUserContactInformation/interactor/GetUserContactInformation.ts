import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {GetUserContactInformationRepo} from '../repository/GetUserContactInformationRepo';

import {GetUserContactInformationDTO} from '@copor/contacts/domain/Contacts/interactor/dto/GetUserContactInformationDTO';

export class GetUserContactInformation extends ExecuteUseCase<string, GetUserContactInformationRepo, GetUserContactInformationDTO> {
	public execute(): Promise<GetUserContactInformationDTO> {
		return this.repository.load(this.input);
	}
}