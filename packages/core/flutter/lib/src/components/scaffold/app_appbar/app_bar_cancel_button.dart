import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/components/buttons/copor_button.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class AppBarCancelButton extends StatelessWidget {
  final VoidCallback onPressed;

  const AppBarCancelButton({super.key, required this.onPressed});

  @override
  Widget build(BuildContext context) {
    final translationState = context.watch<TranslationBloc<CommonTranslation>>().state;

    if (translationState.isInitial || translationState.isLoading) {
      return const SizedBox.shrink();
    }

    final translation = translationState.ensuredData;

    if (context.isMobile) {
      return Align(
        alignment: Alignment.centerLeft,
        child: Padding(
          padding: const EdgeInsets.only(left: 16),
          child: CoporButton(onPressed: onPressed, outlined: true, label: translation.CANCEL),
        ),
      );
    }
    return const SizedBox.shrink();
  }
}
