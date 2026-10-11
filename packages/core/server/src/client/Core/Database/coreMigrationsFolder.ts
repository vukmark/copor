import path from 'node:path';

// Core's Kysely migrations; the app's migration runner runs them first.
export const coreMigrationsFolder = path.join(__dirname, 'migrations');
