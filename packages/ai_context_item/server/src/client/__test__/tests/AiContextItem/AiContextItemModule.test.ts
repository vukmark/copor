import {testModuleDefinitions} from '@copor/core/client/__test__/testHelper/ModuleDefinitions.helper';
import {aiContextItemModule} from '@copor/ai_context_item/client/AiContextItem/AiContextItemModule';
import {AiContextItemPermission} from '@copor/ai_context_item/domain/AiContextItem/AiContextItemPermission';
import {AiContextItemFeature} from '@copor/ai_context_item/domain/AiContextItem/AiContextItemFeature';

testModuleDefinitions(aiContextItemModule, AiContextItemPermission, AiContextItemFeature);
