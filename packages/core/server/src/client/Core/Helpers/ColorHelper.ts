import {Color} from '@copor/core/domain/Core/enum/Color';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import i18next from 'i18next';

export class ColorHelper {
	public static toNameAndIdDTO(): NameAndIdDTO<Color>[] {
		return Object.values(Color)
			.filter((value): value is Color => typeof value === 'string')
			.map((color) => ({
				id: color,
				name: i18next.t('translationStringList.' + color)
			}));
	}
}