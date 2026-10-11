import {FilterablePages} from '@copor/core/domain/Core/enum/FilterablePages';
import {SetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/SetFilterDTO';
import {GetFilterListRepo} from '@copor/core/domain/Core/global/Filter/repository/GetFilterListRepo';
import {CountryFilterListHelper} from '@copor/core/client/Components/Country/repositoryHelper/CountryFilterListHelper';
import {TagFilterListHelper} from '@copor/core/client/Components/Tag/repositoryHelper/TagFilterListHelper';
import {RoleFilterListHelper} from '@copor/core/client/Components/Role/repositoryHelper/RoleFilterListHelper';
import {RegionFilterListHelper} from '@copor/core/client/Components/Region/repositoryHelper/RegionFilterListHelper';
import {UserFilterListHelper} from '@copor/core/client/User/helper/UserFilterListHelper';
import {ContactsFilterListHelper} from '@copor/core/client/User/helper/ContactsFilterListHelper';
import {StateFilterListHelper} from '@copor/core/client/Components/State/repositoryHelper/StateFilterListHelper';
import {getModuleFilterListProvider} from '@copor/core/client/Core/Module/ModuleFilterLists';

export class KyselyGetFilterListInteractorRepo implements GetFilterListRepo {
	async getFilterList(actorId: string, page: string): Promise<SetFilterDTO[]> {
		switch (page) {
			case FilterablePages.COUNTRY :
				return Promise.resolve(CountryFilterListHelper.getCountryFilterList());
			case FilterablePages.TAG :
				return Promise.resolve(TagFilterListHelper.getTagFilterList());
			case FilterablePages.ROLE :
				return Promise.resolve(RoleFilterListHelper.getRoleFilterList());
			case FilterablePages.REGION :
				return Promise.resolve(RegionFilterListHelper.getRegionFilterList());
			case FilterablePages.USER :
				return Promise.resolve(UserFilterListHelper.getUserFilterList());
			case FilterablePages.CONTACT_LIST :
				return Promise.resolve(ContactsFilterListHelper.getContactsFilterList());
			case FilterablePages.STATE :
				return Promise.resolve(StateFilterListHelper.getStateFilterList());
			default :
				return getModuleFilterListProvider(page)?.(actorId) ?? [];
		}
	}
}
