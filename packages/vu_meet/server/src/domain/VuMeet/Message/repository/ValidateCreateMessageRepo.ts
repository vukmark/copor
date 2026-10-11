import {IsInvalidChatRepo} from './IsInvalidChatRepo';
import {IsNotValidUserRepo} from '@copor/core/domain/User/repository/IsNotValidUserRepo';
import {IsUserNotInChatRepo} from './IsUserNotInChatRepo';

import {IsInvalidFileSizeRepo} from '@copor/core/domain/Core/Repository/IsInvalidFileSizeRepo';

export interface ValidateCreateMessageRepo extends
	IsInvalidChatRepo,
	IsNotValidUserRepo,
	IsUserNotInChatRepo,
	IsInvalidFileSizeRepo {
}
