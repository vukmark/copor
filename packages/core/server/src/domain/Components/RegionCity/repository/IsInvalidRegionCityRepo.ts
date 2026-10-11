export interface IsInvalidRegionCityRepo {
	isInvalidRegionCity(regionId: string | undefined): Promise<boolean>;
}