#!/bin/bash

# Autocomplete function for my_script

_copor_autocomplete() {
   local cur="${COMP_WORDS[COMP_CWORD]}"

      local prev="${COMP_WORDS[COMP_CWORD-1]}"

      COMPREPLY=()


      # Define the base directory for your scripts

      local base_dir="$COPOR_PATH/tools/copor"  # Change this to your scripts directory

      if [[ $COMP_CWORD == 1 ]]; then

              # First argument: main commands (subdirectories)

              COMPREPLY=($(compgen -W "$(ls -d "$base_dir"/*/ | xargs -n 1 basename)" -- "$cur"))

          elif [[ $COMP_CWORD == 2 ]]; then

              # Second argument: subcommands based on the first argument (files in the selected subdirectory)

              local sub_dir="$base_dir/${COMP_WORDS[1]}"

              if [[ -d "$sub_dir" ]]; then

                  COMPREPLY=($(compgen -W "$(ls "$sub_dir" | sed 's/\.sh$//')" -- "$cur"))

              fi

          elif [[ $COMP_CWORD -ge 3 ]]; then

              # --- Specific logic for emulators script ---
              if [[ "${COMP_WORDS[2]}" == "emulators" ]]; then
                  if [[ $COMP_CWORD == 3 ]]; then
                      # 3rd argument: Primary actions or count
                      local actions="1 2 3 4 5 stop delete"
                      COMPREPLY=($(compgen -W "$actions" -- "$cur"))
                  else
                      # 4th argument and beyond: Configuration flags
                      local flags="--window --tab --quick --cold --no-gpu --gpu"
                      COMPREPLY=($(compgen -W "$flags" -- "$cur"))
                  fi
                  return 0
              fi
              # --------------------------------------------

              # Third argument: further subcommands based on the second argument (for generate command)

              local sub_sub_dir="$base_dir/${COMP_WORDS[1]}/${COMP_WORDS[2]}"

              if [[ -d "$sub_sub_dir" ]]; then

                  for script in "$sub_sub_dir"/*.sh; do

                      if [[ -f "$script" ]]; then

                          # Read the second line of the script for the description

                          local description

                          description=$(sed -n '2p' "$script" | sed 's/^# //; s/^-- //')

                          local command_name=$(basename "$script" .sh)

                          COMPREPLY+=("$command_name -- $description")

                      fi

                  done

              fi

          fi


          return 0
}


# Register the autocomplete function
complete -F _copor_autocomplete $COPOR_PATH/tools/copor/copor
complete -F _copor_autocomplete copor
