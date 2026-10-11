import {GetFileViewModel} from '@copor/cloud/client/Cloud/GetFileList/GetFileViewModel';

export interface GetFolderViewModel {
	name: string;
	uploadEndpoint: string;
	subfolders: GetFolderViewModel[];
	files: GetFileViewModel[];
}