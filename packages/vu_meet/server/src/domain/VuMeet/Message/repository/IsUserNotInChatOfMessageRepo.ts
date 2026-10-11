export interface IsUserNotInChatOfMessageRepo {
    isUserNotInChatOfMessage(userId: string | undefined, messageId: string | undefined): Promise<boolean>;
}