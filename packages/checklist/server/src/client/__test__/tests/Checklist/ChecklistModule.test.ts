import {testModuleDefinitions} from '@copor/core/client/__test__/testHelper/ModuleDefinitions.helper';
import {checklistModule} from '@copor/checklist/client/Checklist/ChecklistModule';
import {ChecklistPermission} from '@copor/checklist/domain/Checklist/ChecklistPermission';

testModuleDefinitions(checklistModule, ChecklistPermission);
