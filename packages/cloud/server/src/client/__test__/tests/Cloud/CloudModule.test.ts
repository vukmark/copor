import {testModuleDefinitions} from '@copor/core/client/__test__/testHelper/ModuleDefinitions.helper';
import {cloudModule} from '@copor/cloud/client/Cloud/CloudModule';
import {CloudPermission} from '@copor/cloud/domain/Cloud/CloudPermission';
import {CloudFeature} from '@copor/cloud/domain/Cloud/CloudFeature';

testModuleDefinitions(cloudModule, CloudPermission, CloudFeature);
