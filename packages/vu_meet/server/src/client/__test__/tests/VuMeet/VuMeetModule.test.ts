import {testModuleDefinitions} from '@copor/core/client/__test__/testHelper/ModuleDefinitions.helper';
import {vuMeetModule} from '@copor/vu_meet/client/VuMeet/VuMeetModule';
import {VuMeetPermission} from '@copor/vu_meet/domain/VuMeet/VuMeetPermission';
import {VuMeetFeature} from '@copor/vu_meet/domain/VuMeet/VuMeetFeature';

testModuleDefinitions(vuMeetModule, VuMeetPermission, VuMeetFeature);
