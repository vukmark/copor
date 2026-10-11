import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:copor_core/src/bloc/utils/bloc_providers.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_bloc.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_state.dart';
import 'package:copor_core/src/modules/forms/bloc/utils/copor_form_event_dispatcher.dart';
import 'package:copor_core/src/modules/forms/presentation/utils/dt_full_form_connector.dart';
import 'package:copor_core/src/modules/my_account/data/model/translation/my_account_translation.dart';

void openEditProfileDialog(
  BuildContext context, {
  required MyAccountPageTranslation translation,
  required String id,
}) {
  final isMobile = context.isMobile;
  final coporFormBloc = context.read<CoporFormBloc>();

  showDialog<void>(
    context: context,
    barrierDismissible: true,
    barrierColor: coporBarrierColor(context),
    builder: (ctx) => MultiBlocProvider(
      providers: [
        BlocProvider.value(value: coporFormBloc),
        StateSimpleListProvider(),
      ],
      child: _EditProfileModal(translation: translation, id: id, isMobile: isMobile),
    ),
  );
}

class _EditProfileModal extends HookWidget {
  final MyAccountPageTranslation translation;
  final String id;
  final bool isMobile;

  const _EditProfileModal({required this.translation, required this.id, required this.isMobile});

  @override
  Widget build(BuildContext context) {
    CoporFormEventDispatcher.coporForm.getCoporForm('/user/account-information/form', id);

    return BlocSelector<CoporFormBloc, CoporFormState, bool>(
      selector: (state) => state.result == null,
      builder: (context, isInitialLoad) => DTModalShell(
        isMobile: isMobile,
        isLoading: isInitialLoad,
        builder: (_) => _EditProfileDialog(translation: translation, id: id),
      ),
    );
  }
}

class _EditProfileDialog extends HookWidget {
  final MyAccountPageTranslation translation;
  final String id;

  const _EditProfileDialog({required this.translation, required this.id});

  @override
  Widget build(BuildContext context) {
    final formKey = useMemoized(() => GlobalKey<FormState>());
    return DTFullFormConnector(
      formKey: formKey,
      id: id,
      icon: DTIcons.editInline,
      editTitle: translation.EDIT_PROFILE,
      createTitle: translation.EDIT_PROFILE,
      onCancel: () => Navigator.of(context, rootNavigator: true).pop(),
      cancelLabel: translation.CANCEL,
      saveLabel: translation.SAVE,
    );
  }
}
