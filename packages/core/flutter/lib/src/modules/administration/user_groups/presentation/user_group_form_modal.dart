import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/bloc/utils/bloc_listeners.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/modules/administration/user_groups/bloc/user_groups_cubit.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_bloc.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_event.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_state.dart';
import 'package:copor_core/src/modules/forms/bloc/utils/copor_form_event_dispatcher.dart';
import 'package:copor_core/src/modules/forms/presentation/utils/dt_full_form_connector.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:get_it/get_it.dart';

class UserGroupFormModal extends StatelessWidget {
  final UserGroupsCubit userGroupsCubit;
  final CommonTranslation translation;
  final ValueChanged<String> onSuccess;
  final String? parentUserGroupId;

  const UserGroupFormModal({
    super.key,
    required this.userGroupsCubit,
    required this.translation,
    required this.onSuccess,
    this.parentUserGroupId,
  });

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => GetIt.instance<CoporFormBloc>(),
      child: MultiBlocListener(
        listeners: [
          BlocListener<CoporFormBloc, CoporFormState>(
            listenWhen: (prev, curr) => curr.isUpdated && !prev.isUpdated,
            listener: (context, state) {
              final message = state.actionType == ActionType.update
                  ? translation.UPDATE_SUCCESS_MESSAGE
                  : translation.CREATE_SUCCESS_MESSAGE;

              userGroupsCubit.getUserGroupTree();
              context.read<CoporFormBloc>().add(const ClearCoporForm());
              Navigator.of(context).pop();
              onSuccess(message);
            },
          ),
          FailureListener<CoporFormBloc, CoporFormState>(failureKey: 'user_group_form_failure'),
          CoporFormInitialLoadFailureListener(),
        ],
        child: _UserGroupForm(parentUserGroupId: parentUserGroupId),
      ),
    );
  }
}

class _UserGroupForm extends HookWidget {
  final String? parentUserGroupId;

  const _UserGroupForm({this.parentUserGroupId});

  @override
  Widget build(BuildContext context) {
    final formKey = useMemoized(() => GlobalKey<FormState>());

    CoporFormEventDispatcher.coporForm.getCoporForm('/user-group/form');

    final translation = context.getState.commonTranslation.ensuredData;

    return BlocSelector<CoporFormBloc, CoporFormState, bool>(
      selector: (state) => state.result == null,
      builder: (context, isInitialLoad) => DTModalShell(
        isMobile: context.isMobile,
        isLoading: isInitialLoad,
        builder: (context) => DTFullFormConnector(
          formKey: formKey,
          editTitle: 'Add Group',
          createTitle: 'Add Group',
          additionalParams: parentUserGroupId == null
              ? null
              : [(key: 'parentUserGroupId', value: parentUserGroupId!)],
          onCancel: () => Navigator.of(context, rootNavigator: true).pop(),
          saveLabel: translation.SAVE,
          cancelLabel: translation.CANCEL,
        ),
      ),
    );
  }
}
