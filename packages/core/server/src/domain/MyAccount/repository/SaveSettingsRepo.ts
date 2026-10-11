import {SaveItem} from '../../Core/Repository/SaveItem';
import {SaveSettingsDTO} from '../interactor/dto/SaveSettingsDTO';
import {UniqueIdGenerator} from '../../Core/Repository/UniqueIdGenerator';

export interface SaveSettingsRepo extends SaveItem<SaveSettingsDTO>, UniqueIdGenerator {
}