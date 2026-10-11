import {envFilePath} from '@copor/core/client/Core/Helpers/EnvFile';
import 'reflect-metadata';
import App from '@copor/core/client/Core/App';
import {MainRouter} from '@copor/core/client/Core/MainRouter';
import express from 'express';
import {WinstonErrorLogger} from '@copor/core/client/Core/ErrorLogger/WinstonErrorLogger';
import {ErrorHandlerInstance} from '@copor/core/client/Core/ErrorMiddleware/ErrorHandlerInstance';
import {JwtAuthenticationMiddleware} from '@copor/core/client/Core/Middleware/JwtAuthenticationMiddleware';
import dotenv from 'dotenv';
import {ContainerInstance} from '@copor/core/client/Core/ContainerInstance';
import {CheckVersionMiddleware} from '@copor/core/client/Core/Middleware/CheckVersionMiddleware';
import {requiredEnvVariables} from '@copor/core/client/requiredEnvVariables';
import {resolve} from 'path';
import dotenvExpand from 'dotenv-expand';
import {registerModules} from '@copor/core/client/Core/Module/registerModules';
import {allModules} from './modules';
import {GlobalResponseImpl} from '@copor/core/client/Core/GlobalResponse/GlobalResponseImpl';
import {SetupGlobalConfigurationFiles} from '@copor/core/client/SystemSettings/SetupGlobalConfigurationFiles';
import i18next, {i18nReady} from '@copor/core/client/i18n';
import {mergeModuleLocales, readModuleLocales} from '@copor/core/client/Core/Module/ModuleLocales';

const app = new App(express());

const logger = new WinstonErrorLogger();
const errorHandler = new ErrorHandlerInstance(logger);
const jwtAuthenticationMiddleware = new JwtAuthenticationMiddleware();
const versionMiddleware = new CheckVersionMiddleware();
const env = dotenv.config({path: envFilePath()});
const globalResponse = new GlobalResponseImpl();
const setupConfig = new SetupGlobalConfigurationFiles();

dotenvExpand.expand(env);

if (!env.parsed)
	throw new Error('No config provided!');

app.setupEnvVariables(env);
app.validateEnvVariables(requiredEnvVariables);
registerModules(allModules);

const mainRouter = new MainRouter(new ContainerInstance(app));

app.setupConfigFiles(setupConfig);
app.setupAuthenticationMiddleware(jwtAuthenticationMiddleware);
app.setVersionMiddleware(versionMiddleware);
app.setupRequestBodyParser(express.json());
app.setupBaseRouter(mainRouter);
app.setupErrorHandler(errorHandler);
app.setGlobalResponseMiddleware(globalResponse);

const hostName = app.envVariables!.HOST_NAME ? app.envVariables!.HOST_NAME : 'localhost';
const port = app.envVariables!.PORT ? Number(app.envVariables!.PORT) : 3001;
const webSocketPort = app.envVariables!.WEB_SOCKET_PORT ? Number(app.envVariables!.WEB_SOCKET_PORT) : 3002;

// Listen only once every module's translations are merged into core's.
const moduleLocales = readModuleLocales(allModules);

void i18nReady.then(() => {
	mergeModuleLocales(i18next, moduleLocales);
	app.start(port, hostName, webSocketPort);
});

//DON'T EXPORT APP, USE APP CONTEXT INSTEAD
