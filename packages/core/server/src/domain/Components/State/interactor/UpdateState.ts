import {SaveStateDTO} from './dto/SaveStateDTO';
import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';

export class UpdateState extends ExecuteUseCase<SaveStateDTO, SaveItem<SaveStateDTO>, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}