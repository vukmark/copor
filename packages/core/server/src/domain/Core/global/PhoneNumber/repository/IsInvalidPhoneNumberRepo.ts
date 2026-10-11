export interface IsInvalidPhoneNumberRepo {
	isInvalidPhoneNumber(phoneid: string | undefined): Promise<boolean>
}