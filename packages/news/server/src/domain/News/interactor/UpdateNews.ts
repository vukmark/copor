import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SaveNewsDTO} from '@copor/news/domain/News/interactor/dto/SaveNewsDTO';
import {SaveNewsRepo} from '@copor/news/domain/News/repository/SaveNewsRepo';

export class UpdateNews extends ExecuteUseCase<SaveNewsDTO, SaveNewsRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}