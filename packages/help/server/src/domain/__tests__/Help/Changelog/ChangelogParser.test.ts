import {ChangelogParser} from '@copor/help/domain/Help/Changelog/interactor/ChangelogParser';

describe('ChangelogParser', () => {
	const markdown = `## [1.2.0] - 2026-10-01

### New Features

- Something new

<!--
RELEASES

iOS: https://testflight.apple.com/join/abc
Android: https://example.com/download/app.1.2.0.apk

-->`;

	it('reads the date, strips the RELEASES block and lists the releases', () => {
		const parsed = ChangelogParser.parse(markdown);

		expect(parsed.publishDate).toBe('2026-10-01');
		expect(parsed.content).toBe('## [1.2.0] - 2026-10-01\n\n### New Features\n\n- Something new');
		expect(parsed.releases).toEqual([
			{platform: 'IOS', url: 'https://testflight.apple.com/join/abc'},
			{platform: 'ANDROID', url: 'https://example.com/download/app.1.2.0.apk'}
		]);
	});

	it('handles an entry without a date or releases', () => {
		expect(ChangelogParser.parse('- Fixes')).toEqual({publishDate: undefined, content: '- Fixes', releases: []});
	});

	it('sorts versions newest first, comparing parts as numbers', () => {
		expect(ChangelogParser.versionsNewestFirst(['1.9.2', '1.10.0', '0.9', '1.9.10']))
			.toEqual(['1.10.0', '1.9.10', '1.9.2', '0.9']);
	});

	it('leaves out names that are not versions', () => {
		expect(ChangelogParser.versionsNewestFirst(['README', '1.0.0', 'template', '2.0.0-beta.1']))
			.toEqual(['2.0.0-beta.1', '1.0.0']);
	});
});
