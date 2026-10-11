import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetContractTypeDTO} from '@copor/core/domain/Components/ContractType/interactor/dto/GetContractTypeDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {GetContractTypeList} from '@copor/core/domain/Components/ContractType/interactor/GetContractTypeList';

describe('get Contract Type list interactor test', () => {
	const mockRepo: jest.Mocked<ListItems<GetContractTypeDTO>> = {
		list: jest.fn()
	};
	const expectedResponse: GetContractTypeDTO[] = [{
		id: 'id',
		name: 'name',
		file: 'file',
		description: 'description',
		publishStatus: PublishStatus.published
	}];
	const getContractTypeList: GetContractTypeList = new GetContractTypeList([], mockRepo);

	it('Should list all Contract Type List', async () => {
		mockRepo.list.mockResolvedValue(expectedResponse);
		expect(await getContractTypeList.execute()).toEqual(expectedResponse);
	});
});
