import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SaveRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/SaveRegionCityDTO';
import {SaveRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/SaveRegionCityRepo';

export class UpdateRegionCity extends ExecuteUseCase<SaveRegionCityDTO, SaveRegionCityRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}