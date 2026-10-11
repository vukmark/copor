import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

/// Standard app-bar title for routes with a translated, icon+label pill:
/// hidden while [CommonTranslation] is still loading, then a
/// non-interactive [DTButton.floating] pill once it's ready — the shape
/// most `DSAppBarTitle.getTitle()` implementations in the app use, varying
/// only which icon/label they show.
///
/// [icon]/[label] may return `null` (e.g. a page whose title depends on the
/// current sub-route and has no title for some of them) to render nothing
/// instead of a pill, same as the loading state.
class ScaffoldTitlePill extends StatelessWidget {
  final IconData? Function(CommonTranslation translation) icon;
  final String? Function(CommonTranslation translation) label;

  const ScaffoldTitlePill({super.key, required this.icon, required this.label});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<TranslationBloc<CommonTranslation>, TranslationState<CommonTranslation>>(
      builder: (context, state) {
        if (state.isInitial || state.isLoading) return const SizedBox.shrink();

        final translation = state.ensuredData;
        final resolvedIcon = icon(translation);
        final resolvedLabel = label(translation);
        if (resolvedIcon == null || resolvedLabel == null) return const SizedBox.shrink();

        return IgnorePointer(
          child: DTButton.floating(
            icon: resolvedIcon,
            label: resolvedLabel,
            border: false,
            onPressed: () {},
          ),
        );
      },
    );
  }
}
