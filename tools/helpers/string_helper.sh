#!/bin/bash

source $COPOR_HELPERS_PATH/printer.sh
to_camel_case() {
    local input="$1"
    # Convert to lowercase, then capitalize the first letter of each word
    # and remove spaces and underscores
    echo "$input" | tr '[:upper:]' '[:lower:]' | \
    sed -E 's/[_ ]+([a-z])/\U\1/g; s/^[a-z]/\U&/; s/[_ ]//g'
}

# Function to convert a string to snake case

to_snake_case() {
    local input="$1"

    # Convert to lowercase and replace spaces and capital letters with underscores
    echo "$input" | tr '[:upper:]' '[:lower:]' | \
    sed -E 's/ +/_/g; s/([a-z])([A-Z])/\1_\2/g'
}

# Function to replace a string in a file
replace_string_in_file() {
    local file="$1"
    local search="$2"
    local replace="$3"

    # Check if the file exists
    if [[ ! -f "$file" ]]; then
        echo "Error: File '$file' not found."
        return 1
    fi

    # Use sed to replace the string
    sed -i "s|${search}|${replace}|g" "$file"
}

# Function to perform search and replace

replace_in_string() {
    local original_string="$1"
    local search_string="$2"
    local replacement_string="$3"

    # Perform the search and replace
    modified_string="${original_string//$search_string/$replacement_string}"
    echo "$modified_string"
}