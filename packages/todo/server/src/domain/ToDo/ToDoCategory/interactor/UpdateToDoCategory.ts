import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveToDoCategoryDTO} from './dto/SaveToDoCategoryDTO';

export class UpdateToDoCategory extends ExecuteUseCase<SaveToDoCategoryDTO, SaveItem<SaveToDoCategoryDTO>, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}
