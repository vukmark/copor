#!/bin/bash

# Find the newest emulator ID that isn't in the skip list
find_new_emulator_id() {
    local skip_ids=("$@")
    local target=""

    while [ -z "$target" ]; do
        local current_ids=$("$ADB" devices | grep "emulator-" | awk '{print $1}')
        for id in $current_ids; do
            # Check if ID is in the skip list
            if [[ ! " ${skip_ids[@]} " =~ " ${id} " ]]; then
                local state=$("$ADB" devices | grep "$id" | awk '{print $2}')
                [ "$state" == "device" ] && target=$id && break
            fi
        done
        [ -z "$target" ] && sleep 2
    done

    echo "$target"
}

# Wait until the system is fully decrypted and ready
wait_for_boot_complete() {
    local id=$1
    print_info "DEVICE: Waiting for $id System UI..."

    while [ "$($ADB -s "$id" shell getprop sys.user.0.ce_available 2>/dev/null | tr -d '\r')" != "true" ]; do
        printf "."
        sleep 3
    done
    echo ""
}

# Install and start app via monkey
deploy_app_to_device() {
    local id=$1
    local apk=$2
    local pkg=$3

    print_info "DEVICE: Installing to $id..."
    $ADB -s "$id" install -r -t -g "$apk" > /dev/null

    print_info "DEVICE: Starting $pkg..."
    $ADB -s "$id" shell monkey -p "$pkg" -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
}
