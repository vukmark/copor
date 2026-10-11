import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetUserContactInformationInteractorRepo} from '../fake/FakeGetUserContactInformationInteractorRepo';
import {GetUserContactInformationRepo}
	from '@copor/contacts/domain/Contacts/GetUserContactInformation/repository/GetUserContactInformationRepo';
import {
	KyselyGetUserContactInformationInteractorRepo
} from '@copor/contacts/client/Contacts/GetUserContactInformation/repo/kysely/KyselyGetUserContactInformationInteractorRepo';
import {GetUserContactInformationDTO} from '@copor/contacts/domain/Contacts/interactor/dto/GetUserContactInformationDTO';

export class GetUserContactInformationInteractorRepoPicker extends NewRepositoryPicker<GetUserContactInformationRepo> {
	protected getRepositoryList(): Record<string, new () => GetItem<GetUserContactInformationDTO>> {
		return {
			[DBEnv.KYSELY]: KyselyGetUserContactInformationInteractorRepo,
			[DBEnv.FAKE]: FakeGetUserContactInformationInteractorRepo
		};
	}
}
