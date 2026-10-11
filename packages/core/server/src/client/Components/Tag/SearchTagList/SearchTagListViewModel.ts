import {Color} from '@copor/core/domain/Core/enum/Color';

export interface SearchTagListViewModel {
	id: string;
	name: string;
	color: Color;
	isPrivate?: boolean;
}
