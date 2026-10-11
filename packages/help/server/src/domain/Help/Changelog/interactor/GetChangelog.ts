import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {ChangelogRepo} from '@copor/help/domain/Help/Changelog/repository/ChangelogRepo';
import {ChangelogDTO} from '@copor/help/domain/Help/Changelog/interactor/dto/ChangelogDTO';
import {ChangelogParser} from '@copor/help/domain/Help/Changelog/interactor/ChangelogParser';

export const LATEST_CHANGELOG_VERSION = 'latest';

export interface GetChangelogInput {
	// A listed version, or LATEST_CHANGELOG_VERSION for the newest one.
	version: string;
}

// One changelog entry; undefined when there is no such version (or none at all
// for `latest`). Only versions the repository lists are read.
export class GetChangelog extends ExecuteUseCase<GetChangelogInput, ChangelogRepo, ChangelogDTO | undefined> {
	public async execute(): Promise<ChangelogDTO | undefined> {
		const versions = ChangelogParser.versionsNewestFirst(await this.repository.listVersions());
		const version = this.input.version === LATEST_CHANGELOG_VERSION
			? versions[0]
			: versions.find((listed) => listed === this.input.version);

		if (!version)
			return undefined;

		const markdown = await this.repository.read(version);

		if (markdown === undefined)
			return undefined;

		return {version, ... ChangelogParser.parse(markdown)};
	}
}
