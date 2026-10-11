import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SaveNativeLanguageDTO} from './dto/SaveNativeLanguageDTO';
import {SaveNativeLanguageRepo} from '../repository/SaveNativeLanguageRepo';

export class UpdateNativeLanguage extends ExecuteUseCase<SaveNativeLanguageDTO, SaveNativeLanguageRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}
