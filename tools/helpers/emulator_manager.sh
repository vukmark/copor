#!/bin/bash

# --- Centralized Emulator Hardware Settings ---
EMU_RAM_SIZE="3072"
EMU_CPU_CORES="2"
EMU_HEAP_SIZE="512"

# --- SMART GPU DETECTION ---
if [ -e /dev/dri/renderD128 ]; then
    EMU_GPU_MODE="host"
else
    EMU_GPU_MODE="swiftshader_indirect"
fi

# Ensure an emulator exists
ensure_emulator_exists() {
    local name=$1
    if ! "$EMULATOR_BIN" -list-avds | grep -q "^$name$"; then
        print_info "DEVICE: Creating $name..."
        echo "no" | flutter emulators --create --name "$name"
    fi
}

apply_emulator_specs() {
    local name=$1
    local gpu_mode=$2
    local config_path="$HOME/.android/avd/${name}.avd/config.ini"

    if [ -f "$config_path" ]; then
        print_info "DEVICE: Adjusting specs for $name (GPU: $gpu_mode)..."

        # --- GPU Logic Start ---
        # 1. Set the Mode (host or swiftshader_indirect/off)
        if grep -q "hw.gpu.mode" "$config_path"; then
            sed -i "/hw.gpu.mode/c\hw.gpu.mode=$gpu_mode" "$config_path"
        else
            echo "hw.gpu.mode=$gpu_mode" >> "$config_path"
        fi

        # 2. Set the Enabled flag (yes for host, no for software)
        local gpu_enabled="yes"
        [ "$gpu_mode" != "host" ] && gpu_enabled="no"

        if grep -q "hw.gpu.enabled" "$config_path"; then
            sed -i "/hw.gpu.enabled/c\hw.gpu.enabled=$gpu_enabled" "$config_path"
        else
            echo "hw.gpu.enabled=$gpu_enabled" >> "$config_path"
        fi
        # --- GPU Logic End ---

        # 1. Enable Keyboard
        sed -i "/hw.keyboard/c\hw.keyboard=yes" "$config_path" 2>/dev/null || echo "hw.keyboard=yes" >> "$config_path"

        # 2. Specs
        sed -i "/hw.ramSize/c\hw.ramSize=$EMU_RAM_SIZE" "$config_path"
        sed -i "/hw.cpu.ncore/c\hw.cpu.ncore=$CPU_CORES" "$config_path"
        sed -i "/vm.heapSize/c\vm.heapSize=$EMU_HEAP_SIZE" "$config_path"

        # Audio & Boot optimizations
        echo "hw.audioInput=no" >> "$config_path"
        echo "hw.audioOutput=no" >> "$config_path"
        echo "boot.fastbootAutosleep=yes" >> "$config_path"
    fi
}

start_emulator_bg() {
    local name=$1
    local mode=$2

    local flags="-netdelay none -netspeed full -no-audio -no-snapshot-save"
    [ "$mode" == "cold" ] && flags="$flags -no-snapshot-load"

    "$EMULATOR_BIN" -avd "$name" $flags > /dev/null 2>&1 &
}
