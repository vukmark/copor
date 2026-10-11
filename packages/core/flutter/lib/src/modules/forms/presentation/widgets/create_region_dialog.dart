import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_listeners.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_bloc.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_state.dart';
import 'package:copor_core/src/modules/forms/bloc/utils/copor_form_event_dispatcher.dart';
import 'package:copor_core/src/modules/forms/presentation/utils/dt_full_form_connector.dart';
import 'package:copor_core/src/modules/simple_list/bloc/simple_list_bloc_impl.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class CreateRegionDialog extends HookWidget {
  final String title;

  const CreateRegionDialog({super.key, required this.title});

  static Future<void> show(BuildContext context, {required String title}) {
    return showDialog<void>(
      context: context,
      useSafeArea: false,
      barrierDismissible: true,
      barrierColor: coporBarrierColor(context),
      builder: (_) => MultiBlocProvider(
        providers: [
          BlocProvider(create: (_) => getIt<CoporFormBloc>()),

          BlocProvider.value(value: getIt<StateSimpleListBloc>()),
        ],
        child: CreateRegionDialog(title: title),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final formKey = useMemoized(() => GlobalKey<FormState>());
    final translation = context.read<TranslationBloc<CommonTranslation>>().state.ensuredData;

    CoporFormEventDispatcher.coporForm.getCoporForm('/region/form');

    void closeDialog() => Navigator.of(context, rootNavigator: true).pop();

    return MultiBlocListener(
      listeners: [
        CoporFormListener(
          successNavigation: CoporFormSuccessNavigation.none,
          additionalLogic: (_) => closeDialog(),
        ),
        CoporFormInitialLoadFailureListener(),
      ],
      child: BlocSelector<CoporFormBloc, CoporFormState, bool>(
        selector: (state) => state.result == null,
        builder: (context, isInitialLoad) => DTModalShell(
          isMobile: context.isMobile,
          isLoading: isInitialLoad,
          builder: (context) => DTFullFormConnector(
            formKey: formKey,
            id: null,
            createTitle: title,
            editTitle: title,
            onCancel: closeDialog,
            saveLabel: translation.SAVE,
            cancelLabel: translation.CANCEL,
          ),
        ),
      ),
    );
  }
}
