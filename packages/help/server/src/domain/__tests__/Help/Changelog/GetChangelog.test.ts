import {ChangelogRepo} from '@copor/help/domain/Help/Changelog/repository/ChangelogRepo';
import {GetChangelog, LATEST_CHANGELOG_VERSION} from '@copor/help/domain/Help/Changelog/interactor/GetChangelog';
import {GetChangelogList} from '@copor/help/domain/Help/Changelog/interactor/GetChangelogList';

describe('Changelog interactors', () => {
	const files = new Map<string, string>([
		['1.9.0', '## [1.9.0] - 2026-09-01\n- Older'],
		['1.10.0', '## [1.10.0] - 2026-10-01\n- Newer'],
		['2.0.0', '- Undated']
	]);
	const mockRepo: jest.Mocked<ChangelogRepo> = {
		listVersions: jest.fn(),
		read: jest.fn()
	};

	beforeEach(() => {
		mockRepo.listVersions.mockResolvedValue([... files.keys()]);
		mockRepo.read.mockImplementation((version) => Promise.resolve(files.get(version)));
	});

	it('lists every version with its date, newest first', async () => {
		expect(await new GetChangelogList(undefined, mockRepo).execute()).toEqual([
			{version: '2.0.0', publishDate: undefined},
			{version: '1.10.0', publishDate: '2026-10-01'},
			{version: '1.9.0', publishDate: '2026-09-01'}
		]);
	});

	it('returns one version', async () => {
		expect(await new GetChangelog({version: '1.9.0'}, mockRepo).execute()).toEqual({
			version: '1.9.0',
			publishDate: '2026-09-01',
			content: '## [1.9.0] - 2026-09-01\n- Older',
			releases: []
		});
	});

	it('resolves latest to the newest version', async () => {
		const changelog = await new GetChangelog({version: LATEST_CHANGELOG_VERSION}, mockRepo).execute();

		expect(changelog?.version).toBe('2.0.0');
	});

	it('returns undefined for a version that is not listed, without reading it', async () => {
		expect(await new GetChangelog({version: '../../.env'}, mockRepo).execute()).toBeUndefined();
		expect(mockRepo.read).not.toHaveBeenCalledWith('../../.env');
	});

	it('returns undefined for latest when there is no changelog', async () => {
		mockRepo.listVersions.mockResolvedValue([]);

		expect(await new GetChangelog({version: LATEST_CHANGELOG_VERSION}, mockRepo).execute()).toBeUndefined();
	});
});
