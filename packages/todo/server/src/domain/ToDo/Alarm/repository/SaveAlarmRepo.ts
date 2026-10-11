import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveAlarmDTO} from '../interactor/dto/SaveAlarmDTO';

export type SaveAlarmRepo = SaveItem<SaveAlarmDTO>;