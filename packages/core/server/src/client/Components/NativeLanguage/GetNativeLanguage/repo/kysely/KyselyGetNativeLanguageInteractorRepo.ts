import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetNativeLanguageDTO} from '@copor/core/domain/Components/NativeLanguage/interactor/dto/GetNativeLanguageDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyGetNativeLanguageInteractorRepo implements GetItem<GetNativeLanguageDTO> {
	async load(id: string): Promise<GetNativeLanguageDTO> {
		const result = await db
			.selectFrom('nativeLanguage')
			.select([
				'id',
				'name',
				'code',
				'nativeName',
				'publishStatus'
			] as const)
			.where('id', '=', id)
			.executeTakeFirst();

		if (!result) {
			throw new Error(`NativeLanguage with id ${id} not found`);
		}

		return {
			... result
		};
	}
}
