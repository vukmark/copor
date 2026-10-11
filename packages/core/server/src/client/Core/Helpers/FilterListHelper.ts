import {FilterName} from '@copor/core/domain/Core/global/Filter/dto/FilterName';
import i18next from 'i18next';

export class FilterListHelper {
	public static enumToFilterNameArray<T extends Record<string, string>>(
		enumObj: T
	): FilterName[] {
		i18next.setDefaultNamespace('filter');
		return Object.values(enumObj).map((value) => ({
			value: String(value),
			translation: i18next.t(String(value))
		}));
	}
	public static getFilterName(name: string): FilterName {
		i18next.setDefaultNamespace('filter');
		return {
			value: name,
			translation: i18next.t(name)
		};
	}
}