import {SaveTagRepo} from '@copor/core/domain/Components/Tag/repository/SaveTagRepo';
import {SaveTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/SaveTagDTO';
import {UpdateTag} from '@copor/core/domain/Components/Tag/interactor/UpdateTag';
import {Color} from '@copor/core/domain/Core/enum/Color';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';

describe('Update tag test', () => {
	let mockRepo: jest.Mocked<SaveTagRepo>;
	let input: SaveTagDTO;
	let updateTag: UpdateTag;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};

		input = {
			colorSet: ColorSet.SET9,
			id: 'some-id',
			name: 'tag',
			description: 'description of tag',
			color: Color.black,
			actorId: 'creator-id',
			isPrivate: true
		};
		updateTag = new UpdateTag(input, mockRepo);
	});
	it('Should save data for update', async () => {
		await updateTag.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});
