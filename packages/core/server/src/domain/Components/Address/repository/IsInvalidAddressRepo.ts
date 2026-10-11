export interface IsInvalidAddressRepo {
	isInvalidAddress(addressId: string | undefined): Promise<boolean>;
}