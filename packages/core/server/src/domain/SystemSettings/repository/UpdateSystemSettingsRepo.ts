import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/SaveSystemSettingsDTO';

export type UpdateSystemSettingsRepo<SettingsDTO> = SaveItem<SaveSystemSettingsDTO<SettingsDTO>>;