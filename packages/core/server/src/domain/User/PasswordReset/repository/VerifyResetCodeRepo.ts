import {VerifyResetCodeDTO} from '@copor/core/domain/User/PasswordReset/interactor/dto/VerifyResetCodeDTO';
import {FindValidTokenDTO} from '@copor/core/domain/User/PasswordReset/interactor/dto/FindValidTokenDTO';

export interface VerifyResetCodeRepo {
	findValidToken(userName: string): Promise<FindValidTokenDTO | undefined>;
	verifyCode(input: VerifyResetCodeDTO): Promise<void>;
}