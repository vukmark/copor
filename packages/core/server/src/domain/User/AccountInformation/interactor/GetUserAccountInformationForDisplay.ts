import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {GetUserAccountInformationForDisplayRepo} from '../repository/GetUserAccountInformationForDisplayRepo';
import {GetUserAccountInformationForDisplayDTO} from './dto/GetUserAccountInformationForDisplayDTO';

export class GetUserAccountInformationForDisplay extends
	ExecuteUseCase<string, GetUserAccountInformationForDisplayRepo, GetUserAccountInformationForDisplayDTO> {
	public execute(): Promise<GetUserAccountInformationForDisplayDTO> {
		return this.repository.load(this.input);
	}
}
