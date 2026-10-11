import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/modules/forms/bloc/utils/copor_form_event_dispatcher.dart';
import 'package:copor_core/src/modules/forms/presentation/utils/dt_full_form_connector.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class EditCloudGroupPage extends HookWidget {
  final String id;

  const EditCloudGroupPage({super.key, required this.id});

  @override
  Widget build(BuildContext context) {
    final formKey = useMemoized(() => GlobalKey<FormState>());
    final translation = context.read<TranslationBloc<CommonTranslation>>().state.ensuredData;

    CoporFormEventDispatcher.coporForm.getCoporForm('/user-group/form', id);

    void closeDialog() => Navigator.of(context, rootNavigator: true).pop();

    return DTModalShell(
      isMobile: context.isMobile,
      builder: (context) => DTFullFormConnector(
        formKey: formKey,
        id: id,
        icon: PhosphorIconsThin.folder,
        createTitle: translation.EDIT,
        editTitle: translation.EDIT,
        onCancel: closeDialog,
        saveLabel: translation.SAVE,
        cancelLabel: translation.CANCEL,
        loadingPlaceholder: const Center(child: DTRingLoader()),
        isFormReady: (_) => true,
      ),
    );
  }
}
