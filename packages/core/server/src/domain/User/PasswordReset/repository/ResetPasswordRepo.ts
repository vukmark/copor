import {ResetPasswordDTO} from '@copor/core/domain/User/PasswordReset/interactor/dto/ResetPasswordDTO';
import {FindValidTokenDTO} from '@copor/core/domain/User/PasswordReset/interactor/dto/FindValidTokenDTO';

export interface ResetPasswordRepo {
	findValidToken(userName: string): Promise<FindValidTokenDTO | undefined>;
	resetPassword(authUserId: string, newPasswordHash: string): Promise<void>;
	markAsUsed(authUserId: string): Promise<void>;
	verifyAndReset(input: ResetPasswordDTO): Promise<void>;
}