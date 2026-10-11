import {SaveCountryDTO} from './dto/SaveCountryDTO';
import {SaveCountryRepo} from '../repository/SaveCountryRepo';
import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';

export class UpdateCountry extends ExecuteUseCase<SaveCountryDTO, SaveCountryRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}
