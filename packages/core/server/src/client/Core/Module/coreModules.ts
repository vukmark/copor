import {CoporModule} from '@copor/core/client/Core/Module/CoporModule';
import {contentItemModule} from '@copor/core/client/ContentItem/ContentItemModule';
import {contractModule} from '@copor/core/client/Contract/ContractModule';

// Parts of core that are packaged as module descriptors (own routes,
// migrations, permission keys) but that every app includes: ContentItem holds
// the legal texts the /info pages serve, Contract the contracts login checks.
// They are not listed in src/modules.ts and can't be left out.
export const coreModules: CoporModule[] = [contentItemModule, contractModule];

