import {ExecuteUseCase} from '../../../Core/Interactors/ExecuteUseCase';
import {SaveTenantDTO} from './dto/SaveTenantDTO';
import {SaveTenantRepo} from '../repository/SaveTenantRepo';

export class UpdateTenant extends ExecuteUseCase<SaveTenantDTO, SaveTenantRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}