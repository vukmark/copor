import {VisibleUserPresenter} from '@copor/core/client/User/VisibleUsers/VisibleUserPresenter';
import {AppContext} from '@copor/core/client/Interface/AppContext';

describe('VisibleUserPresenter', () => {
	const context = {envVariables: {PROFILE_IMAGE_PATH: '/images/profile/'}} as unknown as AppContext;

	it('maps contacts to list items and echoes the page window', () => {
		const presenter = new VisibleUserPresenter(
			[
				{id: 'user-1', firstName: 'John', lastName: 'Doe', imageName: 'abc', imageExtension: 'png', isActive: true},
				{id: 'user-2', firstName: 'Jane', lastName: '', isActive: false}
			],
			context,
			{limit: '20', offset: '40'}
		);

		expect(presenter.present()).toEqual({
			items: [
				{id: 'user-1', fullName: 'John Doe', picture: '/images/profile/abc.png', isActive: true},
				{id: 'user-2', fullName: 'Jane', picture: '', isActive: false}
			],
			limit: '20',
			offset: '40'
		});
	});
});
