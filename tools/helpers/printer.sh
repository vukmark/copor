#!/bin/bash

RED_COLOR='\033[0;31m'
NO_COLOR='\033[0m' # No Color
BLUE_COLOR='\033[0;94m'
print_error () {
  echo -e "${RED_COLOR}$1${NO_COLOR}"
}

print_info () {
  echo -e "${BLUE_COLOR}$1${NO_COLOR}"
}

print_error_how_to_set_remote_config () {
    print_error "Usage: copor build remote_server <PATH_TO_REMOTE_CONFIG> <DATABASE_PATH> <PASSWORD_FOR_ALL_USERS> <APK_VERSION>"
    echo ""
    print_error "Copy and alter accordingly $COPOR_PATH/configs/remote_hosts/production.dist.cfg and pass to this command"
}