import {testModuleDefinitions} from '@copor/core/client/__test__/testHelper/ModuleDefinitions.helper';
import {helpModule} from '@copor/help/client/Help/HelpModule';
import {HelpPermission} from '@copor/help/domain/Help/HelpPermission';
import {HelpFeature} from '@copor/help/domain/Help/HelpFeature';

testModuleDefinitions(helpModule, HelpPermission, HelpFeature);
