/* eslint-disable */
import {DB} from '@copor/core/client/types/db';
import {DueDateFilterValues} from '@copor/core/domain/Core/enum/DueDateFilterValues';
import {SetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/SetFilterDTO';
import {addDays, endOfDay, endOfMonth, endOfWeek, startOfDay, startOfMonth, startOfWeek} from 'date-fns';
import {OperandValueExpressionOrList, SelectQueryBuilder} from 'kysely';
import {FilterNameValues} from '@copor/core/domain/Core/enum/FilterNameValues';
import {PriorityFilterValues} from '@copor/core/domain/Core/enum/PriorityFilterValues';
import {ProgressFilterValues} from '@copor/core/domain/Core/enum/ProgressFilterValues';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import i18next from 'i18next';
import {FilterType} from '@copor/core/domain/Core/enum/FilterType';
import {FilterName} from '@copor/core/domain/Core/global/Filter/dto/FilterName';
import {GetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterDTO';

export class FilterHelper {
    static addSearchFilter<
        Table extends keyof DB,
        Column extends keyof DB[Table] & string,
        Output
    >(
        dbQuery: SelectQueryBuilder<DB, Table, Output>,
        filter: GetFilterDTO,
        column: Column
    ) {
        let value = filter.values?.[0];
        if (value) {
            value = value
                .trim()
                .replace(/\s+/g, '%');

            dbQuery = dbQuery.where(column, 'like', `%${value }%` as OperandValueExpressionOrList<DB, Table, Column>);
        }
        return dbQuery;
    }
	static addSortFilter<
        Table extends keyof DB,
        Column extends keyof DB[Table] & string,
        Output
    >(
		dbQuery: SelectQueryBuilder<DB, Table, Output>,
		filter: GetFilterDTO,
		column: Column
	) {
		if (filter.values![0]) {
			dbQuery = dbQuery.orderBy(column, filter.values![0] as 'asc' | 'desc');
		}
		return dbQuery;
	}

	static addInFilter<
        Table extends keyof DB,
        Column extends keyof DB[Table] & string,
        Output
    >(
		dbQuery: SelectQueryBuilder<DB, Table, Output>,
		column: Column,
		values: (string | number)[]
	) {
		if (values.length > 0) {
			dbQuery = dbQuery.where(column, 'in', values as OperandValueExpressionOrList<DB, Table, Column>);
		}
		return dbQuery;
	}

	static addDueDateFilter<
        Table extends keyof DB,
        Column extends keyof DB[Table] & string,
        Output
    >(
		dbQuery: SelectQueryBuilder<DB, Table, Output>,
		filter: GetFilterDTO,
		column: Column
	) {
		const now = new Date();

		if (!filter.values!.includes(DueDateFilterValues.ALL)) {
			for (const value of filter.values!) {
				switch (value as DueDateFilterValues) {
					case DueDateFilterValues.TODAY :
						dbQuery = dbQuery
							.where(column, '>=', startOfDay(now) as OperandValueExpressionOrList<DB, Table, Column>)
							.where(column, '<=', endOfDay(now) as OperandValueExpressionOrList<DB, Table, Column>);
						break;
					case DueDateFilterValues.TOMORROW :
						dbQuery = dbQuery
							.where(column, '>=', startOfDay(addDays(now, 1)) as OperandValueExpressionOrList<DB, Table, Column>)
							.where(column, '<=', endOfDay(addDays(now, 1)) as OperandValueExpressionOrList<DB, Table, Column>);
						break;
					case DueDateFilterValues.THIS_WEEK :
						dbQuery = dbQuery
							.where(column, '>=', startOfWeek(now) as OperandValueExpressionOrList<DB, Table, Column>)
							.where(column, '<=', endOfWeek(now) as OperandValueExpressionOrList<DB, Table, Column>);
						break;
					case DueDateFilterValues.THIS_MONTH :
						dbQuery = dbQuery
							.where(column, '>=', startOfMonth(now) as OperandValueExpressionOrList<DB, Table, Column>)
							.where(column, '<=', endOfMonth(now) as OperandValueExpressionOrList<DB, Table, Column>);
						break;
				}
			}
		}
		return dbQuery;
	}
}