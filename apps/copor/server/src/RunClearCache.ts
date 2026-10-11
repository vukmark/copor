import {KyselyClearUserPermissionCacheRepo} from '@copor/core/client/ClearCache/repo/KyselyClearCacheController';
import {ClearCacheController} from '@copor/core/client/ClearCache/ClearCacheController';

async function main() {
	const repo = new KyselyClearUserPermissionCacheRepo();
	const controller = new ClearCacheController(repo);

	await controller.execute();

	console.log(`
    
 ██████╗ █████╗  ██████╗██╗  ██╗███████╗                
██╔════╝██╔══██╗██╔════╝██║  ██║██╔════╝                
██║     ███████║██║     ███████║█████╗                  
██║     ██╔══██║██║     ██╔══██║██╔══╝                  
╚██████╗██║  ██║╚██████╗██║  ██║███████╗                
 ╚═════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝                
██╗███████╗                                             
██║██╔════╝                                             
██║███████╗                                             
██║╚════██║                                             
██║███████║                                             
╚═╝╚══════╝                                             
 ██████╗██╗     ███████╗ █████╗ ██████╗ ███████╗██████╗ 
██╔════╝██║     ██╔════╝██╔══██╗██╔══██╗██╔════╝██╔══██╗
██║     ██║     █████╗  ███████║██████╔╝█████╗  ██║  ██║
██║     ██║     ██╔══╝  ██╔══██║██╔══██╗██╔══╝  ██║  ██║
╚██████╗███████╗███████╗██║  ██║██║  ██║███████╗██████╔╝
 ╚═════╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═════╝ 
`);
	process.exit(0);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});