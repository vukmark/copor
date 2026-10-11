import {SharingType} from '@copor/cloud/domain/Cloud/interactor/dto/SaveFileDTO';
import {Generated} from '@copor/core/client/types/tables/Generated';

export interface CloudFile {
	id: string;
	description: string | null;
	name: string;
	path: string;
	sharingType: SharingType;
	size: number;
	createdAt: Generated<Date>;
	createdBy: string;
}
