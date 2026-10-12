import {testModuleDefinitions} from '@copor/core/client/__test__/testHelper/ModuleDefinitions.helper';
import {corePermissionDefinitions} from '@copor/core/domain/Core/Permission/CorePermissionDefinitions';
import {coreFeatureDefinitions} from '@copor/core/domain/FeatureList/CoreFeatureDefinitions';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';
import {CoreFeature} from '@copor/core/domain/FeatureList/enum/CoreFeature';
import {contentItemModule} from '@copor/core/client/ContentItem/ContentItemModule';
import {ContentItemPermission} from '@copor/core/domain/ContentItem/ContentItemPermission';
import {ContentItemFeature} from '@copor/core/domain/ContentItem/ContentItemFeature';
import {contractModule} from '@copor/core/client/Contract/ContractModule';
import {ContractPermission} from '@copor/core/domain/Contract/ContractPermission';
import {ContractFeature} from '@copor/core/domain/Contract/ContractFeature';

testModuleDefinitions({name: 'core', permissions: corePermissionDefinitions, features: coreFeatureDefinitions}, CorePermission, CoreFeature);
testModuleDefinitions(contentItemModule, ContentItemPermission, ContentItemFeature);
testModuleDefinitions(contractModule, ContractPermission, ContractFeature);
