import {
	clearModulePreferences,
	findModulePreferenceDefinition,
	registerModulePreferences,
	resolveModulePreferences
} from '@copor/core/domain/User/UserPreferences/ModulePreferences/ModulePreferenceRegistry';
import {registerAllModuleDefinitions} from '../../../helpers/allModuleDefinitions';

const PUSH = 'sample.push';
const MAIL = 'sample.mail';
const GONE = 'gone.key';

describe('ModulePreferenceRegistry', () => {
	beforeEach(() => clearModulePreferences());
	afterAll(() => registerAllModuleDefinitions());

	it('registers a module\'s preferences', () => {
		registerModulePreferences('sample', [{key: 'sample.push', default: true}]);

		expect(findModulePreferenceDefinition('sample.push')).toEqual({key: 'sample.push', default: true});
	});

	it('rejects a key without the module\'s prefix', () => {
		expect(() => registerModulePreferences('sample', [{key: 'other.push', default: true}]))
			.toThrow('Preference "other.push" must start with "sample."');
	});

	it('rejects a key registered twice', () => {
		registerModulePreferences('sample', [{key: 'sample.push', default: true}]);

		expect(() => registerModulePreferences('sample', [{key: 'sample.push', default: false}]))
			.toThrow('Preference "sample.push" is registered more than once.');
	});

	it('resolves stored values over defaults and ignores unknown keys', () => {
		registerModulePreferences('sample', [{key: 'sample.push', default: true}, {key: 'sample.mail', default: false}]);

		expect(resolveModulePreferences({[PUSH]: false, [GONE]: true})).toEqual({[PUSH]: false, [MAIL]: false});
	});
});
