import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class AppBarBackButton extends StatelessWidget {
  final VoidCallback onPressed;

  const AppBarBackButton({super.key, required this.onPressed});

  @override
  Widget build(BuildContext context) {
    final translationState = context.watch<TranslationBloc<CommonTranslation>>().state;

    if (translationState.isInitial || translationState.isLoading) {
      return const SizedBox.shrink();
    }

    final translation = translationState.ensuredData;

    return DTButton.floating(
      icon: PhosphorIconsThin.caretLeft,
      label: '',
      semanticLabel: translation.BACK,
      border: !context.isMobile,
      onPressed: onPressed,
    );
  }
}
