#!/bin/bash

source $COPOR_PATH/tools/helpers/printer.sh
exit_if_invalid_version() {
  local version_number="$1"
  if [[ ! $version_number =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    print_error "Invalid version format. Please use the format: 0.0.0"
    exit 1
  fi
}