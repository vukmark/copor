enum PermissionEffect {
  allow('ALLOW'),
  deny('DENY'),
  inherit('INHERIT');

  const PermissionEffect(this.value);

  final String value;

  static PermissionEffect? fromValue(String value) {
    for (final effect in PermissionEffect.values) {
      if (effect.value == value) {
        return effect;
      }
    }

    return null;
  }
}
