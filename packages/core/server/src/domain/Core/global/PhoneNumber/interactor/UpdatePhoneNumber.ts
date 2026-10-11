import {ExecuteUseCase} from '../../../Interactors/ExecuteUseCase';
import {SavePhoneNumberDTO} from '../dto/SavePhoneNumberDTO';
import {SavePhoneNumberRepo} from '../repository/SavePhoneNumberRepo';

export class UpdatePhoneNumber extends ExecuteUseCase<SavePhoneNumberDTO[], SavePhoneNumberRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}