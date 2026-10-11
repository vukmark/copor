import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetContractTypeDTO} from '@copor/core/domain/Components/ContractType/interactor/dto/GetContractTypeDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class FakeGetContractTypeListInteractorRepo implements ListItems<GetContractTypeDTO> {
	public list(input: ListRepoInputDTO): Promise<GetContractTypeDTO[]> {
		return new Promise((resolve) => {
			resolve([
				{
					id: 'someId',
					name: 'Contract Name',
					file: 'file/path',
					description: 'a description',
					publishStatus: PublishStatus.published
				},
				{
					id: 'someId2',
					name: 'Contract Name 2',
					file: 'file/path',
					description: 'a description',
					publishStatus: PublishStatus.published
				}
			]);
		});
	}
}
