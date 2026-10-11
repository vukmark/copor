import {ExecuteUseCase} from '../../Core/Interactors/ExecuteUseCase';
import {SignContractRepo} from '../repository/SignContractRepo';
import {SignContractDTO} from './dto/SignContractDTO';

export class SignContract extends ExecuteUseCase<SignContractDTO, SignContractRepo, void> {
	public execute(): Promise<void> {
		return this.repository.sign(this.input);
	}
}