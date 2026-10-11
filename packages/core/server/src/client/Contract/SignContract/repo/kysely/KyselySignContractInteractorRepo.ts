import {SignContractDTO} from '@copor/core/domain/Contract/interactor/dto/SignContractDTO';
import {SignContractRepo} from '@copor/core/domain/Contract/repository/SignContractRepo';
import {db} from '@copor/core/client/AppDataSource';
import {InvalidContractTypeException} from '@copor/core/domain/Contract/validation/exception/InvalidContractTypeException';

export class KyselySignContractInteractorRepo implements SignContractRepo {
	private dbInstance = db;

	public useTransaction(trx: typeof db): this {
		this.dbInstance = trx;
		return this;
	}

	async sign(input: SignContractDTO): Promise<void> {
		const contract = await this.dbInstance
			.selectFrom('contract')
			.select(['id'])
			.where('type', '=', input.contractType)
			.executeTakeFirstOrThrow(() => new InvalidContractTypeException());

		await this.dbInstance
			.insertInto('userContractMap')
			.values({
				userId: input.userId,
				contractId: contract.id
			})
			.ignore()
			.execute();
	}
}