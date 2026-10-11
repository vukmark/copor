import 'package:copor_theme/copor_theme.dart';
import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_bloc.dart';
import 'package:copor_core/src/utils/helper_functions.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/bloc/utils/bloc_event_dispatcher.dart';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

// **************************************************************************
// Constants
// **************************************************************************

const _kLanguageButtonKey = Key('languageButton');

final _kDefaultLanguages = [LanguageModel.defaultEnglish(), LanguageModel.defaultGerman()];

// **************************************************************************
// Main Widget: LanguageButton
// **************************************************************************

class LanguageButton extends StatelessWidget {
  final bool compact;
  final bool isMobile;
  final String cancelLabel;
  const LanguageButton({
    super.key,
    this.compact = false,
    required this.isMobile,
    this.cancelLabel = 'Cancel',
  });

  @override
  Widget build(BuildContext context) {
    final configState = context.watchState.config;
    if (configState.isInitial) return const SizedBox.shrink();

    final current = context.config.currentLanguage;
    final items = _kDefaultLanguages
        .map(
          (l) => DTLanguageItem(code: l.code, name: l.name, flagCode: getCountryFlagCode(l.code)),
        )
        .toList();
    final selected = DTLanguageItem(
      code: current.code,
      name: current.name,
      flagCode: getCountryFlagCode(current.code),
    );

    void onChanged(DTLanguageItem item) {
      if (item.code == selected.code) return;

      final language = _kDefaultLanguages.firstWhere((l) => l.code == item.code);
      BlocEventDispatcher.config.updateAppLanguage(context.read<ConfigBloc>(), language);
    }

    if (compact) {
      return DTLanguageButton.compact(
        key: _kLanguageButtonKey,
        items: items,
        selected: selected,
        onChanged: onChanged,
        isMobile: isMobile,
        cancelLabel: cancelLabel,
      );
    }
    return DTLanguageButton(
      key: _kLanguageButtonKey,
      items: items,
      selected: selected,
      onChanged: onChanged,
      isMobile: isMobile,
      cancelLabel: cancelLabel,
    );
  }
}
