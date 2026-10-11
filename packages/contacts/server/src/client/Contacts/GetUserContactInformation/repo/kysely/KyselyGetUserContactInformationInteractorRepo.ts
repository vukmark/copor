import {db} from '@copor/core/client/AppDataSource';
import {GetUserContactInformationRepo} from '@copor/contacts/domain/Contacts/GetUserContactInformation/repository/GetUserContactInformationRepo';
import {GetUserContactInformationDTO} from '@copor/contacts/domain/Contacts/interactor/dto/GetUserContactInformationDTO';
import {GetPhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/dto/GetPhoneNumberDTO';

export class  KyselyGetUserContactInformationInteractorRepo implements GetUserContactInformationRepo {
	async load(id: string): Promise<GetUserContactInformationDTO> {
		const userQuery = db
			.selectFrom('user as u')
			.innerJoin('authUser as au', 'u.authUserId', 'au.id')
			.innerJoin('role as r', 'u.roleId', 'r.id')
			.leftJoin('address as a', 'u.addressId', 'a.id')
			.leftJoin('country as c', 'a.country', 'c.id')
			.leftJoin('state as stt', 'a.state', 'stt.id')
			.select(
				[
					'u.id as userId',
					'au.userName as username',
					'au.email as email',
					'r.name as roleName',
					'r.type as roleType',
					'u.firstName as firstName',
					'u.lastName as lastName',
					'u.nickname as nickname',
					'u.salutation as salutation',
					'a.streetAddress as streetAddress',
					'a.city as city',
					'stt.name as state',
					'c.name as country'
				]
			)
			.where('u.id', '=', id);

		const baseData = await userQuery.executeTakeFirst();

		if (!baseData) {
			throw new Error(`User with id ${id} not found`);
		}
		const phoneNumbers = await this.getPhoneNumbers(id);
		const result : GetUserContactInformationDTO = {
			... baseData,
			email: baseData.email ?? '',
			firstName: baseData.firstName ?? undefined,
			lastName: baseData.lastName ?? undefined,
			nickname: baseData.nickname ?? undefined,
			salutation: baseData.salutation ?? undefined,
			streetAddress: baseData.streetAddress ?? undefined,
			city: baseData.city ?? undefined,
			state: baseData.state ?? undefined,
			country: baseData.country ?? undefined,
			phones: phoneNumbers ?? undefined
		};

		return result;
	}

	private async getPhoneNumbers(user: string): Promise<GetPhoneNumberDTO[]> {
		const result = await db
			.selectFrom('user as u')
			.innerJoin('phoneNumber as p', 'u.id', 'p.userId')
			.select([
				'p.id as id',
				'p.userId as user',
				'p.phoneNumber as phoneNumber',
				'p.phoneNumberType as phoneNumberType'
			])
			.where('p.userId', '=', user)
			.execute();

		return result;
	}
}
