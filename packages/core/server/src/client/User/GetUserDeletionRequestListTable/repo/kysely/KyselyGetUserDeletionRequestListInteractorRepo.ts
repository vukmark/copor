import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {db} from '@copor/core/client/AppDataSource';
import {GetUserDeletionRequestDTO} from '@copor/core/domain/User/interactor/dto/GetUserDeletionRequestDTO';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';

export class KyselyGetUserDeletionRequestListInteractorRepo implements ListItems<GetUserDeletionRequestDTO> {
	private appContext: AppContext;

	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}

	public async list(input: ListRepoInputDTO): Promise<GetUserDeletionRequestDTO[]> {
		const userRows = await db
			.selectFrom('user')
			.select('id')
			.where('deletionRequested', '=', true)
			.execute();

		return Promise.all(userRows.map(async (userRow) => ({
			id: userRow.id,
			... await UserKyselyHelper.getUserData(userRow.id, this.appContext)
		})));
	}
}
