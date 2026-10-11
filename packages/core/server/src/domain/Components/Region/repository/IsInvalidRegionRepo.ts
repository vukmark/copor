export interface IsInvalidRegionRepo {
	isInvalidRegion(regionId: string | undefined): Promise<boolean>;
}
