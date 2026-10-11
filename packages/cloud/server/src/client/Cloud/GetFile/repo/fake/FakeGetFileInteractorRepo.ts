import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetFileDTO} from '@copor/cloud/domain/Cloud/interactor/dto/GetFileDTO';

export class FakeGetFileInteractorRepo implements GetItem<GetFileDTO> {
	load(id: string): Promise<GetFileDTO> {
		return new Promise((resolve) => {
			resolve(
				{
					file: Buffer.from('txe'),
					fileName: 'gojko'
				}
			);
		});
	}
}