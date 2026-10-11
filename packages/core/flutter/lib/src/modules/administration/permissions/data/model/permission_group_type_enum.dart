enum PermissionGroupType {
  userGroup('USER_GROUP');

  const PermissionGroupType(this.value);

  final String value;

  static PermissionGroupType? fromValue(String value) {
    for (final groupType in PermissionGroupType.values) {
      if (groupType.value == value) {
        return groupType;
      }
    }

    return null;
  }
}
