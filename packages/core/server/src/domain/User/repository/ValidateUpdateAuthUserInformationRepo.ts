import {IsNotValidUserRepo} from '@copor/core/domain/User/repository/IsNotValidUserRepo';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {GetPasswordPolicyRepo} from '@copor/core/domain/Core/Repository/GetPasswordPolicyRepo';
import {PasswordHistoryRepo} from '@copor/core/domain/Core/Repository/PasswordHistoryRepo';

export interface ValidateUpdateAuthUserInformationRepo extends
	IsNotValidUserRepo,
	GetPasswordPolicyRepo,
	PasswordHistoryRepo {
	getUserRoleType(userId: string): Promise<RoleType | undefined>;
	isUserNameUsedByAnotherUser(id: string, userName: string): Promise<boolean>;
	isEmailUsedByAnotherUser(id: string, email: string): Promise<boolean>;
	getAuthUserId(userId: string): Promise<string | undefined>;
}
