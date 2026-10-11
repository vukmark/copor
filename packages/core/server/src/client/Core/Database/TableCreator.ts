import {CreateTableBuilder, Kysely, sql} from 'kysely';

export class TableCreator<T extends string> {
	private table: CreateTableBuilder<T>;

	constructor(db: Kysely<unknown>, tableName: T) {
		this.table = db.schema.createTable(tableName);
	}

	addId(): void {
		this.table = this.table.addColumn('id', 'varchar(36)', (col) => col.notNull().primaryKey());
	}

	addMultiplePrimaryKeys(columns: string[]): void {
		this.table = this.table.addPrimaryKeyConstraint(
			'pk_' + columns.join('_'),
			columns as never[]
		);
	}

	addName(): void {
		this.table = this.table.addColumn('name', 'varchar(255)', (col) => col.notNull());
	}

	addPublishStatus(isNull: boolean = false): void {
		this.table = this.table.addColumn(
			'publish_status',
			sql.raw('enum("PUBLISHED", "UNPUBLISHED", "DRAFT")'),
			(col) => {
				if (!isNull) {
					col = col.notNull();
				}
				return col.defaultTo('UNPUBLISHED');
			}
		);
	}

	addPhoneNumberType(): void {
		this.table = this.table.addColumn('phone_number_type',
			sql.raw('enum("PHONE_HOME", "PHONE_MOBILE", "PHONE_WORK", "PHONE_OTHER")'),
			(col) => col.notNull());
	}

	addRoleType(isNull: boolean = false): void {
		this.table = this.table.addColumn('role',
			sql.raw('enum("USER", "ADMIN")'),
			(col) => {
				if (!isNull) {
					col.notNull();
				}
				return col;
			});
	}

	addVarChar255(columnName: string, isNull: boolean = false): void {
		this.table = this.table.addColumn(columnName, 'varchar(255)', (col) => {
			if (!isNull) {
				col.notNull();
			}
			return col;
		});
	}

	addVarChar(columnName: string, length: number, isNull: boolean = false) : void {
		this.table = this.table.addColumn(columnName, `varchar(${length})`, (col) => {
			if (!isNull) {
				col.notNull();
			}
			return col;
		});
	}

	addVarCharWithDefaultStringValue(columnName: string, length: number = 255, value : string = '') : void {
		this.table = this.table.addColumn(columnName, `varchar(${length})`, (col) => col.notNull().defaultTo(value));
	}

	addTinyInt(columnName: string, length: number = 1, isNull: boolean = false): void {
		this.table = this.table.addColumn(columnName, sql.raw(`tinyint(${length})`), (col) => {
			if (!isNull) {
				col.notNull();
			}
			return col;
		});
	}

	addDateTime(columnName: string, isNull: boolean = false): void {
		this.table = this.table.addColumn(columnName, 'datetime', (col) => {
			if (!isNull) {
				col.notNull();
			}
			return col;
		});
	}

	addDate(columnName: string, isNull: boolean = false): void {
		this.table = this.table.addColumn(columnName, 'date', (col) => {
			if (!isNull) {
				col.notNull();
			}
			return col;
		});
	}

	addDateTimeWithAutoUpdate(columnName : string): void {
		this.table = this.table.addColumn(
			columnName,
			sql`datetime DEFAULT current_timestamp ON UPDATE current_timestamp`
		);
	}

	addText(columnName: string, isNull: boolean = false): void {
		this.table = this.table.addColumn(columnName, 'text', (col) => {
			if (!isNull) {
				col.notNull();
			}
			return col;
		});
	}

	addLongText(columnName: string, isNull: boolean = false): void {
		this.table = this.table.addColumn(
			columnName,
			sql.raw('longtext'),
			(col) => {
				if (!isNull) {
					col.notNull();
				}
				return col;
			}
		);
	}

	addJsonLongText(columnName: string, isNull: boolean = false
	): void {
		this.table = this.table.addColumn(
			columnName,
			sql`
      longtext
      CHARACTER SET utf8mb4
      COLLATE utf8mb4_bin
      ${isNull ? sql`` : sql`NOT NULL`}
      CHECK (json_valid(${sql.ref(columnName)}))
    `
		);
	}

	// `time_slots` longtext
	// CHARACTER SET utf8mb4
	// COLLATE utf8mb4_bin
	// NOT NULL
	// CHECK (json_valid(`time_slots`))


	addEnumString(columnName: string, enumValues: string[], isNull: boolean = false): void {
		const values = enumValues.map((v) => `'${v}'`).join(',');

		this.table = this.table.addColumn(columnName, sql.raw(`enum(${values})`), (col) => {
			if (!isNull) {
				col = col.notNull();
			}
			return col;
		});
	}

	addEnum(columnName: string, enumObject: Record<string, string>, isNull: boolean = false): void {
		this.addEnumString(columnName, Object.values(enumObject), isNull);
	}

	addTimeStamp(columnName: string) {
		this.table = this.table.addColumn(columnName, 'timestamp', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull());
	}

	addTimeStampWithDefaultValues(columnName: string, defaultValue: string) {
		this.table = this.table.addColumn(columnName, 'timestamp', (col) => col.notNull().defaultTo(`${defaultValue}`));
	}

	addNullableTimestamp(columnName: string): void {
		this.table = this.table.addColumn(
			columnName,
			'timestamp',
			(col) => col.defaultTo(null)
		);
	}

	addForeignKey(
		columnName: string,
		targetTable: string,
		targetColumn: string = 'id'
	): void {
		this.table = this.table.addColumn(columnName, 'varchar(36)', (col) => {
			return col.notNull().references(`${targetTable}.${targetColumn}`).onDelete('cascade');
		});
	}

	addNullableForeignKey(
		columnName: string,
		targetTable: string,
		targetColumn: string = 'id'
	): void {
		this.table = this.table.addColumn(columnName, 'varchar(36)', (col) => {
			return col.references(`${targetTable}.${targetColumn}`).onDelete('cascade');
		});
	}

	addDecimal(columnName: string, precision: number, scale: number, isNull: boolean = false): void {
		this.table = this.table.addColumn(
			columnName,
			sql.raw(`decimal(${precision},${scale})`),
			(col) => {
				if (!isNull)
					col.notNull();
				return col;
			}
		);
	}

	addInt(columnName: string, length: number, isNull: boolean = false): void {
		this.table = this.table.addColumn(
			columnName,
			sql.raw(`int(${length})`),
			(col) => {
				if (!isNull)
					col.notNull();
				return col;
			}
		);
	}

	addTinyIntWithDefault(
		columnName: string,
		defaultValue: 0 | 1 = 0,
		isNull = false,
		length = 1
	): void {
		this.table = this.table.addColumn(
			columnName,
			sql.raw(`tinyint(${length})`),
			(col) => {
				if (!isNull) {
					col.notNull();
				}
				return col.defaultTo(defaultValue);
			}
		);
	}

	addCreatedBy(): void {
		this.addVarChar255('created_by');
	}

	addModifiedBy(): void {
		this.addVarChar255('modified_by');
	}

	addCreatedAt(): void {
		this.addTimeStamp('created_at');
	}

	addModifiedAt(): void {
		this.addTimeStamp('modified_at');
	}

	async execute() {
		await this.table.execute();
	}
}