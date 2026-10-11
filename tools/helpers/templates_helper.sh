#!/bin/bash

source $COPOR_HELPERS_PATH/printer.sh
source $COPOR_HELPERS_PATH/string_helper.sh

# The permission enum generated validators use: core's CorePermission, or the
# module's own <Feature>Permission (the one `export enum …Permission` in its
# domain). Sets PERMISSION_ENUM and PERMISSION_IMPORT.
function resolve_permission_enum() {
    local PACKAGE="$1"
    if [ "$PACKAGE" = "core" ]; then
        PERMISSION_ENUM="CorePermission"
        PERMISSION_IMPORT="@copor/core/domain/Core/Permission/CorePermission"
        return
    fi
    local domain="$COPOR_PATH/packages/$PACKAGE/server/src/domain"
    local files
    files=$(grep -rlE '^export enum [A-Za-z]+Permission\b' "$domain" --include='*.ts' 2>/dev/null | grep -v __tests__)
    if [ "$(echo "$files" | grep -c .)" -ne 1 ]; then
        print_error "Expected one '<Feature>Permission' enum in $domain, found: ${files:-none}"
        exit 1
    fi
    PERMISSION_ENUM=$(basename "$files" .ts)
    local rel="${files#$domain/}"
    PERMISSION_IMPORT="@copor/$PACKAGE/domain/${rel%.ts}"
}

# What a generated server entity still needs by hand.
function print_server_next_steps() {
    local NAME="$1"
    local PACKAGE="$2"
    local CAMEL_CASE_NAME=$(to_camel_case $NAME)
    local LOWER="${CAMEL_CASE_NAME,}"
    resolve_permission_enum "$PACKAGE"
    print_info "Next steps for $CAMEL_CASE_NAME (package $PACKAGE):"
    print_info "  1. Table '$LOWER' (id, name + timestamps): migration and table type — db-migration skill"
    print_info "  2. Permissions in $PERMISSION_ENUM ($PERMISSION_IMPORT) and its PermissionDefinitions:"
    print_info "     canCreate$CAMEL_CASE_NAME, canGet$CAMEL_CASE_NAME, canGet${CAMEL_CASE_NAME}List, canUpdate$CAMEL_CASE_NAME, canDelete$CAMEL_CASE_NAME"
    print_info "  3. Register ${CAMEL_CASE_NAME}Router: core → Core/MainRouter.ts; module → the routes of its <Feature>Module.ts"
    print_info "  4. Translations in the package's locales: log_type (create$CAMEL_CASE_NAME, get$CAMEL_CASE_NAME, …), error (Invalid${CAMEL_CASE_NAME}Exception)"
    print_info "  5. Replace the fake data and the id + name fields with the entity's own"
}

# Server templates (client_*, domain_*). DEST_DIR is a package's src/client or
# src/domain; PACKAGE is the package folder under packages/ (core, todo, …),
# used for the generated files' own imports (@copor/<package>/…).
function create_from_template_and_replace_placeholders() {
    local SOURCE_DIR="$1"
    local DEST_DIR="$2"
    local NAME="$3"
    local PACKAGE="$4"
    resolve_permission_enum "$PACKAGE"
    SNAKE_CASE_NAME=$(to_snake_case $NAME)
    CAMEL_CASE_NAME=$(to_camel_case $NAME)
    # Use find to locate all files in the source directory
    find "$SOURCE_DIR" -type f | while read -r file; do
        # Get the relative path of the file
        relative_path="${file#$SOURCE_DIR/}"

        # Create the destination path
        dest_path=$relative_path
        dest_path=$(replace_in_string "$dest_path" "CAMEL_CASE_NAME" "$CAMEL_CASE_NAME")
        dest_path=$(replace_in_string "$dest_path" "SNAKE_CASE_NAME" "$SNAKE_CASE_NAME")
        dest_path="$DEST_DIR/${dest_path%.tmpl}"

         # Only proceed if destination file doesn't exist
        if [ ! -f "$dest_path" ]; then
            # Create the destination directory if it doesn't exist
            mkdir -p "$(dirname "$dest_path")"

            # Copy the file to the destination
            cp "$file" "$dest_path"
                                                                            # , after variable convert first char to lowercase
            replace_string_in_file $dest_path "LOWER_FIRST_CAMEL_CASE_NAME" "${CAMEL_CASE_NAME,}"
            replace_string_in_file $dest_path "SNAKE_CASE_NAME" $SNAKE_CASE_NAME
            replace_string_in_file $dest_path "CAMEL_CASE_NAME" $CAMEL_CASE_NAME
            replace_string_in_file $dest_path "PACKAGE_NAME" $PACKAGE
            replace_string_in_file $dest_path "PERMISSION_IMPORT" "$PERMISSION_IMPORT"
            replace_string_in_file $dest_path "PERMISSION_ENUM" "$PERMISSION_ENUM"

            print_info "created $dest_path"
        else
            # Files shared by several operations (DTOs, helpers) come from each
            # operation's template; the first one wins.
            print_info "kept existing $dest_path"
        fi
    done
}

