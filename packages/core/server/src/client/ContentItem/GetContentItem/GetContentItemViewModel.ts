import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {ContentType} from '@copor/core/domain/Core/enum/ContentType';

export interface GetContentItemViewModel {
	id: string;
	title: string;
	summary: string;
	content: string;
	publishDate: Date;
	role?: GetRoleDTO[];
	contentType: ContentType;
	publishStatus: PublishStatus;
}