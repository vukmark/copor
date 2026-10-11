import {validateModules} from '@copor/core/client/Core/Module/validateModules';
import {allModules} from '../../../src/modules';

describe('validateModules', () => {
	it('accepts modules whose dependencies are registered', () => {
		expect(() => validateModules([
			{name: 'checklist'},
			{name: 'checklist_item', dependsOn: ['checklist']}
		])).not.toThrow();
	});

	it('rejects a module registered twice', () => {
		expect(() => validateModules([{name: 'news'}, {name: 'news'}]))
			.toThrow('Module "news" is registered more than once.');
	});

	it('rejects a module whose dependency is missing', () => {
		expect(() => validateModules([{name: 'checklist_item', dependsOn: ['checklist', 'user_group']}]))
			.toThrow('Module "checklist_item" depends on missing module(s): checklist, user_group.');
	});

	it('accepts the core and enabled modules', () => {
		expect(() => validateModules(allModules)).not.toThrow();
	});
});
