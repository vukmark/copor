import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {RegistrationStatusRepo} from '@copor/core/domain/Registration/repository/RegistrationStatusRepo';
import {RegistrationStatusDTO} from '@copor/core/domain/Registration/interactor/dto/RegistrationStatusDTO';

export class GetRegistrationStatus extends ExecuteUseCase<undefined, RegistrationStatusRepo, RegistrationStatusDTO> {
	public async execute(): Promise<RegistrationStatusDTO> {
		return {enabled: await this.repository.isSelfRegistrationEnabled()};
	}
}