# Flutter templates (frontend_bloc*). DEST_DIR is the module's folder (a module
# package's lib/src, or core's lib/src/modules/<feature>); IMPORT_PREFIX is the
# matching package path (copor_todo/src, copor_core/src/modules/forms).
function create_frontend_from_template_and_replace_placeholders() {
    local SOURCE_DIR="$1"
    local DEST_DIR="$2"
    local TASK_NAME="$3"
    local MODULE_NAME="$4"
    local IMPORT_PREFIX="$5"
    MODULE_NAME_SNAKE_CASE=$(to_snake_case $MODULE_NAME)
    MODULE_NAME_CAMEL_CASE=$(to_camel_case $MODULE_NAME)
    SNAKE_CASE_NAME=$(to_snake_case $TASK_NAME)
    CAMEL_CASE_NAME=$(to_camel_case $TASK_NAME)
    # Use find to locate all files in the source directory
    find "$SOURCE_DIR" -type f | while read -r file; do
        # Get the relative path of the file
        relative_path="${file#$SOURCE_DIR/}"

        # Create the destination path
        dest_path=$relative_path
        dest_path=$(replace_in_string "$dest_path" "CAMEL_CASE_NAME" "$CAMEL_CASE_NAME")
        dest_path=$(replace_in_string "$dest_path" "SNAKE_CASE_NAME" "$SNAKE_CASE_NAME")
        dest_path=$(replace_in_string "$dest_path" "MODULE_NAME_SNAKE_CASE" "$MODULE_NAME_SNAKE_CASE")
        dest_path="$DEST_DIR/${dest_path%.tmpl}"

         # Only proceed if destination file doesn't exist
        if [ ! -f "$dest_path" ]; then
            # Create the destination directory if it doesn't exist
            mkdir -p "$(dirname "$dest_path")"

            # Copy the file to the destination
            cp "$file" "$dest_path"
                                                                            # , after variable convert first char to lowercase
            replace_string_in_file $dest_path "LOWER_FIRST_CAMEL_CASE_NAME" "${CAMEL_CASE_NAME,}"
            replace_string_in_file $dest_path "SNAKE_CASE_NAME" $SNAKE_CASE_NAME
            replace_string_in_file $dest_path "MODULE_NAME_SNAKE_CASE" $MODULE_NAME_SNAKE_CASE
            replace_string_in_file $dest_path "MODULE_NAME_CAMEL_CASE" $MODULE_NAME_CAMEL_CASE
            replace_string_in_file $dest_path "CAMEL_CASE_NAME" $CAMEL_CASE_NAME
            replace_string_in_file $dest_path "MODULE_IMPORT_PREFIX" $IMPORT_PREFIX
            print_info "copied $file to $dest_path"
        else
            print_error "skipped $file (already exists at $dest_path)"
        fi

        replace_string_in_file $dest_path "//GENERATE_MODEL_NAMESPACE" "//GENERATE_MODEL_NAMESPACE\n\tstatic const String ${CAMEL_CASE_NAME} = '${SNAKE_CASE_NAME}';"
        replace_string_in_file $dest_path "//GENERATE_IMPORT_REPO_IMPL" "//GENERATE_IMPORT_REPO_IMPL\nimport 'package:${IMPORT_PREFIX}/data/repository_impl/${SNAKE_CASE_NAME}/${SNAKE_CASE_NAME}_repository_impl.dart';"
        replace_string_in_file $dest_path "//GENERATE_IMPORT_REPOSITORY" "//GENERATE_IMPORT_REPOSITORY\nimport 'package:${IMPORT_PREFIX}/data/repository_impl/${SNAKE_CASE_NAME}/${SNAKE_CASE_NAME}_repository.dart';"
        replace_string_in_file $dest_path "//GENERATE_IMPORT_LOCAL_SOURCE" "//GENERATE_IMPORT_LOCAL_SOURCE\nimport 'package:${IMPORT_PREFIX}/data/data_source/${SNAKE_CASE_NAME}/${SNAKE_CASE_NAME}_local_source.dart';"
        replace_string_in_file $dest_path "//GENERATE_IMPORT_REMOTE_SOURCE" "//GENERATE_IMPORT_REMOTE_SOURCE\nimport 'package:${IMPORT_PREFIX}/data/data_source/${SNAKE_CASE_NAME}/${SNAKE_CASE_NAME}_remote_source.dart';"
        replace_string_in_file $dest_path "//GENERATE_IMPORT_BLOC" "//GENERATE_IMPORT_BLOC\nimport 'package:${IMPORT_PREFIX}/bloc/${SNAKE_CASE_NAME}/${SNAKE_CASE_NAME}_bloc.dart';"

        GENERATE_REGISTER_LOCAL_SOURCE="getIt.registerLazySingleton<${CAMEL_CASE_NAME}LocalDataSource>(() =>
      ${CAMEL_CASE_NAME}LocalDataSourceImpl(
          sharedPreferences: getIt<SharedPreferences>(),
          keyGenerator: getIt<KeyGenerator>()));"
        perl -i -pe "s|\Q//GENERATE_REGISTER_LOCAL_SOURCE\E|$&\\n\t""${GENERATE_REGISTER_LOCAL_SOURCE}"'|g' "$dest_path"

        GENERATE_REGISTER_REMOTE_SOURCE="getIt.registerLazySingleton<${CAMEL_CASE_NAME}RemoteDataSource>(
        () => ${CAMEL_CASE_NAME}RemoteDataSourceImpl(getIt<Dio>()));"
        perl -i -pe "s|\Q//GENERATE_REGISTER_REMOTE_SOURCE\E|$&\\n\t""${GENERATE_REGISTER_REMOTE_SOURCE}"'|g' "$dest_path"

        GENERATE_REGISTER_REPOSITORIES="getIt.registerLazySingleton<${CAMEL_CASE_NAME}Repository>(() =>
      ${CAMEL_CASE_NAME}RepositoryImpl(
          localDataSource: getIt<${CAMEL_CASE_NAME}LocalDataSource>(),
          errorHandler: getIt<ErrorHandler>(),
          remoteDataSource: getIt<${CAMEL_CASE_NAME}RemoteDataSource>(),
          connectivityService: getIt<ConnectivityService>()));"
        perl -i -pe "s|\Q//GENERATE_REGISTER_REPOSITORIES\E|$&\\n\t""${GENERATE_REGISTER_REPOSITORIES}"'|g' "$dest_path"

      GENERATE_REGISTER_BLOC="getIt.registerFactory<${CAMEL_CASE_NAME}Bloc>(() => ${CAMEL_CASE_NAME}Bloc(
      ${CAMEL_CASE_NAME,}Repository: getIt<${CAMEL_CASE_NAME}Repository>()));"
        perl -i -pe "s|\Q//GENERATE_REGISTER_BLOC\E|$&\\n\t""${GENERATE_REGISTER_BLOC}"'|g' "$dest_path"

    done
}
