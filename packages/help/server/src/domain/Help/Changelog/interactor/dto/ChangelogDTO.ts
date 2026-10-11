import {ChangelogVersionDTO} from '@copor/help/domain/Help/Changelog/interactor/dto/ChangelogVersionDTO';

export interface ChangelogReleaseDTO {
	// Upper case, e.g. IOS, ANDROID.
	platform: string;
	url: string;
}

export interface ChangelogDTO extends ChangelogVersionDTO {
	// The entry's Markdown without the RELEASES block.
	content: string;
	releases: ChangelogReleaseDTO[];
}
