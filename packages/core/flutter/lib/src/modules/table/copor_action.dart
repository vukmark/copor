import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/components/dialogs/app_confirm_dialog.dart';
import 'package:copor_core/src/modules/administration/permissions/presentation/widgets/user_permissions_view_modal.dart';
import 'package:copor_core/src/modules/login/registration/bloc/contract/utils/contract_event_dispatcher.dart';
import 'package:copor_core/src/modules/table/bloc/table_bloc.dart';
import 'package:copor_core/src/modules/table/bloc/table_event.dart';
import 'package:copor_core/src/modules/table/data/model/copor_action_dto_model.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:json_annotation/json_annotation.dart';

enum TableActionType {
  @JsonValue('edit')
  edit,
  @JsonValue('remove')
  remove,
  @JsonValue('info')
  info,
  @JsonValue('document')
  document,
  @JsonValue('toggleActive')
  toggleActive,
  @JsonValue('permissions')
  permissions,
}

abstract class CoporAction {
  final CoporActionDTOModel actionDTO;

  CoporAction({required this.actionDTO});

  IconData getIcon();

  String getPopupMessage() {
    return actionDTO.popupMessage;
  }

  void onClick() {
    goToPage(actionDTO.routerPath, push: true);
  }
}

class EditAction extends CoporAction {
  EditAction({required super.actionDTO});

  @override
  IconData getIcon() {
    return DTIcons.edit;
  }
}

class InfoAction extends CoporAction {
  InfoAction({required super.actionDTO});

  @override
  IconData getIcon() {
    return PhosphorIconsThin.info;
  }
}

class DeleteAction extends CoporAction {
  final BuildContext context;

  DeleteAction({required super.actionDTO, required this.context});

  @override
  IconData getIcon() {
    return DTIcons.delete;
  }

  @override
  Future<void> onClick() async {
    final shouldDelete = await AppConfirmDialog.showDelete(context);
    if (shouldDelete == true && context.mounted) {
      context.read<TableBloc>().add(DeleteRow(actionDTO.routerPath));
    }
  }
}

class ToggleActiveAction extends CoporAction {
  final BuildContext context;

  ToggleActiveAction({required super.actionDTO, required this.context});

  @override
  IconData getIcon() {
    return actionDTO.isActive == true ? PhosphorIconsThin.check : PhosphorIconsThin.prohibit;
  }

  @override
  void onClick() {
    context.read<TableBloc>().add(ToggleRow(actionDTO.routerPath, !(actionDTO.isActive ?? false)));
  }
}

class PermissionsAction extends CoporAction {
  final BuildContext context;

  PermissionsAction({required super.actionDTO, required this.context});

  @override
  IconData getIcon() {
    return PhosphorIconsThin.shieldCheck;
  }

  @override
  void onClick() {
    showDialog<void>(
      context: context,
      builder: (_) => UserPermissionsViewModal(userId: actionDTO.routerPath),
    );
  }
}

class DocumentAction extends CoporAction {
  final BuildContext context;

  DocumentAction({required super.actionDTO, required this.context});

  @override
  IconData getIcon() {
    return PhosphorIconsThin.filePdf;
  }

  @override
  void onClick() {
    ContractEventDispatcher.contract.getContract(context, actionDTO.routerPath);
  }
}
