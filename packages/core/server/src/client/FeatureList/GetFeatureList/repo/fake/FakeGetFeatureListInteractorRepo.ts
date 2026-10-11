import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetFeatureListDTO} from '@copor/core/domain/FeatureList/interactor/dto/GetFeatureListDTO';
import {CoreFeature} from '@copor/core/domain/FeatureList/enum/CoreFeature';

export class FakeGetFeatureListInteractorRepo implements GetItem<GetFeatureListDTO> {
	load(id: string): Promise<GetFeatureListDTO> {
		return new Promise((resolve) => {
			resolve(
				{
					featureList: [CoreFeature.ADMINISTRATION, '/vu-meet']
				}
			);
		});
	}
}