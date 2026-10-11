import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';

export interface GetNewsDTO {
	id: string;
	title: string;
	summary: string;
	content: string;
	publishDate: Date;
	role: GetRoleDTO[];
	publishStatus: PublishStatus;
}