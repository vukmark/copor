import {GetTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetTagDTO';
import {GetPrivateTagListForUser} from '@copor/core/domain/Components/Tag/interactor/GetPrivateTagListForUser';
import {GetPrivateTagListForUserRepo} from '@copor/core/domain/Components/Tag/repository/GetPrivateTagListForUserRepo';
import {Color} from '@copor/core/domain/Core/enum/Color';
import {GetPrivateTagListForUserDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetPrivateTagListForUserDTO';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';

describe('get private tag list for user interactor tests', () => {
	const mockRepo: jest.Mocked<GetPrivateTagListForUserRepo> = {
		load: jest.fn()
	};
	const input: GetPrivateTagListForUserDTO = {
		actorId: 'aid',
		prompt: 'prompt'
	};
	const expectedResponse: GetTagDTO[] = [{
		id: 'id',
		name: 'name',
		color: Color.blue,
		isPrivate: true,
		colorSet: ColorSet.SET9
	}];
	const getPrivateTagListForUser: GetPrivateTagListForUser = new GetPrivateTagListForUser(input, mockRepo);

	it('should return expected response', async () => {
		mockRepo.load.mockResolvedValue(expectedResponse);
		expect(await getPrivateTagListForUser.execute()).toEqual(expectedResponse);
	});
});
