import {ColumnHeaderDTO} from '@copor/core/client/Core/Table/dto/ColumnHeaderDTO';
import {CellDTO} from '@copor/core/client/Core/Table/dto/CellDTO';

export interface TableModelDTO {
	header: ColumnHeaderDTO[];
	body: CellDTO[][];
}

export interface PaginatedTableModelDTO extends TableModelDTO {
	limit?: string;
	offset?: string;
}
