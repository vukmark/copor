import {GetUserAccountInformationRepo} from '@copor/core/domain/User/AccountInformation/repository/GetUserAccountInformationRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';
import {GetUserAccountInformationDTO} from '@copor/core/domain/User/interactor/dto/GetUserAccountInformationDTO';
import {db} from '@copor/core/client/AppDataSource';

abstract class KyselyGetUserBaseInformationInteractorRepo
implements GetUserAccountInformationRepo {
	private appContext: AppContext;
	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}
	public async load(userId: string): Promise<GetUserAccountInformationDTO> {
		const userData = await UserKyselyHelper.getUserData(userId, this.appContext);

		const user = await db
			.selectFrom('user')
			.innerJoin('role', 'role.id', 'user.roleId')
			.innerJoin('authUser', 'authUser.id', 'user.authUserId')
			.select([
				'role.type as roleType',
				'authUser.email as email',
				'user.contactNote as contactNote',
				'user.createdAt as registrationDate',
				'user.lastVisitedAt as lastVisitedAt',
				'user.deletionRequested as deletionRequested',
				'user.isActive as isActive'
			])
			.where('user.id', '=', userId)
			.executeTakeFirst();

		if (!user)
			throw new Error('User has no role');

		const phoneNumberList = await db
			.selectFrom('phoneNumber')
			.select([
				'id',
				'userId',
				'phoneNumberType',
				'phoneNumber'
			])
			.where('userId', '=', userId)
			.execute();

		const roleData = await this.loadRoleData(userId);

		return {
			firstName: userData.userFirstName!,
			lastName: userData.userLastName!,
			pictureName: userData.imageName ?? undefined,
			pictureExtension: userData.imageExtension ?? undefined,
			userName: userData.username!,
			id: userId,
			email: user.email!,
			roleType: user.roleType,
			registrationDate: user.registrationDate,
			lastVisitedDate: user.lastVisitedAt ?? undefined,
			phoneNumberList: phoneNumberList.map((phone) => ({
				id: phone.id,
				user: phone.userId,
				phoneNumber: phone.phoneNumber,
				phoneNumberType: phone.phoneNumberType
			})),
			contactNote: user.contactNote ?? undefined,
			deletionRequested: Boolean(user.deletionRequested),
			isActive: Boolean(user.isActive),
			... roleData
		};
	}

	protected abstract loadRoleData(
		userId: string
	): Promise<Partial<GetUserAccountInformationDTO>>;
}

export default KyselyGetUserBaseInformationInteractorRepo;