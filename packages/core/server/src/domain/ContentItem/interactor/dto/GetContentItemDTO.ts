import {ContentType} from '@copor/core/domain/Core/enum/ContentType';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';

export interface GetContentItemDTO {
	id: string;
	title: string;
	summary: string;
	content: string;
	publishDate: Date;
	contentType: ContentType;
	publishStatus: PublishStatus;
	role?: GetRoleDTO[];
}