import {ExecuteUseCase} from '../../../Interactors/ExecuteUseCase';
import {GetPhoneNumberListRepo} from '../repository/GetPhoneNumberListRepo';
import {GetPhoneNumberDTO} from '../dto/GetPhoneNumberDTO';

export class GetPhoneNumberList extends ExecuteUseCase<string, GetPhoneNumberListRepo, GetPhoneNumberDTO[]> {
	public async execute(): Promise<GetPhoneNumberDTO[]> {
		return await this.repository.list(this.input);
	}
}