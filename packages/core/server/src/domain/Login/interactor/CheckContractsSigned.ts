import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {ContractsSignedCheckDTO} from '@copor/core/domain/Login/interactor/dto/ContractsSignedCheckDTO';
import {ContractsSignedCheckRepo} from '@copor/core/domain/Login/repository/ContractsSignedCheckRepo';
import {ContractsSignedCheckResultDTO} from '@copor/core/domain/Login/interactor/dto/ContractsSignedCheckResultDTO';

export class CheckContractsSigned
	extends ExecuteUseCase<ContractsSignedCheckDTO, ContractsSignedCheckRepo, ContractsSignedCheckResultDTO | null> {
	public async execute(): Promise<ContractsSignedCheckResultDTO | null> {
		return await this.repository.checkContracts(this.input.userId);
	}
}
