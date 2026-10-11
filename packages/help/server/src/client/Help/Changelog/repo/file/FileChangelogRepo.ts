import fs from 'node:fs/promises';
import {ChangelogRepo} from '@copor/help/domain/Help/Changelog/repository/ChangelogRepo';
import {SystemFileHelper} from '@copor/core/client/Core/Helpers/SystemFileHelper';

const MARKDOWN_EXTENSION = '.md';

// `<cwd>/changelog/<version>.md` — the app's own content, not module code (see
// changelog/README.md). Both DB envs read the same files.
export class FileChangelogRepo implements ChangelogRepo {
	public static directory(): string {
		return SystemFileHelper.filePath(['changelog']);
	}

	public async listVersions(): Promise<string[]> {
		try {
			const files = await fs.readdir(FileChangelogRepo.directory());

			return files
				.filter((file) => file.endsWith(MARKDOWN_EXTENSION))
				.map((file) => file.slice(0, -MARKDOWN_EXTENSION.length));
		} catch {
			return [];
		}
	}

	public async read(version: string): Promise<string | undefined> {
		// Only names readdir returned, never a path built from request input.
		if (!(await this.listVersions()).includes(version))
			return undefined;

		return fs.readFile(SystemFileHelper.filePath(['changelog', version + MARKDOWN_EXTENSION]), 'utf-8');
	}
}
