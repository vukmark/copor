export interface IsInvalidUserPasswordRepo {
    isInvalidUserPassword(userId: string | undefined, password: string | undefined): Promise<boolean>;
}