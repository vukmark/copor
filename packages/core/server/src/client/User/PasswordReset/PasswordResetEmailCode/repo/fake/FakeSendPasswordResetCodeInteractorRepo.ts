import {SaveResetCodeDTO} from '@copor/core/domain/User/PasswordReset/interactor/dto/SaveResetCodeDTO';
import {SendPasswordResetCodeRepo} from '@copor/core/domain/User/PasswordReset/repository/SendPasswordResetCodeRepo';

export class FakeSendPasswordResetCodeInteractorRepo implements SendPasswordResetCodeRepo {
	async save(input: SaveResetCodeDTO): Promise<void> {
		return Promise.resolve();
	}
}