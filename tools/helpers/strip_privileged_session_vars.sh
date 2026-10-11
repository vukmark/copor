#!/bin/bash

# Newer mysqldump (e.g. local MySQL 8.0.26+/9.x) emits binlog/replication
# bookkeeping statements in every dump by default:
#   SET @@SESSION.SQL_LOG_BIN = 0;
#   SET @@GLOBAL.GTID_PURGED = '...';
#   SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
# Setting these requires the SESSION_VARIABLES_ADMIN/SUPER privilege, which
# the app's DB user intentionally only has scoped to its own database (not
# globally), so importing an otherwise-fine dump fails with:
#   ERROR 1227 (42000): Access denied; you need (at least one of) the SUPER,
#   SYSTEM_VARIABLES_ADMIN or SESSION_VARIABLES_ADMIN privilege(s)
# None of these statements are needed for a plain logical restore into a
# standalone local dev database, so just drop them.
strip_privileged_session_vars () {
	local sql_file="$1"

	if [ -z "$sql_file" ] || [ ! -f "$sql_file" ]; then
		print_error "strip_privileged_session_vars: file not found: $sql_file"
		return 1
	fi

	local tmp_file
	tmp_file="$(mktemp "${sql_file}.patched.XXXXXX")"

	grep -v \
		-e '^SET @@SESSION\.SQL_LOG_BIN' \
		-e '^SET @@GLOBAL\.GTID_PURGED' \
		"$sql_file" > "$tmp_file" && mv "$tmp_file" "$sql_file"
}
