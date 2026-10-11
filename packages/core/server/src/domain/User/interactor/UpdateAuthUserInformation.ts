import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {UpdateAuthUserInformationDTO} from '@copor/core/domain/User/interactor/dto/UpdateAuthUserInformationDTO';
import {UpdateAuthUserInformationRepo} from '@copor/core/domain/User/repository/UpdateAuthUserInformationRepo';

export class UpdateAuthUserInformation extends ExecuteUseCase<
	UpdateAuthUserInformationDTO,
	UpdateAuthUserInformationRepo,
	void
> {
	public execute(): Promise<void> {
		return this.repository.update(this.input);
	}
}
