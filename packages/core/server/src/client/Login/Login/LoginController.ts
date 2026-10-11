import {CredentialsDTO} from '@copor/core/domain/Login/interactor/dto/CredentialsDTO';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {GetUserIdByCredentials} from '@copor/core/domain/Login/interactor/GetUserIdByCredentials';
import jwt, {SignOptions} from 'jsonwebtoken';
import {InvalidCredentialsException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidCredentialsException';
import {InactiveUserException} from '@copor/core/domain/Core/Exceptions/InactiveUserException';
import {UserCredentialsResultDTO} from '@copor/core/domain/Login/interactor/dto/UserCredentialsResultDTO';
import {LoginStorageRepoPicker} from '@copor/core/client/Login/Login/repo/repoPicker/LoginStorageRepoPicker';
import {TokenPayload} from '@copor/core/client/Login/Login/interface/TokenPayload';
import {LoginRequestDTO} from '@copor/core/client/Login/Login/dto/LoginRequestDTO';
import {BaseController} from '@copor/core/client/Core/BaseController';
import {ContractsSignedCheckResultDTO} from '@copor/core/domain/Login/interactor/dto/ContractsSignedCheckResultDTO';
import {CheckContractsSigned} from '@copor/core/domain/Login/interactor/CheckContractsSigned';
import {ContractsSignedCheckRepoPicker} from '@copor/core/client/Login/Login/repo/repoPicker/ContractsSignedCheckRepoPicker';
import {LoginPresenter} from '@copor/core/client/Login/Login/LoginPresenter';
import {LoginResponseViewModel} from '@copor/core/client/Login/Login/LoginResponseViewModel';
import {ContractsNotSignedException} from '@copor/core/domain/Login/exception/ContractsNotSignedException';
import {LoginPresenterInput} from '@copor/core/client/Login/Login/dto/LoginPresenterInput';
import {RoleKyselyHelper} from '@copor/core/client/Components/Role/repositoryHelper/RoleKyselyHelper';
import {RecordUserVisit} from '@copor/core/domain/User/interactor/RecordUserVisit';
import {
	RecordUserVisitInteractorRepoPicker
} from '@copor/core/client/User/RecordUserVisit/repo/repoPicker/RecordUserVisitInteractorRepoPicker';

export class LoginController extends BaseController<CredentialsDTO, LoginResponseViewModel> {
	async getResponse() {
		const credentialsResult = await this.getUserIdInteractor().execute();

		if (!credentialsResult) {
			this.next(new InvalidCredentialsException());
			return;
		}

		if (!credentialsResult.isActive) {
			this.next(new InactiveUserException());
			return;
		}

		const userId = credentialsResult.userId;

		await this.recordUserVisit(userId);

		const contractResult = await this.getContractsSignedCheckInteractor(userId).execute();
		const role = contractResult ? (await RoleKyselyHelper.getRoleForUser(userId))?.type : undefined;

		const tokens = {
			authToken: this.getAuthToken(userId),
			refreshToken: this.getRefreshToken(userId)
		};

		const presenterInput: LoginPresenterInput = {
			contractResult,
			role,
			authToken: tokens.authToken,
			refreshToken: tokens.refreshToken
		};

		const presenter = this.container.getPresenter(LoginPresenter, presenterInput, this.container.appContext);
		const presentedResponse = presenter.present();

		if (presentedResponse.error) {
			this.next(new ContractsNotSignedException(presentedResponse.error));
			return;
		}

		this.response.status(200).send(presentedResponse);
	}

	private getAuthToken(userId: string): string {
		const authTokenPayload: TokenPayload = {
			userId: userId,
			tokenType: 'access'
		};
		const env = this.container.appContext.envVariables!;

		if (!env.TOKEN_EXPIRE_TIME) {
			throw new Error('TOKEN_EXPIRE_TIME is missing in env');
		}

		const validTokenExpireTime = /^(\d+)(ms|s|m|h|d)?$/.test(env.TOKEN_EXPIRE_TIME);

		if (!validTokenExpireTime) {
			throw new Error(`Invalid TOKEN_EXPIRE_TIME: ${env.TOKEN_EXPIRE_TIME}`);
		}

		return jwt.sign(authTokenPayload, env.PRIVATE_KEY, {
			expiresIn: env.TOKEN_EXPIRE_TIME as SignOptions['expiresIn']
		});
	}
	private getRefreshToken(userId: string): string {
		const refreshTokenPayload: TokenPayload = {
			userId: userId,
			tokenType: 'refresh'
		};
		const env = this.container.appContext.envVariables!;

		if (!env.TOKEN_EXPIRE_TIME) {
			throw new Error('TOKEN_EXPIRE_TIME is missing in env');
		}

		const validTokenExpireTime = /^(\d+)(ms|s|m|h|d)?$/.test(env.TOKEN_EXPIRE_TIME);

		if (!validTokenExpireTime) {
			throw new Error(`Invalid TOKEN_EXPIRE_TIME: ${env.TOKEN_EXPIRE_TIME}`);
		}

		return jwt.sign(refreshTokenPayload, env.PRIVATE_KEY, {
			expiresIn: env.TOKEN_REFRESH_TIME as SignOptions['expiresIn']
		});
	}

	private getUserIdInteractor() : UseCase<UserCredentialsResultDTO | undefined> {
		const container = this.container;
		const interactorInput: LoginRequestDTO = {
			... this.request.body
		};
		const interactorRepo = container.getNewRepoPicker(LoginStorageRepoPicker);

		return container.getInteractor(
			GetUserIdByCredentials,
			interactorRepo,
			interactorInput
		);
	}

	private async recordUserVisit(userId: string): Promise<void> {
		try {
			await this.getRecordUserVisitInteractor(userId).execute();
		} catch (error) {
			console.error('Failed to record user visit', error);
		}
	}

	private getRecordUserVisitInteractor(userId: string): UseCase<void> {
		return this.container.getInteractor(
			RecordUserVisit,
			this.container.getNewRepoPicker(RecordUserVisitInteractorRepoPicker),
			{userId, visitedAt: new Date()}
		);
	}

	private getContractsSignedCheckInteractor(userId: string): UseCase<ContractsSignedCheckResultDTO | null> {
		return this.container.getInteractor(
			CheckContractsSigned,
			this.container.getNewRepoPicker(ContractsSignedCheckRepoPicker),
			{userId}
		);
	}
}
