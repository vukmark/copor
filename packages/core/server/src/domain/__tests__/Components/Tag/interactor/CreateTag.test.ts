import {CreateTag} from '@copor/core/domain/Components/Tag/interactor/CreateTag';
import {SaveTagRepo} from '@copor/core/domain/Components/Tag/repository/SaveTagRepo';
import {SaveTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/SaveTagDTO';
import {Color} from '@copor/core/domain/Core/enum/Color';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';

describe('test create tag', () => {
	let createTag: CreateTag;
	let mockRepo: jest.Mocked<SaveTagRepo>;
	const input: SaveTagDTO = {
		colorSet: ColorSet.SET9,
		id: 'unique-id',
		name: 'name',
		color: Color.black,
		actorId: 'id',
		isPrivate: true
	};

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		createTag = new CreateTag(input, mockRepo);
	});
	it('should save', async () => {
		await createTag.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});
