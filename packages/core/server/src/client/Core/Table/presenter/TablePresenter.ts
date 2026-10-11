import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {PaginatedTableModelDTO, TableModelDTO} from '@copor/core/client/Core/Table/dto/TableModelDTO';
import {CellDTO} from '@copor/core/client/Core/Table/dto/CellDTO';
import {ColumnHeaderDTO} from '@copor/core/client/Core/Table/dto/ColumnHeaderDTO';
import {TableCell} from '@copor/core/client/Core/Table/TableCell';
import {RowAction} from '@copor/core/client/Core/Table/RowAction';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';
import {AppContext} from '@copor/core/client/Interface/AppContext';

/**
 * @deprecated Use PaginatedTablePresenter for paginated tables or SimpleTablePresenter for non-paginated tables.
 */
export abstract class TablePresenter<InputDTO>
	extends PresenterInstance<InputDTO[], TableModelDTO | PaginatedTableModelDTO> {
	private paginationParams?: PaginationParams;

	constructor(
		input: InputDTO[],
		appContext: AppContext,
		paginationParams?: PaginationParams
	) {
		super(input, appContext);
		this.paginationParams = paginationParams;
	}

	public present(): TableModelDTO | PaginatedTableModelDTO {
		const base: TableModelDTO = {
			header: this.getHeader(),
			body: this.getBody()
		};

		if (this.paginationParams) {
			return {
				... base,
				limit: this.paginationParams.limit,
				offset: this.paginationParams.offset
			};
		}

		return base;
	}

	protected getBody(): CellDTO[][] {
		const body: CellDTO[][] = [];

		this.input.map((item) => {
			body.push(this.getRow(item));
		});
		return body;
	}

	protected abstract getHeader(): ColumnHeaderDTO[];

	protected abstract getActions(item: InputDTO): RowAction[];

	protected abstract getRowCells(item: InputDTO): TableCell[];

	private getRow(inputDTO: InputDTO): CellDTO[] {
		const row: CellDTO[] = [];

		this.getRowCells(inputDTO).map((cell) => {
			row.push(cell.getCell());
		});

		return row;
	}
}

export abstract class PaginatedTablePresenter<InputDTO>
	extends PresenterInstance<InputDTO[], PaginatedTableModelDTO> {
	private readonly paginationParams: PaginationParams;

	constructor(
		input: InputDTO[],
		appContext: AppContext,
		paginationParams: PaginationParams
	) {
		super(input, appContext);
		this.paginationParams = paginationParams;
	}

	public present(): PaginatedTableModelDTO {
		return {
			header: this.getHeader(),
			body: this.getBody(),
			limit: this.paginationParams.limit,
			offset: this.paginationParams.offset
		};
	}

	protected getBody(): CellDTO[][] {
		const body: CellDTO[][] = [];

		this.input.map((item) => {
			body.push(this.getRow(item));
		});
		return body;
	}

	private getRow(inputDTO: InputDTO): CellDTO[] {
		const row: CellDTO[] = [];

		this.getRowCells(inputDTO).map((cell) => {
			row.push(cell.getCell());
		});

		return row;
	}

	protected abstract getHeader(): ColumnHeaderDTO[];
	protected abstract getActions(item: InputDTO): RowAction[];
	protected abstract getRowCells(item: InputDTO): TableCell[];
}

export abstract class SimpleTablePresenter<InputDTO>
	extends PresenterInstance<InputDTO[], TableModelDTO> {
	public present(): TableModelDTO {
		return {
			header: this.getHeaderRow(),
			body: this.getBody()
		};
	}

	protected getBody(): CellDTO[][] {
		const body: CellDTO[][] = [];

		this.input.map((row) => {
			body.push(this.getRow(row));
		});
		return body;
	}

	protected abstract getHeader(): ColumnHeader[];

	protected abstract getActions(item: InputDTO): RowAction[];

	protected abstract getRowCells(item: InputDTO): TableCell[];

	private getHeaderRow(): ColumnHeaderDTO[] {
		return this.getHeader().map((column) => {
			return column.getColumnHeader();
		});
	}

	private getRow(inputDTO: InputDTO): CellDTO[] {
		const row: CellDTO[] = [];

		this.getRowCells(inputDTO).map((cell) => {
			row.push(cell.getCell());
		});

		return row;
	}
}

export interface ColumnHeader {
	getColumnHeader() : ColumnHeaderDTO;
}

