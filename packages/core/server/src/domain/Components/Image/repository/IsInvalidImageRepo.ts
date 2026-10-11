export interface IsInvalidImageRepo {
	isInvalidImage(imageId: string | undefined): Promise<boolean>;
}