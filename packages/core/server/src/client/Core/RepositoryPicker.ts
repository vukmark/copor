import {AppContext} from '../Interface/AppContext';
import {DotenvParseOutput} from 'dotenv';
import {DBEnv} from '../enum/DBEnv';
import {NodeEnv} from '../enum/NodeEnv';

export abstract class RepositoryPicker<Repository> {
	protected envVariables: DotenvParseOutput;
	protected fakeRepository: Repository;
	protected realRepositoryList: Record<string, new () => Repository>;

	constructor(
		appContext: AppContext,
		fakeRepository: new () => Repository,
		realRepositoryList: Record<string, new () => Repository>
	) {
		if (!appContext.envVariables)
			throw new Error('No node environment variables');
		this.envVariables = appContext.envVariables;
		this.fakeRepository = new fakeRepository();
		this.realRepositoryList = realRepositoryList;
	}

	protected getRepository(): Repository {
		if (this.envVariables.NODE_ENV === NodeEnv.DEVELOPMENT) {
			return this.fakeRepository;
		}

		if (this.envVariables.NODE_ENV === NodeEnv.PRODUCTION) {
			const repo = this.realRepositoryList[this.envVariables.DB_ENV as DBEnv];

			if (!repo) {
				throw new Error('No repo found for given dbEnv');
			}
			return new repo();
		}

		throw new Error('Invalid nodeEnv');
	}
}

export interface RepoPicker<Repository> {
	getRepository() : Repository;
}

export abstract class NewRepositoryPicker<Repository> implements RepoPicker<Repository> {
	protected envVariables: DotenvParseOutput;
	protected appContext: AppContext;

	constructor(
		appContext: AppContext
	) {
		if (!appContext.envVariables)
			throw new Error('No node environment variables');
		this.appContext = appContext;
		this.envVariables = appContext.envVariables;
	}

	protected abstract getRepositoryList(): Record<string, new (appContext: AppContext) => Repository>;

	public getRepository(): Repository {
		const repo = this.getRepositoryList()[this.envVariables.DB_ENV as DBEnv];

		if (!repo) {
			throw new Error('No repo found for given dbEnv');
		}
		return new repo(this.appContext);
	}
}
