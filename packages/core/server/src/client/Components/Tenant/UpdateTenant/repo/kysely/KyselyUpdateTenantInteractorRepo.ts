import {SaveTenantRepo} from '@copor/core/domain/Components/Tenant/repository/SaveTenantRepo';
import {SaveTenantDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/SaveTenantDTO';
import {db} from '@copor/core/client/AppDataSource';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {TimestampHelper} from '@copor/core/client/Core/Helpers/TimestampHelper';

interface TenantUpdateDTO {
	name: string;
	isBaseTenant: number;
	addressStreet: string;
	regionId: string;
	regionCityId: string;
	publishStatus: PublishStatus;
	email: string;
	phoneNumber: string;
	contactName: string;
	contactAddressId: string;
	contactDepartment: string;
	contactPhone: string;
	contactEmail: string;
	longitude?: number;
	latitude?: number;
}

interface AddressDTO {
	streetAddress: string;
	postalCode: string;
	city: string;
}

export class KyselyUpdateTenantInteractorRepo implements SaveTenantRepo {
	async save(saveDTO: SaveTenantDTO): Promise<void> {
		await db.transaction().execute(async (trx) => {
			const contactAddressId = await this.getContactAddressId(saveDTO.id, trx);

			const region = await trx
				.selectFrom('regionCity')
				.select('regionId')
				.where('id', '=', saveDTO.regionCityId)
				.executeTakeFirstOrThrow();

			const tenantDTO: TenantUpdateDTO = {
				regionId: region.regionId,
				regionCityId: saveDTO.regionCityId,
				publishStatus: saveDTO.publishStatus,
				email: saveDTO.email,
				addressStreet: saveDTO.addressStreet,
				name: saveDTO.name,
				contactAddressId: contactAddressId,
				isBaseTenant: Number(saveDTO.isBaseTenant),
				phoneNumber: saveDTO.phone ?? '',
				contactName: saveDTO.contactName ?? '',
				contactDepartment: saveDTO.contactDepartment ?? '',
				contactPhone: saveDTO.contactPhone ?? '',
				contactEmail: saveDTO.contactEmail ?? '',
				latitude: saveDTO.latitude,
				longitude: saveDTO.longitude
			};

			await this.saveTenantUpdate(tenantDTO, saveDTO.id, saveDTO.actorId, trx);

			if (contactAddressId) {
				const contactAddress: AddressDTO = {
					streetAddress: saveDTO.contactAddressStreet ?? '',
					postalCode: saveDTO.contactPostalCode ?? '',
					city: saveDTO.contactCity ?? ''
				};

				await this.changeAddress(
					contactAddress,
					contactAddressId,
					saveDTO.actorId,
					trx
				);
			}
		});
	}

	private async getContactAddressId(tenantId: string, trx: typeof db): Promise<string> {
		const result = await trx
			.selectFrom('tenant')
			.select(['contactAddressId'])
			.where('id', '=', tenantId)
			.executeTakeFirst();

		if (!result) {
			throw new Error(`No tenant found with id ${tenantId}`);
		}

		return result.contactAddressId ?? '';
	}

	private async saveTenantUpdate(
		dto: TenantUpdateDTO,
		id: string,
		actorId: string,
		trx: typeof db
	): Promise<void> {
		await trx
			.updateTable('tenant')
			.set({
				... dto,
				... TimestampHelper.getTimestampForUpdate(actorId)
			})
			.where('id', '=', id)
			.execute();
	}

	private async changeAddress(
		dto: AddressDTO,
		id: string,
		actorId: string,
		trx: typeof db
	): Promise<void> {
		await trx
			.updateTable('address')
			.set({
				... dto,
				... TimestampHelper.getTimestampForUpdate(actorId)
			})
			.where('id', '=', id)
			.execute();
	}
}