import {ContractsSignedCheckRepo} from '@copor/core/domain/Login/repository/ContractsSignedCheckRepo';
import {ContractsSignedCheckResultDTO} from '@copor/core/domain/Login/interactor/dto/ContractsSignedCheckResultDTO';

export class FakeContractsSignedCheckRepo implements ContractsSignedCheckRepo {
	async checkContracts(userId: string): Promise<ContractsSignedCheckResultDTO | null> {
		return Promise.resolve(null);
	}
}
