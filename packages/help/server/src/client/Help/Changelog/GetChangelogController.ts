import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetChangelog} from '@copor/help/domain/Help/Changelog/interactor/GetChangelog';
import {ChangelogDTO} from '@copor/help/domain/Help/Changelog/interactor/dto/ChangelogDTO';
import {ChangelogNotFoundException} from '@copor/help/domain/Help/Changelog/exception/ChangelogNotFoundException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ChangelogRepoPicker} from '@copor/help/client/Help/Changelog/repo/repoPicker/ChangelogRepoPicker';

interface GetChangelogParams {
	version: string;
}

// GET /help/changelog/:version (or `latest`) — public, like the list.
export class GetChangelogController extends BaseController<undefined, ChangelogDTO> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetChangelogParams;
		const changelog = await this.container.getInteractor(
			GetChangelog,
			this.container.getNewRepoPicker(ChangelogRepoPicker),
			{version: params.version}
		).execute();

		if (!changelog) {
			this.next(new ErrorList([new ChangelogNotFoundException()]));
			return;
		}

		this.response.status(200);
		this.response.send(changelog);
	}
}
