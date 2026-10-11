import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/modules/forms/bloc/utils/copor_form_event_dispatcher.dart';
import 'package:copor_core/src/modules/forms/presentation/utils/dt_full_form_connector.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class CreateCloudGroupPage extends HookWidget {
  const CreateCloudGroupPage({super.key});

  @override
  Widget build(BuildContext context) {
    final formKey = useMemoized(() => GlobalKey<FormState>());
    final translation = context.read<TranslationBloc<CommonTranslation>>().state.ensuredData;

    CoporFormEventDispatcher.coporForm.getCoporForm('/user-group/form');

    void closeDialog() => Navigator.of(context, rootNavigator: true).pop();

    return DTModalShell(
      isMobile: context.isMobile,
      builder: (context) => DTFullFormConnector(
        formKey: formKey,
        icon: PhosphorIconsThin.folder,
        createTitle: translation.CREATE,
        editTitle: translation.CREATE,
        onCancel: closeDialog,
        saveLabel: translation.SAVE,
        cancelLabel: translation.CANCEL,
        loadingPlaceholder: const Center(child: DTRingLoader()),
        isFormReady: (_) => true,
      ),
    );
  }
}
