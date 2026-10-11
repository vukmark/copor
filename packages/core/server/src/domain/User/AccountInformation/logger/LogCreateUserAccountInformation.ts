import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

export interface LogDataForCreateUserAccountInformation {
	roleType: RoleType;
	email?: string;
}

export class LogCreateUserAccountInformation
	extends TypedLogger<LogDataForCreateUserAccountInformation> {
	getType(): string {
		return 'createUserAccountInformation';
	}
}
