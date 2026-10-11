import 'package:copor_core/src/core/module/app_modules.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/core/module/module_preference_section.dart';
import 'package:copor_core/src/core/module/copor_module.dart';
import 'package:copor_core/src/modules/my_account/data/model/translation/my_account_translation.dart';
import 'package:copor_core/src/modules/preferences/bloc/preferences_bloc.dart';
import 'package:copor_core/src/modules/preferences/bloc/utils/preferences_bloc_event_dispatcher.dart';
import 'package:copor_core/src/modules/preferences/data/model/update_preferences_dto.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

/// The enabled modules' on/off preferences (`CoporModule.preferenceSections`).
/// Hidden when no module has any.
class Notifications extends StatelessWidget {
  final MyAccountPageTranslation translation;

  const Notifications({super.key, required this.translation});

  Widget _toggleHelp(BuildContext context, String onText, String offText) {
    final dt = CoporTextStyles.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            const Icon(PhosphorIconsThin.toggleRight, size: 16),
            const SizedBox(width: 8),
            Expanded(child: Text(onText, style: dt.bodySecondary)),
          ],
        ),
        const SizedBox(height: 8),
        Row(
          children: [
            const Icon(PhosphorIconsThin.toggleLeft, size: 16),
            const SizedBox(width: 8),
            Expanded(child: Text(offText, style: dt.bodySecondary)),
          ],
        ),
      ],
    );
  }

  void _toggle(BuildContext context, String preferenceKey, bool value) {
    final bloc = context.read<PreferencesBloc>();
    final current = bloc.state.ensuredData;

    PreferencesBlocEventDispatcher.preferences.updatePreferences(
      bloc,
      UpdatePreferencesDTO.fromModel(current).copyWith(
        useIcons: current.useIcons,
        modulePreferences: {...current.modulePreferences, preferenceKey: value},
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final sections = modulePreferenceSections(AppModules.enabled);
    final preferences = context.watchState.preferences.ensuredData;

    if (sections.isEmpty) return const SizedBox.shrink();

    return DTInputDecorator(
      label: translation.NOTIFICATIONS,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          for (final section in sections) ...[
            _Section(
              section: section,
              translation: translation,
              help: _toggleHelp(
                context,
                translation.getTranslation(section.helpOnKey),
                translation.getTranslation(section.helpOffKey),
              ),
              isOn: preferences.modulePreference,
              onChanged: (key, value) => _toggle(context, key, value),
            ),
            const SizedBox(height: 16),
          ],
        ],
      ),
    );
  }
}

class _Section extends StatelessWidget {
  final ModulePreferenceSection section;
  final MyAccountPageTranslation translation;
  final Widget help;
  final bool Function(String preferenceKey) isOn;
  final void Function(String preferenceKey, bool value) onChanged;

  const _Section({
    required this.section,
    required this.translation,
    required this.help,
    required this.isOn,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return DTInputDecorator.withHelp(
      label: translation.getTranslation(section.titleKey),
      helpContent: help,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          for (final toggle in section.toggles)
            DTSwitchInput(
              label: translation.getTranslation(toggle.labelKey),
              value: isOn(toggle.preferenceKey),
              onChanged: (value) => onChanged(toggle.preferenceKey, value),
            ),
        ],
      ),
    );
  }
}
