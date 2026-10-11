export interface IsInvalidQueuedEmailRepo {
    isInvalidQueuedEmail(emailId: string | undefined): Promise<boolean>;
}