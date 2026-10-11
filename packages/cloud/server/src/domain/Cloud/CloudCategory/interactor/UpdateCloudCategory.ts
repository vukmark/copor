import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SaveCloudCategoryDTO} from './dto/SaveCloudCategoryDTO';
import {SaveCloudCategoryRepo} from '../repository/SaveCloudCategoryRepo';

export class UpdateCloudCategory extends ExecuteUseCase<SaveCloudCategoryDTO, SaveCloudCategoryRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}