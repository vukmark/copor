import {CreateNewItem} from '@copor/core/domain/Core/Repository/CreateNewItem';
import {SaveQueuedEmailDTO} from '../interactor/dto/SaveQueuedEmailDTO';

export type CreateQueuedEmailRepo = CreateNewItem<SaveQueuedEmailDTO>;