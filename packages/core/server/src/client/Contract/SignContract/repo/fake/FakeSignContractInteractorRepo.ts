import {SignContractRepo} from '@copor/core/domain/Contract/repository/SignContractRepo';
import {SignContractDTO} from '@copor/core/domain/Contract/interactor/dto/SignContractDTO';

export class FakeSignContractInteractorRepo implements SignContractRepo {
	sign(input: SignContractDTO): Promise<void> {
		return Promise.resolve();
	}
}
