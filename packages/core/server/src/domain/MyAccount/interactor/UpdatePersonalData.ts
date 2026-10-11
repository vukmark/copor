import {ExecuteUseCase} from '../../Core/Interactors/ExecuteUseCase';
import {SavePersonalDataDTO} from './dto/SavePersonalDataDTO';
import {SavePersonalDataRepo} from '../repository/SavePersonalDataRepo';

export class UpdatePersonalData extends ExecuteUseCase<SavePersonalDataDTO, SavePersonalDataRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}