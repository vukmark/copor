import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetCountryWithStateListDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryWithStateListDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export class FakeGetCountryInteractorRepo implements GetItem<GetCountryWithStateListDTO> {
	load(id: string): Promise<GetCountryWithStateListDTO> {
		return new Promise((resolve) => {
			resolve(
				{
					id: 'id',
					name: 'Srbija',
					code: 'RS',
					publishStatus: PublishStatus.published,
					stateList: [{
						id: 'id',
						publishStatus: PublishStatus.published,
						name: 'stateName',
						countryId: 'cId',
						code: 'ST'
					}]
				}
			);
		});
	}
}
