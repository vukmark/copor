import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {IsUserNotInChatOfMessageRepo} from '@copor/vu_meet/domain/VuMeet/Message/repository/IsUserNotInChatOfMessageRepo';
import {
    ValidateIsUserInChatOfMessageDTO
} from '@copor/vu_meet/domain/VuMeet/Message/validations/dto/ValidateIsUserInChatOfMessageDTO';
import {UserNotInChatException} from '@copor/vu_meet/domain/VuMeet/Core/exception/UserNotInChatException';

export class ValidateIsUserInChatOfMessage extends ValidatorWithRepo<IsUserNotInChatOfMessageRepo, ValidateIsUserInChatOfMessageDTO> {
    public async validate(): Promise<void> {
        if (!this.input)
            throw new UserNotInChatException();
        if (await this.repository.isUserNotInChatOfMessage(this.input.userId, this.input.messageId))
            throw new UserNotInChatException();
    }
}