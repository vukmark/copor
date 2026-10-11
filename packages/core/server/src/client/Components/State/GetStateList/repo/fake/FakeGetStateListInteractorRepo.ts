import {GetStateDTO} from '@copor/core/domain/Components/State/interactor/dto/GetStateDTO';
import {GetStateListRepo} from '@copor/core/domain/Components/State/repository/GetStateListRepo';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export class FakeGetStateListInteractorRepo implements GetStateListRepo {
	public list(c:string): Promise<GetStateDTO[]> {
		return new Promise((resolve) => {
			resolve(
				[{
					id: '1',
					name: 'Bavaria',
					code: 'BY',
					countryId: 'DE',
					publishStatus: PublishStatus.published
				},
				{
					id: '2',
					name: 'Baden-Württemberg',
					code: 'BW',
					countryId: 'DE',
					publishStatus: PublishStatus.published
				},
				{
					id: '3',
					name: 'Berlin',
					code: 'BE',
					countryId: 'DE',
					publishStatus: PublishStatus.published
				},
				{
					id: '4',
					name: 'Brandenburg',
					code: 'BB',
					countryId: 'DE',
					publishStatus: PublishStatus.published
				},
				{
					id: '5',
					name: 'Bremen',
					code: 'HB',
					countryId: 'DE',
					publishStatus: PublishStatus.published
				},
				{
					id: '6',
					name: 'Hamburg',
					code: 'HH',
					countryId: 'DE',
					publishStatus: PublishStatus.published
				},
				{
					id: '7',
					name: 'Hesse',
					code: 'HE',
					countryId: 'DE',
					publishStatus: PublishStatus.published
				},
				{
					id: '8',
					name: 'Lower Saxony',
					code: 'NI',
					countryId: 'DE',
					publishStatus: PublishStatus.published
				},
				{
					id: '9',
					name: 'Mecklenburg-Vorpommern',
					code: 'MV',
					countryId: 'DE',
					publishStatus: PublishStatus.published
				},
				{
					id: '10',
					name: 'North Rhine-Westphalia',
					code: 'NW',
					countryId: 'DE',
					publishStatus: PublishStatus.published
				}]
			);
		});
	}
}
