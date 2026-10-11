import {db} from '@copor/core/client/AppDataSource';
import {GetPhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/dto/GetPhoneNumberDTO';
import {GetPhoneNumberListRepo} from '@copor/core/domain/Core/global/PhoneNumber/repository/GetPhoneNumberListRepo';
import {PhoneNumberType} from '@copor/core/domain/Core/global/PhoneNumber/PhoneNumberType';

export class KyselyGetPhoneNumberListInteractorRepo implements GetPhoneNumberListRepo {
	public async list(listId: string): Promise<GetPhoneNumberDTO[]> {
		const phoneNumbers = await db
			.selectFrom('phoneNumber as pn')
			.leftJoin('user as u', 'u.id', 'pn.userId')
			.select([
				'pn.id as id',
				'pn.phoneNumber as phoneNumber',
				'pn.phoneNumberType as phoneNumberType',
				'u.id as userId'
			])
			.where('u.id', '=', listId)
			.execute();

		return phoneNumbers.map((pn) => this.mapToDTO(pn));
	}


	private mapToDTO(pn: {
		id: string;
		phoneNumber: string;
		phoneNumberType: PhoneNumberType;
		userId: string | null;
	}): GetPhoneNumberDTO {
		const userId = pn.userId;

		return {
			id: pn.id,
			user: userId!,
			phoneNumber: pn.phoneNumber,
			phoneNumberType: pn.phoneNumberType
		};
	}
}
