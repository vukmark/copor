import Buffer from 'node:buffer';

export interface IsInvalidFileSizeRepo {
    isInvalidFileSize(file: Buffer | undefined): Promise<boolean>;
}