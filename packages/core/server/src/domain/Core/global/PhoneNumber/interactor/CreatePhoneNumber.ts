import {SavePhoneNumberDTO} from '../dto/SavePhoneNumberDTO';
import {ExecuteUseCase} from '../../../Interactors/ExecuteUseCase';
import {SavePhoneNumberRepo} from '../repository/SavePhoneNumberRepo';

export class CreatePhoneNumber extends ExecuteUseCase<SavePhoneNumberDTO[], SavePhoneNumberRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}