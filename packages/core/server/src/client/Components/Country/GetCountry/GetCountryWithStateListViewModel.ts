import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {GetStateDTO} from '@copor/core/domain/Components/State/interactor/dto/GetStateDTO';

export interface GetCountryWithStateListViewModel {
	id: string;
	name: string;
	code: string;
	publishStatus: PublishStatus;
	stateList: GetStateDTO[]
}
