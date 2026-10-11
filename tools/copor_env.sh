#!/bin/bash
# Environment for the `copor` command (tools/copor): source it from your shell's rc
# file, e.g. `source $HOME/Projects/copor/tools/copor_env.sh`.
export RED_COLOR='\033[0;31m'
export NO_COLOR='\033[0m' # No Color
export BLUE_COLOR='\033[0;94m'

if [ -z "${COPOR_PATH}" ]; then
  export COPOR_PATH="$HOME/Projects/copor"
fi

export COPOR_HELPERS_PATH="$COPOR_PATH/tools/helpers"
export COPOR_TEMPLATES_PATH="$COPOR_PATH/tools/generators/templates"
export COPOR_FRONTEND_PATH="$COPOR_PATH/frontend"
export COPOR_SERVER_PATH="$COPOR_PATH/apps/copor/server"
export COPOR_PACKAGES_PATH="$COPOR_PATH/packages"

if [ -z "$ANDROID_HOME" ]; then export ANDROID_HOME="$HOME/Android/Sdk"; fi
export ADB="$ANDROID_HOME/platform-tools/adb"
export EMULATOR_BIN="$ANDROID_HOME/emulator/emulator"

export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$PATH"
export PATH="$ANDROID_HOME/cmdline-tools/tools/bin:$PATH"
export PATH="$ANDROID_HOME/platform-tools:$PATH"
export PATH="$ANDROID_HOME/emulator:$PATH"

export PATH="$COPOR_PATH/tools/copor:$PATH"

source $COPOR_HELPERS_PATH/copor_autocomplete.sh
source $COPOR_HELPERS_PATH/printer.sh
source $COPOR_HELPERS_PATH/emulator_manager.sh
source $COPOR_HELPERS_PATH/adb_helper.sh
