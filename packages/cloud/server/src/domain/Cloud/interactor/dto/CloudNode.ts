import {CloudFolderNode} from '@copor/cloud/domain/Cloud/interactor/dto/CloudFolderNode';
import {CloudFileNode} from '@copor/cloud/domain/Cloud/interactor/dto/CloudFileNode';

export type CloudNode =
    | CloudFolderNode
    | CloudFileNode;

export enum CloudNodeType {
	FILE = 'FILE',
	FOLDER = 'FOLDER'
}