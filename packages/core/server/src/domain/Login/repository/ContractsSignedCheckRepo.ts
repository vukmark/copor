import {ContractsSignedCheckResultDTO} from '@copor/core/domain/Login/interactor/dto/ContractsSignedCheckResultDTO';

export interface ContractsSignedCheckRepo {
	checkContracts(userId: string): Promise<ContractsSignedCheckResultDTO | null>;
}