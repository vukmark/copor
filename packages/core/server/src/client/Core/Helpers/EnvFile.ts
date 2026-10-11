import {resolve} from 'node:path';

// The app's .env: the server, its scripts and its tests run from the app's
// folder (apps/<app>/server), which owns the config — not from a package.
export function envFilePath(): string {
	return resolve(process.cwd(), '.env');
}
