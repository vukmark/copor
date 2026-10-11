import {CellContent} from '@copor/core/client/Core/Table/dto/CellContent';
import {CellType} from '@copor/core/client/Core/Table/enum/CellType';

export interface CellDTO {
	type: CellType;
	content: CellContent;
}