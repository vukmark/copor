import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/data/administration_namespaces.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_bloc.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_state.dart';
import 'package:copor_core/src/modules/forms/bloc/utils/copor_form_event_dispatcher.dart';
import 'package:copor_core/src/modules/forms/presentation/utils/dt_full_form_connector.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class EditAdministrationPage extends HookWidget {
  final String? id;
  final String namespace;
  final bool useModalShell;
  final String? role;

  const EditAdministrationPage({
    super.key,
    required this.id,
    required this.namespace,
    this.useModalShell = false,
    this.role,
  });

  String _getEditTitle(CommonTranslation translation) {
    if (id == 'smtp-test') return translation.SAVE_SMTP;
    return AdministrationNamespaces.getTranslatedEditTitle(namespace)(translation);
  }

  String _getSaveLabel(CommonTranslation translation) {
    if (id == 'smtp-test') return translation.SEND;
    return translation.SAVE;
  }

  String _getCreateTitle(CommonTranslation translation) {
    final roleTitle = switch (role) {
      'USER' => translation.USER,
      'ADMIN' => translation.ADMIN,
      _ => null,
    };

    return roleTitle == null
        ? AdministrationNamespaces.getTranslatedCreateTitle(namespace)(translation)
        : '${translation.ADD} $roleTitle';
  }

  @override
  Widget build(BuildContext context) {
    final formKey = useMemoized(() => GlobalKey<FormState>());
    final translation = context.read<TranslationBloc<CommonTranslation>>().state.ensuredData;

    final baseEndpoint = role != null ? '/$namespace/form?role=$role' : '/$namespace/form';

    CoporFormEventDispatcher.coporForm.getCoporForm(baseEndpoint, id);

    void closeDialog() => Navigator.of(context, rootNavigator: true).pop();

    return BlocSelector<CoporFormBloc, CoporFormState, bool>(
      selector: (state) => state.result == null,
      builder: (context, isInitialLoad) => DTModalShell(
        isMobile: context.isMobile,
        isLoading: isInitialLoad,
        builder: (context) => DTFullFormConnector(
          formKey: formKey,
          id: id,
          editTitle: _getEditTitle(translation),
          createTitle: _getCreateTitle(translation),
          onCancel: closeDialog,
          saveLabel: _getSaveLabel(translation),
          cancelLabel: translation.CANCEL,
        ),
      ),
    );
  }
}
