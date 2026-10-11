import {CloudNode, CloudNodeType} from '@copor/cloud/domain/Cloud/interactor/dto/CloudNode';

export interface CloudFolderNode {
	type: CloudNodeType.FOLDER;
	name: string;
	path: string;
	uploadEndpoint?: string;
	children: CloudNode[];
}