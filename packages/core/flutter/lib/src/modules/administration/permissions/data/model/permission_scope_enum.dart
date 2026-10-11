enum PermissionScope {
  own('OWN'),
  tenant('TENANT'),
  all('ALL');

  const PermissionScope(this.value);

  final String value;

  static PermissionScope? fromValue(String value) {
    for (final scope in PermissionScope.values) {
      if (scope.value == value) {
        return scope;
      }
    }

    return null;
  }
}
