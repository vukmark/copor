import {SaveItem} from './SaveItem';
import {Id} from './Id';

export type CreateNewItem<SaveDTO extends Id> = SaveItem<SaveDTO>;
