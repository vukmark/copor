import {db} from '@copor/core/client/AppDataSource';
import {ValidateRegisterRepo} from '@copor/core/domain/Registration/repository/ValidateRegisterRepo';
import {GetPasswordSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetPasswordSystemSettingsDTO';
import {SystemSettingsFactory} from '@copor/core/client/SystemSettings/GetSystemSettings/SystemSettingsFactory';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {KyselyRegistrationStatusRepo} from './KyselyRegistrationStatusRepo';

export class KyselyValidateRegisterRepo extends KyselyRegistrationStatusRepo implements ValidateRegisterRepo {
	public async isEmailAlreadyInUse(email: string): Promise<boolean> {
		const row = await db.selectFrom('authUser').select('id').where('email', '=', email).executeTakeFirst();

		return Boolean(row);
	}

	public async isUsernameTaken(userName: string): Promise<boolean> {
		const row = await db.selectFrom('authUser').select('id').where('userName', '=', userName).executeTakeFirst();

		return Boolean(row);
	}

	public getPasswordPolicy(): Promise<GetPasswordSystemSettingsDTO> {
		return SystemSettingsFactory.getSettings<GetPasswordSystemSettingsDTO>(SystemSettingsType.PASSWORD);
	}
}
