import {AppContext} from '../../Interface/AppContext';
import {RepositoryPicker} from '../../Core/RepositoryPicker';

interface ReturnRepository {
	return(): Promise<number>
}
class FakeRepository implements ReturnRepository {
	return(): Promise<number> {
		return Promise.resolve(0);
	}
}
class RealRepository1 implements ReturnRepository {
	return(): Promise<number> {
		return Promise.resolve(1);
	}
}
class RealRepository2 implements ReturnRepository {
	return(): Promise<number> {
		return Promise.resolve(2);
	}
}

class ReturnRepositoryPicker extends RepositoryPicker<ReturnRepository> implements ReturnRepository {
	async return(): Promise<number> {
		const repository = this.getRepository();

		return await repository.return();
	}
}
type ReturnRepositoryConstructor = new () => ReturnRepository;
describe('test RepositoryPicker', () => {
	const realRepositoryList: Record<string, ReturnRepositoryConstructor> = {
		'maria-db': RealRepository1,
		'placeholder-db': RealRepository2
	};

	const createAppContext = (nodeEnv?: string, dbEnv?: string): AppContext => ({
		envVariables: nodeEnv && dbEnv ? {NODE_ENV: nodeEnv, DB_ENV: dbEnv} : undefined
	} as unknown as AppContext);

	it('throws error if no node env', () => {
		const appContext = createAppContext();

		expect(() => new ReturnRepositoryPicker(appContext, FakeRepository, realRepositoryList)).toThrow(new Error('No node environment variables'));
	});

	it('throws error for no repo found for DB_ENV', async () => {
		const appContext = createAppContext('SISMIS', 'PISMIS');

		const repositoryPicker = new ReturnRepositoryPicker(appContext, FakeRepository, realRepositoryList);

		await expect(repositoryPicker.return()).rejects.toThrow(new Error('Invalid nodeEnv'));
	});

	it('throws error for no repo found for NODE_ENV', async () => {
		const appContext = createAppContext('production', 'PISMIS');

		const repositoryPicker = new ReturnRepositoryPicker(appContext, FakeRepository, realRepositoryList);

		await expect(repositoryPicker.return()).rejects.toThrow(new Error('No repo found for given dbEnv'));
	});

	it('returns fake repository', async () => {
		const appContext = createAppContext('development', 'undefined');

		const repositoryPicker = new ReturnRepositoryPicker(appContext, FakeRepository, realRepositoryList);

		const result = await repositoryPicker.return();

		expect(result).toBe(0);
	});

	it('returns real repository 1', async () => {
		const appContext = createAppContext('production', 'maria-db');

		const repositoryPicker = new ReturnRepositoryPicker(appContext, FakeRepository, realRepositoryList);

		const result = await repositoryPicker.return();

		expect(result).toBe(1);
	});

	it('returns real repository 2', async () => {
		const appContext = createAppContext('production', 'placeholder-db');

		const repositoryPicker = new ReturnRepositoryPicker(appContext, FakeRepository, realRepositoryList);

		const result = await repositoryPicker.return();

		expect(result).toBe(2);
	});
});

