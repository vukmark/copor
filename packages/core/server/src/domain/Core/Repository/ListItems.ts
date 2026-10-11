import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export interface ListItems<Item> {
	list(input: ListRepoInputDTO): Promise<Item[]>;
}
