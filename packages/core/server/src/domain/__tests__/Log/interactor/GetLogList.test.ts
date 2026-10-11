import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetLogDTO} from '@copor/core/domain/Log/interactor/dto/GetLogDTO';
import {GetLogList} from '@copor/core/domain/Log/interactor/GetLogList';

describe('Get list of activity types', () => {
	const mockRepo: jest.Mocked<ListItems<GetLogDTO>> = {
		list: jest.fn()
	};
	const expectedResponse: GetLogDTO[] = [{
		id: 'unique-id',
		createdAt: new Date(),
		actorId: 'aid',
		actorUserName: 'userName',
		logData: {
			someKey: 'someData'
		},
		logType: 'lt'
	}];
	const getLogList: GetLogList = new GetLogList([], mockRepo);

	it('Should list all Log', async () => {
		mockRepo.list.mockResolvedValue(expectedResponse);
		expect(await getLogList.execute()).toEqual(expectedResponse);
	});
});