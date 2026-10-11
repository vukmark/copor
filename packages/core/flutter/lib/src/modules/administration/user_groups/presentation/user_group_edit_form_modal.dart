import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/bloc/utils/bloc_listeners.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/data/model/named_id/named_id_model.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/modules/administration/user_groups/bloc/user_groups_cubit.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_bloc.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_event.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_state.dart';
import 'package:copor_core/src/modules/forms/bloc/utils/copor_form_event_dispatcher.dart';
import 'package:copor_core/src/modules/forms/data/model/copor_form_dto.dart';
import 'package:copor_core/src/modules/forms/presentation/utils/dt_full_form_connector.dart';
import 'package:copor_core/src/data/model/named_id_dto.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:get_it/get_it.dart';

class UserGroupEditFormModal extends StatelessWidget {
  final String userGroupId;
  final UserGroupsCubit userGroupsCubit;
  final CommonTranslation translation;
  final ValueChanged<String> onSuccess;
  final List<NamedIdDTO> existingUsers;

  const UserGroupEditFormModal({
    super.key,
    required this.userGroupId,
    required this.userGroupsCubit,
    required this.translation,
    required this.existingUsers,
    required this.onSuccess,
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
          FailureListener<CoporFormBloc, CoporFormState>(
            failureKey: 'user_group_edit_form_failure',
          ),
          CoporFormInitialLoadFailureListener(),
        ],
        child: _UserGroupEditForm(userGroupId: userGroupId, existingUsers: existingUsers),
      ),
    );
  }
}

class _UserGroupEditForm extends HookWidget {
  final String userGroupId;
  final List<NamedIdDTO> existingUsers;

  const _UserGroupEditForm({required this.userGroupId, required this.existingUsers});

  @override
  Widget build(BuildContext context) {
    final formKey = useMemoized(() => GlobalKey<FormState>());

    CoporFormEventDispatcher.coporForm.getCoporForm('/user-group/form', userGroupId);

    final translation = context.getState.commonTranslation.ensuredData;

    return BlocSelector<CoporFormBloc, CoporFormState, bool>(
      selector: (state) => state.result == null,
      builder: (context, isInitialLoad) => DTModalShell(
        isMobile: context.isMobile,
        isLoading: isInitialLoad,
        builder: (context) => DTFullFormConnector(
          formKey: formKey,
          id: userGroupId,
          editTitle: 'Edit Group',
          createTitle: 'Add Group',
          fieldsTransformer: _formFieldsWithExistingUsers,
          onCancel: () => Navigator.of(context, rootNavigator: true).pop(),
          saveLabel: translation.SAVE,
          cancelLabel: translation.CANCEL,
        ),
      ),
    );
  }

  List<CoporFormFieldDTO> _formFieldsWithExistingUsers(List<CoporFormFieldDTO> fields) {
    return fields.expand((field) {
      final isUserListField = field.name == 'userList';
      final currentUsers = field.currentValue.dropdown;
      final fieldAlreadyHasValidUsers =
          currentUsers?.isNotEmpty == true &&
          currentUsers!.every((user) => user.id != null && user.id.toString().isNotEmpty);

      if (!isUserListField) {
        return [field];
      }

      if (fieldAlreadyHasValidUsers) {
        return [field];
      }

      return [
        CoporFormFieldDTO(
          type: field.type,
          label: field.label,
          currentValue: FieldValue(
            color: field.currentValue.color,
            checkbox: field.currentValue.checkbox,
            text: field.currentValue.text,
            date: field.currentValue.date,
            dropdown: existingUsers
                .map((user) => NamedIdModel<String>(id: user.id, name: user.name, userId: user.id))
                .toList(),
            doubleNumber: field.currentValue.doubleNumber,
            number: field.currentValue.number,
            stateList: field.currentValue.stateList,
            phoneNumberList: field.currentValue.phoneNumberList,
            searchableDropdown: field.currentValue.searchableDropdown,
            searchableMultiselect: field.currentValue.searchableMultiselect,
            rangeSearchableMultiselect: field.currentValue.rangeSearchableMultiselect,
            contract: field.currentValue.contract,
          ),
          requiredMessage: field.requiredMessage,
          name: field.name,
          values: field.values,
        ),
      ];
    }).toList();
  }
}
