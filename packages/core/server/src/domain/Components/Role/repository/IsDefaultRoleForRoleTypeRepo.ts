export interface IsDefaultRoleForRoleTypeRepo {
    isDefaultRoleForRoleType(roleId: string | undefined): Promise<boolean>;
}