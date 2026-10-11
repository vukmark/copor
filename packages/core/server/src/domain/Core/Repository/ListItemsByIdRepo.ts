import {ListItemsByIdDTO} from '@copor/core/domain/Core/Interactors/ListItemsByIdUseCase';

export interface ListItemsByIdRepo<Item> {
    list(input: ListItemsByIdDTO): Promise<Item[]>;
}