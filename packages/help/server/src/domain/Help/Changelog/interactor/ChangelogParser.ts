import {ChangelogReleaseDTO} from '@copor/help/domain/Help/Changelog/interactor/dto/ChangelogDTO';

const DATE_REGEX = /(\d{4}-\d{2}-\d{2})/;
// <!-- RELEASES
// iOS: https://…
// Android: https://…
// -->
const RELEASES_REGEX = /<!--\s*RELEASES([\s\S]*?)-->/;
const RELEASE_LINE_REGEX = /^\s*(\w+):\s*(https?:\/\/\S+)\s*$/gm;
// 1.4.0, 2.0.0-beta.1 — not README or other files next to the entries.
const VERSION_REGEX = /^\d[\w.-]*$/;

export interface ParsedChangelog {
	publishDate?: string;
	content: string;
	releases: ChangelogReleaseDTO[];
}

export class ChangelogParser {
	public static parse(markdown: string): ParsedChangelog {
		const releasesBlock = RELEASES_REGEX.exec(markdown)?.[1] ?? '';
		const releases = [... releasesBlock.matchAll(RELEASE_LINE_REGEX)]
			.map((match) => ({platform: match[1].toUpperCase(), url: match[2]}));

		return {
			publishDate: DATE_REGEX.exec(markdown)?.[1],
			content: markdown.replace(RELEASES_REGEX, '').trim(),
			releases
		};
	}

	// Only names that look like a version, newest first, comparing dot-separated
	// parts as numbers (1.10.0 > 1.9.2).
	public static versionsNewestFirst(names: string[]): string[] {
		return names.filter((name) => VERSION_REGEX.test(name)).sort((a, b) => {
			const partsA = a.split('.').map((part) => parseInt(part, 10) || 0);
			const partsB = b.split('.').map((part) => parseInt(part, 10) || 0);

			for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
				const difference = (partsB[i] ?? 0) - (partsA[i] ?? 0);

				if (difference !== 0)
					return difference;
			}
			return b.localeCompare(a);
		});
	}
}
