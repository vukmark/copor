import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SetHoursForToDoAlertDTO} from './dto/SetHoursForToDoAlertDTO';
import {SetHoursForToDoAlertRepo} from '../repository/SetHoursForToDoAlertRepo';

export class SetHoursForToDoAlert extends ExecuteUseCase<SetHoursForToDoAlertDTO, SetHoursForToDoAlertRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.setHours(this.input);
	}
}
