import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SaveRoleDTO} from './dto/SaveRoleDTO';
import {SaveRoleRepo} from '../repository/SaveRoleRepo';

export class UpdateRole extends ExecuteUseCase<SaveRoleDTO, SaveRoleRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}
