import {Router} from 'express';

export interface RouterInstance {
	router: Router,
}

export type RouterConstructor<Container> = new (container: Container) => RouterInstance;
