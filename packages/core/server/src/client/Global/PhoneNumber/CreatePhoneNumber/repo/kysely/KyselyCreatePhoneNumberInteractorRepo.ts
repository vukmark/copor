import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SavePhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/dto/SavePhoneNumberDTO';
import {db} from '@copor/core/client/AppDataSource';
import {TimestampHelper} from '@copor/core/client/Core/Helpers/TimestampHelper';

export class KyselyCreatePhoneNumberInteractorRepo implements SaveItem<SavePhoneNumberDTO[]> {
	private dbInstance = db;

	public useTransaction(trx: typeof db): this {
		this.dbInstance = trx;
		return this;
	}

	async save(saveDTOs: SavePhoneNumberDTO[]): Promise<void> {
		const valuesToInsert = saveDTOs.map((dto) => ({
			id: dto.id,
			userId: dto.user,
			phoneNumber: dto.phoneNumber,
			phoneNumberType: dto.phoneNumberType,
			...TimestampHelper.getTimestampForCreate(dto.actorId)
		}));

		await this.dbInstance
			.insertInto('phoneNumber')
			.values(valuesToInsert)
			.execute();
	}
}