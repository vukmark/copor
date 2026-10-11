import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {GetUserAccountInformationRepo} from '@copor/core/domain/User/AccountInformation/repository/GetUserAccountInformationRepo';
import {GetUserAccountInformationDTO} from '@copor/core/domain/User/interactor/dto/GetUserAccountInformationDTO';

export class GetUserAccountInformation extends
	ExecuteUseCase<string, GetUserAccountInformationRepo, GetUserAccountInformationDTO> {
	public execute(): Promise<GetUserAccountInformationDTO> {
		return this.repository.load(this.input);
	}
}
