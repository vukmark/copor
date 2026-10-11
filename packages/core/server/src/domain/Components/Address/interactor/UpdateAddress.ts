import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SaveAddressDTO} from './dto/SaveAddressDTO';
import {SaveAddressRepo} from '../repository/SaveAddressRepo';

export class UpdateAddress extends ExecuteUseCase<SaveAddressDTO, SaveAddressRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}