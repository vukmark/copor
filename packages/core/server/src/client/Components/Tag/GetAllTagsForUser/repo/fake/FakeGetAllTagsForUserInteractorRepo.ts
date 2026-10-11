import {GetPrivateTagListForUserRepo} from '@copor/core/domain/Components/Tag/repository/GetPrivateTagListForUserRepo';
import {GetTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetTagDTO';
import {Color} from '@copor/core/domain/Core/enum/Color';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';

export class FakeGetAllTagsForUserInteractorRepo implements GetPrivateTagListForUserRepo {
	load(userId: string): Promise<GetTagDTO[]> {
		return Promise.resolve([{
			id: 'id',
			name: 'name',
			color: Color.cyan,
			colorSet: ColorSet.SET9,
			isPrivate: true
		}]);
	}
}