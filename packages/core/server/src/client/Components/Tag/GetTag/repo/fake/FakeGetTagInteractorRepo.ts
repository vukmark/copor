import {GetTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetTagDTO';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {Color} from '@copor/core/domain/Core/enum/Color';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';

export class FakeGetTagInteractorRepo implements GetItem<GetTagDTO> {
	load(id: string): Promise<GetTagDTO> {
		return new Promise((resolve) => {
			resolve(
				{
					id: 'tag-123',
					name: 'Sample Tag',
					color: Color.blue,
					colorSet: ColorSet.SET5,
					description: 'This is a sample tag description',
					isPrivate: false
				}
			);
		});
	}
}