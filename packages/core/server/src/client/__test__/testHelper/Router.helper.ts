import {Request, RequestHandler, Response} from 'express';
import {Method} from '../../Interface/Method';
import {RouterConstructor, RouterInstance} from '../../Interface/RouterInstance';
import {Controller} from '../../Interface/Controller';
import {containerMock} from './Mocks';

import {Container} from '../../Interface/Container';

export function testRouter(routerInstance: RouterConstructor<Container>, targetRouteList: IRoute[]) {
	let router: RouterInstance;
	let mockedController: jest.Mocked<Controller>;
	let mockedResponse: Response;
	let routerHandlerStack: Handler[];
	let mockedContainer: jest.Mocked<Container>;

	beforeAll(() => {
		mockedResponse = {
			status: jest.fn(),
			send: jest.fn()
		} as unknown as Response;
		mockedController = {
			getResponse: jest.fn()
		};
		mockedContainer = containerMock;
		mockedContainer.getController.mockReturnValue(mockedController);
		mockedContainer.getActorId.mockReturnValue('555-333');
	});
	describe('have properly defined routes', () => {
		beforeAll(() => {
			router = new routerInstance(mockedContainer);
			routerHandlerStack = getRouterHandlerStack(router);
		});
		it.each(targetRouteList)('`$method` exists for $path', (targetRoute) => {
			expect(findMatchingRouteInStack(routerHandlerStack, targetRoute)).not.toBe(undefined);
			routerHandlerStack = removeMatchingRouteInStack(routerHandlerStack, targetRoute);
		});
		it('should not have excess routes', () => {
			expect(routerHandlerStack).toStrictEqual([]);
		});
	});
	describe('should call controller for every target route and respond with controller response status and body', () => {
		beforeAll(() => {
			router = new routerInstance(mockedContainer);
			routerHandlerStack = getRouterHandlerStack(router);
		});

		const targetRouteListWithoutNextRouter = targetRouteList.filter((route: IRoute) => route.method !== 'nextRouter');

		it.each(targetRouteListWithoutNextRouter)('controller responded for $path', (targetRoute) => {
			handleMatchingRouteInStack(routerHandlerStack, targetRoute, mockedResponse);
			expect(mockedContainer.getController).toHaveBeenCalled();
			expect(mockedController.getResponse).toHaveBeenCalled();
		});
	});
}

export interface IRoute {
	path: string
	method: MethodString
}

export interface Handler {
	name: string,
	handle: RequestHandler,
	route: HandlerRoute,
	regexp: RegExp
}

interface HandlerRoute {
	path: string,
	stack: [],
	methods: Method
}
type MethodString = 'get' | 'post' | 'delete' | 'patch' | 'nextRouter';

export function handleMatchingRouteInStack(routerLayerStack: Handler[], targetRoute: IRoute, response: Response) {
	const routeHandler = findMatchingRouteInStack(routerLayerStack, targetRoute);

	if (!routeHandler) {
		throw new Error(`${targetRoute.method.toUpperCase()} Handler for ${targetRoute.path} not found.`);
	}
	executeHandler(routeHandler, buildRequest(targetRoute.path, targetRoute.method), response);
}

export function removeMatchingRouteInStack(routerLayerStack: Handler[], targetRoute: IRoute) {
	const index = routerLayerStack.findIndex((routerLayer) => findMatchingRoute(routerLayer, targetRoute));

	if (index !== -1) {
		routerLayerStack.splice(index, 1);
	}

	return routerLayerStack;
}

export function getRouterHandlerStack(routerInstance: RouterInstance) {
	return routerInstance.router.stack as unknown as Handler[];
}

function executeHandler(routeHandler: Handler, request: Request, response: Response) {
	routeHandler.handle(request, response, () => {
		return;
	});
}

export function findMatchingRouteInStack(routerLayerStack: Handler[], targetRoute: IRoute) {
	return routerLayerStack.find((routerLayer) => findMatchingRoute(routerLayer, targetRoute));
}

function findMatchingRoute(routerLayer: Handler, targetRoute: IRoute): boolean {
	if (targetRoute.method === 'nextRouter' && !routerLayer.route && routerLayer.regexp.test(targetRoute.path)) {
		const {name} = routerLayer;

		if (name === 'router') {
			return true;
		}
	}
	if (!routerLayer.route) {
		return false;
	}
	const {path: executedPath, methods: executedMethods} = routerLayer.route;
	const isPathMatch = isMatchingRoutePath(executedPath, targetRoute.path);
	const isMethodMatch = isMatchingRouteMethod(executedMethods, targetRoute.method);
	const result = isPathMatch && isMethodMatch;

	return result;
}

function isMatchingRoutePath(executedPath: string, targetPath: string) {
	return executedPath === targetPath;
}

function isMatchingRouteMethod(executedMethods: Method, targetMethod: string) {
	return targetMethod in executedMethods;
}

function buildRequest(path: string, method: string): Request {
	return {path,
		method} as Request;
}


