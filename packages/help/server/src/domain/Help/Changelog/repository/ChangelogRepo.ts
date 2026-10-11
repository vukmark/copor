// The changelog's Markdown files, one per version (file name = version).
export interface ChangelogRepo {
	listVersions(): Promise<string[]>;
	// Undefined when there is no file for `version`.
	read(version: string): Promise<string | undefined>;
}
