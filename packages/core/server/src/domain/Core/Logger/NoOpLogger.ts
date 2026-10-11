import {LogAction} from './LogAction';

// For actions that deliberately leave no audit entry (e.g. public endpoints
// that must not reveal whether an account exists).
export class NoOpLogger implements LogAction {
	public log(): Promise<void> {
		return Promise.resolve();
	}
}
