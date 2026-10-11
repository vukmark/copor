import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';

import {SaveMessageDTO} from '../interactor/dto/SaveMessageDTO';

export type SaveMessageRepo = SaveItem<SaveMessageDTO>;
