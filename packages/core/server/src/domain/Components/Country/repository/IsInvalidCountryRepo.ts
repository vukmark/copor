export interface IsInvalidCountryRepo {
	isInvalidCountry(countryId: string | undefined): Promise<boolean>;
}