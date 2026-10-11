import {EntityRepoHelper} from '@copor/core/client/Core/repositoryHelper/EntityRepoHelper';
import {db} from '@copor/core/client/AppDataSource';
import {PhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/dto/PhoneNumberDTO';

export class PhoneNumberKyselyHelper {
	private static readonly helper = new EntityRepoHelper('phoneNumber');

	public static async isInvalidPhoneNumber(id: string | undefined) {
		return this.helper.isInvalid(id);
	}
	public static async phoneNumberHasReferences(id: string | undefined) {
		return this.helper.hasReferences(id);
	}
	static async getUserPhoneNumbers(userId: string): Promise<PhoneNumberDTO[]> {
		const rows = await db.selectFrom('phoneNumber')
			.select(['phoneNumber', 'phoneNumberType'])
			.where('userId', '=', userId)
			.execute();

		return rows.map((r) => ({
			phoneTitle: r.phoneNumberType, phoneNumber: r.phoneNumber
		}));
	}
}