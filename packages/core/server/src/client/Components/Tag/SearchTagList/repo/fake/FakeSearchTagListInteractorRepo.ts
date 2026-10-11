import {SearchTagRepo} from '@copor/core/domain/Components/Tag/repository/SearchTagRepo';
import {SearchTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/SearchTagDTO';
import {Color} from '@copor/core/domain/Core/enum/Color';

export class FakeSearchTagListInteractorRepo implements SearchTagRepo {
	search(input: string): Promise<SearchTagDTO[]> {
		return Promise.resolve(
			[{
				id: '1',
				name: 'tag1',
				color: Color.cyan
			}]
		);
	}
}
