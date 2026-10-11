import path from 'node:path';

// Core's translations (`<namespace>/<language>.json`); modules add theirs
// through their descriptor's `localesFolder` (Core/Module/ModuleLocales.ts).
export const coreLocalesFolder = path.join(__dirname, 'locales');
