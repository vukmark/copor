#!/bin/bash
# Shared by `copor build production_*`: builds the server app and ships it to
# $SSH_USER@$SSH_HOST:$API_SERVER_PATH:
#
#   apps/copor/server/dist/                self-contained build (`npm run build`):
#                                            compiled app + packages, module
#                                            locales, package.json/-lock with the
#                                            pinned runtime deps (npm ci there)
#   apps/copor/server/{assets,changelog}   runtime content
#   apps/copor/server/settings/*.json.dist settings templates
#   apps/copor/server/.env                 copied from $API_ENV_PATH on the host
#
# The server runs with apps/copor/server as its working directory (.env,
# settings/, changelog/, assets/, MediaFiles/ and the Firebase key resolve
# from there).

source $COPOR_PATH/tools/helpers/printer.sh

function build_server() {
	cd "$COPOR_SERVER_PATH" || { print_error "Server app not found at $COPOR_SERVER_PATH"; exit 1; }
	print_info "Building the server (clean dist: tsc --build does not prune outputs of removed files)..."
	rm -rf dist
	npm run build || { print_error "Server build failed. Exiting."; exit 1; }
}

function deploy_server() {
	local remote="$SSH_USER@$SSH_HOST"
	local app="apps/copor/server"

	print_info "Copy server to remote $API_SERVER_PATH"
	cd "$COPOR_PATH" || exit 1
	ssh "$remote" "mkdir -p '$API_SERVER_PATH/$app/settings'" || { print_error "Failed to create remote directories"; exit 1; }
	# node_modules is excluded, so --delete keeps the installed dependencies
	rsync -aqP --delete --exclude node_modules "$app/dist/" "$remote:$API_SERVER_PATH/$app/dist/" || { print_error "Failed to copy the server build to remote"; exit 1; }
	# No --delete: assets/img also holds images uploaded on the server
	rsync -aqP "$app/assets/" "$remote:$API_SERVER_PATH/$app/assets/" || { print_error "Failed to copy assets to remote"; exit 1; }
	rsync -aqP --delete "$app/changelog/" "$remote:$API_SERVER_PATH/$app/changelog/" || { print_error "Failed to copy the changelog to remote"; exit 1; }
	rsync -aqP "$app"/settings/*.json.dist "$remote:$API_SERVER_PATH/$app/settings/" || { print_error "Failed to copy settings templates to remote"; exit 1; }
	rsync -aqP "$app/firebase-adminsdk-key.json" "$remote:$API_SERVER_PATH/$app/" || { print_error "Failed to copy the Firebase key to remote"; exit 1; }

	ssh "$remote" << EOF
cp "$API_ENV_PATH" "$API_SERVER_PATH/$app/.env"
source ~/.bashrc
source ~/.profile
source ~/.nvm/nvm.sh

cd "$API_SERVER_PATH/$app/dist"
npm ci --omit=dev

cd "$API_SERVER_PATH/$app"
pm2 start dist/apps/copor/server/src/index.js --name "$SSH_HOST" --cwd "$API_SERVER_PATH/$app"
pm2 reload dist/apps/copor/server/src/index.js --name "$SSH_HOST"
EOF
}
