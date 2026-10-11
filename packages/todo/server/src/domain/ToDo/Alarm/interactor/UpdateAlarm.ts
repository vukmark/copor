import {SaveAlarmDTO} from './dto/SaveAlarmDTO';
import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SaveAlarmRepo} from '../repository/SaveAlarmRepo';

export class UpdateAlarm extends ExecuteUseCase<SaveAlarmDTO, SaveAlarmRepo, void> {
	public async execute(): Promise <void> {
		await this.repository.save(this.input);
	}
}