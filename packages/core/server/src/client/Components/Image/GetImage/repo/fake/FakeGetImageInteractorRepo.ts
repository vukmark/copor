import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {
	GetImageDTO
} from '@copor/core/domain/Components/Image/interactor/dto/GetImageDTO';

export class FakeGetImageInteractorRepo implements GetItem<GetImageDTO> {
	load(id: string): Promise<GetImageDTO> {
		return new Promise((resolve) => {
			resolve(
				{
					id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
					name: 'image-preview',
					extension: 'png',
					fileSize: 450000,
					width: 1600,
					height: 900,
					path: '/images/previews/image-preview.png'
				}
			);
		});
	}
}
