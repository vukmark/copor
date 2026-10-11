import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {SearchTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/SearchTagDTO';
import {SearchTagListViewModel} from './SearchTagListViewModel';

export class SearchTagListPresenter extends PresenterInstance<SearchTagDTO[], SearchTagListViewModel[]> {
	public present(): SearchTagListViewModel[] {
		return this.input;
	}
}
