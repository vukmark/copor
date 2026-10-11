import {SaveResetCodeDTO} from '@copor/core/domain/User/PasswordReset/interactor/dto/SaveResetCodeDTO';

export interface SendPasswordResetCodeRepo {
	save(input: SaveResetCodeDTO): Promise<void>;
}