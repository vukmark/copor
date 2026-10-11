import {GetPhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/dto/GetPhoneNumberDTO';
import {GetPhoneNumberListRepo}
	from '@copor/core/domain/Core/global/PhoneNumber/repository/GetPhoneNumberListRepo';

export class FakeGetPhoneNumberListInteractorRepo implements GetPhoneNumberListRepo {
	public list(listId: string): Promise<GetPhoneNumberDTO[]> {
		return Promise.resolve([]);
	}
}
