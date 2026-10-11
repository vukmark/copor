import {registerAllModuleDefinitions} from '../domain/helpers/allModuleDefinitions';
import {setRegisteredModules} from '@copor/core/client/Core/Module/ModuleRegistry';
import {allModules} from '../../src/modules';

registerAllModuleDefinitions();
// What registerModules does at startup for the module list (definitions are
// registered above); MainRouter, App and the unread counts read it.
setRegisteredModules(allModules);
