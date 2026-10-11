import {SaveTagDTO} from './dto/SaveTagDTO';
import {ExecuteUseCase} from '../../../Core/Interactors/ExecuteUseCase';
import {SaveItem} from '../../../Core/Repository/SaveItem';

export class UpdateTag extends ExecuteUseCase<SaveTagDTO, SaveItem<SaveTagDTO>, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}
