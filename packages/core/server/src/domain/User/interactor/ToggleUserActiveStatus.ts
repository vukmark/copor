import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {ToggleUserActiveStatusDTO} from '@copor/core/domain/User/interactor/dto/ToggleUserActiveStatusDTO';
import {ToggleUserActiveStatusRepo} from '@copor/core/domain/User/repository/ToggleUserActiveStatusRepo';

export class ToggleUserActiveStatus extends ExecuteUseCase<ToggleUserActiveStatusDTO, ToggleUserActiveStatusRepo, void> {
	public async execute(): Promise<void> {
		return this.repository.updateIsActive(this.input.id, this.input.isActive);
	}
}
