export interface IsInvalidCloudFileRepo {
    isInvalidCloudFile(fileId: string | undefined): Promise<boolean>;
}