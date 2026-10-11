import {UpdateUserAccountInformationRepo} from '@copor/core/domain/User/repository/UpdateUserAccountInformationRepo';
import {UpdateUserAccountInformationDTO} from '@copor/core/domain/User/interactor/dto/UpdateUserAccountInformationDTO';
import {db} from '@copor/core/client/AppDataSource';

abstract class KyselyUpdateUserAccountBaseInformationInteractorRepo
implements UpdateUserAccountInformationRepo {
	public async save(saveDTO: UpdateUserAccountInformationDTO): Promise<void> {
		await this.updateBaseUser(saveDTO);

		await this.updateAuthUser(saveDTO);

		await this.updateRoleSpecificData(saveDTO);

		if (saveDTO.addressId)
			await this.updateAddress(saveDTO);
	}

	protected async updateBaseUser(
		saveDTO: UpdateUserAccountInformationDTO
	): Promise<void> {
		const updateData = {
			... saveDTO.contactNote !== undefined && {
				contactNote: saveDTO.contactNote
			}
		};

		if (Object.keys(updateData).length === 0)
			return;

		await db
			.updateTable('user')
			.set(updateData)
			.where('id', '=', saveDTO.id)
			.execute();
	}


	private async updateAddress(saveDTO: UpdateUserAccountInformationDTO) {
		await db
			.updateTable('address')
			.set({
				streetAddress: saveDTO.addressStreet,
				postalCode: saveDTO.postalCode,
				city: saveDTO.city,
				country: saveDTO.country,
				state: saveDTO.state
			})
			.where('id', '=', saveDTO.addressId!)
			.execute();
	}

	private async updateAuthUser(
		saveDTO: UpdateUserAccountInformationDTO
	) {
		const updateData = {
			... saveDTO.email !== undefined && {
				email: saveDTO.email || null
			},
			... saveDTO.userName && {
				userName: saveDTO.userName
			}
		};

		if (Object.keys(updateData).length === 0)
			return;

		await db
			.updateTable('authUser')
			.set(updateData)
			.where(
				'id',
				'=',
				db
					.selectFrom('user')
					.select('authUserId')
					.where('id', '=', saveDTO.id)
			)
			.execute();
	}


	protected abstract updateRoleSpecificData(
		saveDTO: UpdateUserAccountInformationDTO
	): Promise<void>;
}

export default KyselyUpdateUserAccountBaseInformationInteractorRepo;