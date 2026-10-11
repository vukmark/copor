import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetStateDTO} from '@copor/core/domain/Components/State/interactor/dto/GetStateDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';


export class FakeGetStateInteractorRepo implements GetItem<GetStateDTO> {
	load(id: string): Promise<GetStateDTO> {
		return new Promise((resolve) => {
			resolve(
				{
					id: id,
					name: 'Brandenburg',
					code: 'BB',
					countryId: 'DE',
					publishStatus: PublishStatus.published
				}
			);
		});
	}
}