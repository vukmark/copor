// Events core announces so modules can react without core importing them,
// e.g. a module cleaning up its own rows when a core record is deleted.
// Add an event here when core needs to tell modules about something; a module
// subscribes through `eventSubscribers` on its CoporModule descriptor.
export interface ModuleEventMap {
	// A tag was deleted; modules remove their references to it.
	tagDeleted: {tagId: string},
}

export type ModuleEventName = keyof ModuleEventMap;
export type ModuleEventHandler<Name extends ModuleEventName> = (payload: ModuleEventMap[Name]) => Promise<void>;
export type ModuleEventSubscribers = {[Name in ModuleEventName]?: ModuleEventHandler<Name>};

const handlers: {[Name in ModuleEventName]?: ModuleEventHandler<Name>[]} = {};

export function subscribeToModuleEvents(subscribers: ModuleEventSubscribers): void {
	for (const name of Object.keys(subscribers) as ModuleEventName[]) {
		const handler = subscribers[name]!;

		(handlers[name] ??= []).push(handler);
	}
}

// Runs every subscriber in registration order and waits for all of them, so
// the caller only finishes once modules have reacted. A failing handler
// rejects the emit.
export async function emitModuleEvent<Name extends ModuleEventName>(name: Name, payload: ModuleEventMap[Name]): Promise<void> {
	for (const handler of handlers[name] ?? []) {
		await handler(payload);
	}
}

// Tests only: forget every subscription.
export function clearModuleEventSubscribers(): void {
	for (const name of Object.keys(handlers) as ModuleEventName[]) {
		delete handlers[name];
	}
}
