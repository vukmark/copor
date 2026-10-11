import {i18n} from 'i18next';

declare module 'express-serve-static-core' {
	interface Request {
		t: i18n['t'];
	}
}
