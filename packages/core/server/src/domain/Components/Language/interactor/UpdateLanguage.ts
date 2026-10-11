import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SaveLanguageDTO} from './dto/SaveLanguageDTO';
import {SaveLanguageRepo} from '../repository/SaveLanguageRepo';

export class UpdateLanguage extends ExecuteUseCase<SaveLanguageDTO, SaveLanguageRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}
