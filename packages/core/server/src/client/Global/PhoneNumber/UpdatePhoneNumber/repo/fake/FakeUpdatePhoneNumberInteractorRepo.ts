import {SavePhoneNumberRepo} from '@copor/core/domain/Core/global/PhoneNumber/repository/SavePhoneNumberRepo';
import {SavePhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/dto/SavePhoneNumberDTO';

export class FakeUpdatePhoneNumberInteractorRepo implements SavePhoneNumberRepo {
	save(saveDTO: SavePhoneNumberDTO[]): Promise<void> {
		return Promise.resolve(undefined);
	}
}
