import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_core/src/components/scaffold/scaffold_updater.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class AccessDeniedScaffold implements DSPageDrawer, DSAppBarTitle {
  const AccessDeniedScaffold();

  @override
  Widget getTitle() =>
      BlocBuilder<TranslationBloc<CommonTranslation>, TranslationState<CommonTranslation>>(
        builder: (context, state) {
          if (state.isInitial || state.isLoading) return const SizedBox.shrink();
          return Text(state.ensuredData.ACCESS_DENIED);
        },
      );
}
