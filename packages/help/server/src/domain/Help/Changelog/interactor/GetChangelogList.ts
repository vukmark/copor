import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {ChangelogRepo} from '@copor/help/domain/Help/Changelog/repository/ChangelogRepo';
import {ChangelogVersionDTO} from '@copor/help/domain/Help/Changelog/interactor/dto/ChangelogVersionDTO';
import {ChangelogParser} from '@copor/help/domain/Help/Changelog/interactor/ChangelogParser';

// Every changelog version with its date, newest first.
export class GetChangelogList extends ExecuteUseCase<undefined, ChangelogRepo, ChangelogVersionDTO[]> {
	public async execute(): Promise<ChangelogVersionDTO[]> {
		const versions = ChangelogParser.versionsNewestFirst(await this.repository.listVersions());

		return Promise.all(versions.map(async (version) => {
			const markdown = await this.repository.read(version);

			return {version, publishDate: markdown ? ChangelogParser.parse(markdown).publishDate : undefined};
		}));
	}
}
