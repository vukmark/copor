import {
	clearModuleEventSubscribers,
	emitModuleEvent,
	subscribeToModuleEvents
} from '@copor/core/client/Core/Module/ModuleEvents';

describe('ModuleEvents', () => {
	afterEach(() => clearModuleEventSubscribers());

	it('does nothing when no module subscribed', async () => {
		await expect(emitModuleEvent('tagDeleted', {tagId: 'tag-1'})).resolves.toBeUndefined();
	});

	it('runs every subscriber in registration order with the payload, waiting for each', async () => {
		const calls: string[] = [];

		subscribeToModuleEvents({
			tagDeleted: async ({tagId}) => {
				await new Promise((resolve) => setTimeout(resolve, 5));
				calls.push(`first ${tagId}`);
			}
		});
		subscribeToModuleEvents({
			tagDeleted: async ({tagId}) => {
				calls.push(`second ${tagId}`);
			}
		});

		await emitModuleEvent('tagDeleted', {tagId: 'tag-1'});

		expect(calls).toEqual(['first tag-1', 'second tag-1']);
	});

	it('rejects when a subscriber fails', async () => {
		subscribeToModuleEvents({
			tagDeleted: async () => {
				throw new Error('cleanup failed');
			}
		});

		await expect(emitModuleEvent('tagDeleted', {tagId: 'tag-1'})).rejects.toThrow('cleanup failed');
	});
});
