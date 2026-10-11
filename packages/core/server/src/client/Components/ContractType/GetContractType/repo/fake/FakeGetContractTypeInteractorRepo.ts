import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetContractTypeDTO} from '@copor/core/domain/Components/ContractType/interactor/dto/GetContractTypeDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export class FakeGetContractTypeInteractorRepo implements GetItem<GetContractTypeDTO> {
	load(id: string): Promise<GetContractTypeDTO> {
		return new Promise((resolve) => {
			resolve(
				{
					id: 'someId',
					name: 'Contract Name',
					file: 'file/path',
					description: 'a description',
					publishStatus: PublishStatus.published
				}
			);
		});
	}
}
