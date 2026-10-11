/// A group of a module's on/off preferences in My Account → Notifications.
///
/// The keys are `my_account` translation keys the module adds through its
/// server locales (`client/src/<Feature>/locales/my_account/`), so core's My
/// Account page can show them without knowing the module.
class ModulePreferenceSection {
  final String titleKey;

  /// Help text for "on" and "off", shown behind the section's help button.
  final String helpOnKey;
  final String helpOffKey;

  final List<ModulePreferenceToggle> toggles;

  /// Position among the sections of all modules.
  final int order;

  const ModulePreferenceSection({
    required this.titleKey,
    required this.helpOnKey,
    required this.helpOffKey,
    required this.toggles,
    required this.order,
  });
}

class ModulePreferenceToggle {
  /// The server's module preference key, `<module>.<name>`.
  final String preferenceKey;

  final String labelKey;

  const ModulePreferenceToggle({required this.preferenceKey, required this.labelKey});
}
