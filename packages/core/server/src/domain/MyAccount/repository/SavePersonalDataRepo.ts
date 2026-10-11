import {SaveItem} from '../../Core/Repository/SaveItem';
import {SavePersonalDataDTO} from '../interactor/dto/SavePersonalDataDTO';
import {UniqueIdGenerator} from '../../Core/Repository/UniqueIdGenerator';

export interface SavePersonalDataRepo extends SaveItem<SavePersonalDataDTO>, UniqueIdGenerator {
}