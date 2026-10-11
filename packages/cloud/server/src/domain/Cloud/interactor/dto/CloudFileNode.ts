import {CloudNodeType} from '@copor/cloud/domain/Cloud/interactor/dto/CloudNode';

export interface CloudFileNode {
	type: CloudNodeType.FILE;
	id: string;
	name: string;
	path: string;
	size: number;
	createdAt: Date;
	creator: {
		id: string;
		firstName: string;
		lastName: string;
	};
	description?: string;
}