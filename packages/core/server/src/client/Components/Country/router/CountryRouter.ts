import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {CreateCountryController} from '../CreateCountry/CreateCountryController';
import {GetCountryController} from '../GetCountry/GetCountryController';
import {DeleteCountryController} from '../DeleteCountry/DeleteCountryController';
import {GetCountryListController} from '../GetCountryList/GetCountryListController';
import {UpdateCountryController} from '../UpdateCountry/UpdateCountryController';
import {GetCountryListSimpleListController} from '@copor/core/client/Components/Country/GetCountrySimpleList/GetCountryListSimpleListController';
import {GetCountryFormController} from '@copor/core/client/Components/Country/GetCountryForm/GetCountryFormController';
import {GetCountryTableController} from '@copor/core/client/Components/Country/GetContryTable/GetCountryTableController';

export class CountryRouter extends BaseRouter {
	protected initializeRoutes(): void {
		this.post('/table', GetCountryTableController);
		this.get('/form', GetCountryFormController);
		this.get('/:id', GetCountryController);
		this.post('/', CreateCountryController);
		this.delete('/:id', DeleteCountryController);
		this.post('/list', GetCountryListController);
		this.post('/simple-list', GetCountryListSimpleListController);
		this.patch('/', UpdateCountryController);
		this.get('/form/:id', GetCountryFormController);
	}
}
