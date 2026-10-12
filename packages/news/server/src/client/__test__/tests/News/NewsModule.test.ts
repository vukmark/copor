import {testModuleDefinitions} from '@copor/core/client/__test__/testHelper/ModuleDefinitions.helper';
import {newsModule} from '@copor/news/client/News/NewsModule';
import {NewsPermission} from '@copor/news/domain/News/NewsPermission';
import {NewsFeature} from '@copor/news/domain/News/NewsFeature';

testModuleDefinitions(newsModule, NewsPermission, NewsFeature);
