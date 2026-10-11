import {ListItemsUseCase} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';
import {SystemSettingsListDTO} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';

export class GetSystemSettingsList extends ListItemsUseCase<SystemSettingsListDTO> {}
