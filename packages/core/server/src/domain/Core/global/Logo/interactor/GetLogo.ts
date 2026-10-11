import {ExecuteUseCase} from '../../../Interactors/ExecuteUseCase';
import {GetLogoRepo} from '../repository/interactor/GetLogoRepo';
import {GetLogoDTO} from './dto/GetLogoDTO';

export class GetLogo extends ExecuteUseCase<undefined, GetLogoRepo, GetLogoDTO> {
	public execute(): Promise<GetLogoDTO> {
		return this.repository.load();
	}
}
