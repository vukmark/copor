import {SaveRegionDTO} from './dto/SaveRegionDTO';
import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SaveRegionRepo} from '../repository/SaveRegionRepo';

export class UpdateRegion extends ExecuteUseCase<SaveRegionDTO, SaveRegionRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}