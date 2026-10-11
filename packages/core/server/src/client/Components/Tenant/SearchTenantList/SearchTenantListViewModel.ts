import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface SearchTenantListViewModel {
	id: string;
	name: string;
	city: string;
	publishStatus: PublishStatus;
}