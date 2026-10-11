import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SavePhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/dto/SavePhoneNumberDTO';

export class FakeCreatePhoneNumberInteractorRepo implements SaveItem<SavePhoneNumberDTO[]> {
	save(saveDTO: SavePhoneNumberDTO[]): Promise<void> {
		return Promise.resolve();
	}
}
