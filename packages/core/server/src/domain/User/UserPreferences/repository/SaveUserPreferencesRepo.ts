import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';

import {SaveUserPreferencesDTO} from '../interactor/dto/SaveUserPreferencesDTO';

export type SaveUserPreferencesRepo = SaveItem<SaveUserPreferencesDTO>;
