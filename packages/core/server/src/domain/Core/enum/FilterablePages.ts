// Core's filter-list pages. A module adds its own through `filterLists` on its
// CoporModule descriptor (client), so a page key is a plain string.
export enum FilterablePages {
	COUNTRY = 'COUNTRY',
	TAG = 'TAG',
	ROLE = 'ROLE',
	REGION = 'REGION',
	USER = 'USER',
	CONTACT_LIST = 'CONTACT_LIST',
	STATE = 'STATE',
}
