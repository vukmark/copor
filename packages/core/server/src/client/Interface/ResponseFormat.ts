import {ResponseBody} from './ResponseBody';

export interface ResponseFormat<Body> {
	status: number,
	resBody: ResponseBody<Body>
}