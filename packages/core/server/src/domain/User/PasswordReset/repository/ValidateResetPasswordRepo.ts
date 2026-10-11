import {GetPasswordPolicyRepo} from '@copor/core/domain/Core/Repository/GetPasswordPolicyRepo';
import {PasswordHistoryRepo} from '@copor/core/domain/Core/Repository/PasswordHistoryRepo';

export interface ValidateResetPasswordRepo extends GetPasswordPolicyRepo, PasswordHistoryRepo {
	getAuthUserId(userNameOrEmail: string): Promise<string | undefined>;
}
