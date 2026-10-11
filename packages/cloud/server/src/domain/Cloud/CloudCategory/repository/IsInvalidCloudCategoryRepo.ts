export interface IsInvalidCloudCategoryRepo {
	isInvalidCloudCategory(cloudCategoryId: string | undefined): Promise<boolean>;
}
