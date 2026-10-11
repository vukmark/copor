import {SavePhoneNumberRepo} from '@copor/core/domain/Core/global/PhoneNumber/repository/SavePhoneNumberRepo';
import {SavePhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/dto/SavePhoneNumberDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyUpdatePhoneNumberInteractorRepo implements SavePhoneNumberRepo {
	async save(saveDTOs: SavePhoneNumberDTO[]): Promise<void> {
		for (const dto of saveDTOs) {
			await db
				.updateTable('phoneNumber')
				.set({
					userId: dto.user,
					phoneNumber: dto.phoneNumber,
					phoneNumberType: dto.phoneNumberType,
					modifiedAt: new Date(),
					modifiedBy: dto.actorId
				})
				.where('id', '=', dto.id)
				.execute();
		}
	}
}
