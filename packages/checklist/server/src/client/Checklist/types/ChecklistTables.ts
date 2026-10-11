import {ChecklistTable} from '@copor/checklist/client/Checklist/types/ChecklistTable';
import {ChecklistItemTable} from '@copor/checklist/client/Checklist/types/ChecklistItemTable';

// The Checklist module's tables, added to core's DB interface.
declare module '@copor/core/client/types/db' {
	interface DB {
		checklist: ChecklistTable;
		checklistItem: ChecklistItemTable;
	}
}
