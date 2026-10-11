import {IsNotValidUserRepo} from '@copor/core/domain/User/repository/IsNotValidUserRepo';

import {IsInvalidUserPasswordRepo} from '@copor/core/domain/User/repository/IsInvalidUserPasswordRepo';
import {GetPasswordPolicyRepo} from '@copor/core/domain/Core/Repository/GetPasswordPolicyRepo';
import {PasswordHistoryRepo} from '@copor/core/domain/Core/Repository/PasswordHistoryRepo';
import {UserIdentityDTO} from '@copor/core/domain/User/repository/dto/UserIdentityDTO';

export interface ValidateUpdateUserLoginInformationRepo extends
	IsNotValidUserRepo,
	IsInvalidUserPasswordRepo,
	GetPasswordPolicyRepo,
	PasswordHistoryRepo {
	getUserIdentity(userId: string): Promise<UserIdentityDTO>;
}