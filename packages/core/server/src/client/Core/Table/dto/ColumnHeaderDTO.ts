import {CellType} from '@copor/core/client/Core/Table/enum/CellType';
import {ColumnSize} from '@copor/core/client/Core/Table/enum/ColumnSize';
import {Alignment} from '@copor/core/client/Core/Table/enum/Alignment';

export interface ColumnHeaderDTO {
	name: string;
	key?: string;
	sortKey?: string;
	type?: CellType;
	info?: string;
	size?: ColumnSize;
	fixedWidth?: number;
	defaultSortDir?: string;
	alignment?: Alignment;
}