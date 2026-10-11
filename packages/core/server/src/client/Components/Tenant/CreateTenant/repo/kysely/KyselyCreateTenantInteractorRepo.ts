import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveTenantDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/SaveTenantDTO';
import {db} from '@copor/core/client/AppDataSource';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';
import {TimestampHelper} from '@copor/core/client/Core/Helpers/TimestampHelper';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

interface NewAddressDTO {
	addressStreet: string,
	postalCode: string,
	city: string,
	countryId?: string,
	stateId?: string,
	actorId: string
}

interface NewTenantDTO {
	id: string;
	addressStreet: string;
	city: string;
	regionId: string;
	regionCityId: string;
	email: string;
	isBaseTenant: boolean;
	name: string;
	phoneNumber: string;
	publishStatus: PublishStatus;
	contactAddressId?: string;
	contactDepartment?: string;
	contactEmail?: string;
	contactName?: string;
	contactPhone?: string;
	actorId: string;
	latitude?: number;
	longitude?: number;
}
export class KyselyCreateTenantInteractorRepo implements SaveItem<SaveTenantDTO> {
	async save(saveDTO: SaveTenantDTO): Promise<void> {
		await db.transaction().execute(async (trx) => {
			const addressData = await db
				.selectFrom('regionCity')
				.innerJoin('region', 'region.id', 'regionCity.regionId')
				.select(['region.id as regionId', 'region.countryId', 'region.stateId', 'region.postalCode'])
				.where('regionCity.id', '=', saveDTO.regionCityId)
				.executeTakeFirstOrThrow();

			const contactAddressDTO: NewAddressDTO = {
				addressStreet: saveDTO.contactAddressStreet ?? '',
				postalCode: addressData.postalCode ?? '',
				city: saveDTO.city ?? '',
				countryId: addressData.countryId ?? '',
				stateId: addressData.stateId ?? '',
				actorId: saveDTO.actorId
			};

			const contactAddress = await this.addNewAddress(contactAddressDTO, trx);

			const tenantDTO: NewTenantDTO = {
				id: saveDTO.id,
				name: saveDTO.name,
				addressStreet: saveDTO.addressStreet,
				city: saveDTO.city,
				regionId: addressData.regionId,
				regionCityId: saveDTO.regionCityId,
				contactAddressId: contactAddress,
				isBaseTenant: saveDTO.isBaseTenant,
				publishStatus: saveDTO.publishStatus,
				email: saveDTO.email,
				phoneNumber: saveDTO.phone ?? '',
				contactName: saveDTO.contactName ?? '',
				contactDepartment: saveDTO.contactDepartment,
				contactPhone: saveDTO.contactPhone,
				contactEmail: saveDTO.contactEmail,
				actorId: saveDTO.actorId,
				latitude: saveDTO.latitude,
				longitude: saveDTO.longitude
			};

			await this.createTenantEntry(tenantDTO, trx);
		});
	}

	private async createTenantEntry(dto: NewTenantDTO, trx: typeof db): Promise<void> {
		await trx
			.insertInto('tenant')
			.values({
				id: dto.id,
				name: dto.name,
				addressStreet: dto.addressStreet,
				city: dto.city,
				regionId: dto.regionId,
				regionCityId: dto.regionCityId,
				isBaseTenant: Number(dto.isBaseTenant),
				publishStatus: dto.publishStatus,
				email: dto.email,
				phoneNumber: dto.phoneNumber,
				contactName: dto.contactName,
				contactDepartment: dto.contactDepartment,
				contactAddressId: dto.contactAddressId,
				contactPhone: dto.contactPhone,
				contactEmail: dto.contactEmail,
				latitude: dto.latitude,
				longitude: dto.longitude,
				... TimestampHelper.getTimestampForCreate(dto.actorId)
			})
			.execute();
	}

	private async addNewAddress(dto: NewAddressDTO, trx: typeof db): Promise<string> {
		const newId = await new IdGenerator().getNewId();

		await trx
			.insertInto('address')
			.values({
				id: newId,
				streetAddress: dto.addressStreet,
				postalCode: dto.postalCode,
				city: dto.city,
				state: dto.stateId ?? '',
				country: dto.countryId ?? '',
				... TimestampHelper.getTimestampForCreate(dto.actorId)
			})
			.execute();
		return newId;
	}
}
