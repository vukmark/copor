import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetChangelogList} from '@copor/help/domain/Help/Changelog/interactor/GetChangelogList';
import {ChangelogVersionDTO} from '@copor/help/domain/Help/Changelog/interactor/dto/ChangelogVersionDTO';
import {ChangelogRepoPicker} from '@copor/help/client/Help/Changelog/repo/repoPicker/ChangelogRepoPicker';

// GET /help/changelog — public (the app installation page is shown before login).
export class GetChangelogListController extends BaseController<undefined, ChangelogVersionDTO[]> {
	async getResponse(): Promise<void> {
		const versions = await this.container.getInteractor(
			GetChangelogList,
			this.container.getNewRepoPicker(ChangelogRepoPicker),
			undefined
		).execute();

		this.response.status(200);
		this.response.send(versions);
	}
}
