import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetImageDTO} from '@copor/core/domain/Components/Image/interactor/dto/GetImageDTO';
import {GetImageViewModel} from './GetImageViewModel';

export class GetImagePresenter extends PresenterInstance<GetImageDTO, GetImageViewModel> {
	present(): GetImageViewModel {
		//console.log(this.appContext);
		return {
			id: this.input.id,
			name: this.input.name,
			extension: this.input.extension,
			fileSize: this.input.fileSize,
			width: this.input.width,
			height: this.input.height,
			path: this.appContext.envVariables!.IMAGE_PATH + `${this.input.name}.${this.input.extension}`
		};
	}
}
