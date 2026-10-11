import {SignContractDTO} from '../interactor/dto/SignContractDTO';

export interface SignContractRepo {
	sign(input: SignContractDTO): Promise<void>;
}