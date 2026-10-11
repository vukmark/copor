import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {GetCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryDTO';

export class FakeGetDefaultCountryInteractorRepo implements GetItem<GetCountryDTO[]> {
	load(id: string): Promise<GetCountryDTO[]> {
		return new Promise((resolve) => {
			resolve([
				{
					id: 'id',
					name: 'Srbija',
					code: 'RS',
					publishStatus: PublishStatus.published
				}
			]
			);
		});
	}
}
