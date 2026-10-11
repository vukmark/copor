import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/bloc/utils/bloc_listeners.dart';
import 'package:copor_core/src/components/dialogs/app_confirm_dialog.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/modules/administration/user_groups/bloc/user_groups_cubit.dart';
import 'package:copor_core/src/modules/administration/user_groups/bloc/user_groups_state.dart';
import 'package:copor_core/src/modules/administration/user_groups/data/model/user_group_model.dart';
import 'package:copor_core/src/modules/administration/user_groups/presentation/user_group_edit_form_modal.dart';
import 'package:copor_core/src/modules/administration/user_groups/presentation/user_group_form_modal.dart';
import 'package:copor_core/src/modules/administration/user_groups/presentation/user_group_user_list_modal.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:get_it/get_it.dart';

class UserGroupsPage extends StatelessWidget {
  const UserGroupsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider(create: (_) => GetIt.instance<UserGroupsCubit>()..getUserGroupTree()),
      ],
      child: const _UserGroupsPageContent(),
    );
  }
}

class _UserGroupsPageContent extends StatefulWidget {
  const _UserGroupsPageContent();

  @override
  State<_UserGroupsPageContent> createState() => _UserGroupsPageContentState();
}

class _UserGroupsPageContentState extends State<_UserGroupsPageContent> {
  final Set<String> _expandedGroupIds = {};
  final ScrollController _scrollController = ScrollController();

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final translation = context.getState.commonTranslation.ensuredData;

    return DSPageWrapper(
      isMobile: context.isMobile,
      children: [
        Align(
          alignment: Alignment.centerRight,
          child: DTButton.primary(
            icon: DTIcons.add,
            label: 'Add Group',
            onPressed: () => _showCreateUserGroupForm(context),
            inputSize: context.isMobile ? DTInputSize.compact : DTInputSize.normal,
          ),
        ),
        const SizedBox(height: 12),
        MultiBlocListener(
          listeners: [
            ItemDeletionListener<UserGroupsCubit, UserGroupsState>(
              additionalLogic: (context) => context.read<UserGroupsCubit>().getUserGroupTree(),
            ),
          ],
          child: BlocBuilder<UserGroupsCubit, UserGroupsState>(
            builder: (context, state) {
              if (state.isLoading && state.result == null) {
                return Expanded(child: Center(child: Container()));
              }

              if (state.failure != null && state.result == null) {
                return Expanded(child: Center(child: Text(state.failure.toString())));
              }

              return DTTable(
                headers: [
                  DTColumnHeader(name: translation.USER_GROUPS, size: DTColumnSize.col18),
                  DTColumnHeader(
                    name: translation.ACTIONS,
                    fixedWidth: 190,
                    alignment: DTColumnAlignment.right,
                  ),
                ],
                rows: _buildRows(state.result?.data ?? [], translation),
                noData: Text(translation.NO_RESULTS_FOUND),
                labels: _buildTableLabels(translation),
                isMobile: context.isMobile,
                scrollController: _scrollController,
                minWidth: 680,
              );
            },
          ),
        ),
      ],
    );
  }

  void _showCreateUserGroupForm(BuildContext context, {String? parentUserGroupId}) {
    final userGroupsCubit = context.read<UserGroupsCubit>();
    final translation = context.getState.commonTranslation.ensuredData;

    showDialog<void>(
      context: context,
      builder: (dialogContext) => UserGroupFormModal(
        userGroupsCubit: userGroupsCubit,
        translation: translation,
        parentUserGroupId: parentUserGroupId,
        onSuccess: (message) => context.getBloc.appScaffold.addBanner(
          DSBanner.success(message, source: 'user_groups_form_success'),
        ),
      ),
    );
  }

  void _showEditUserGroupForm(BuildContext context, UserGroupModel userGroup) {
    final userGroupsCubit = context.read<UserGroupsCubit>();
    final translation = context.getState.commonTranslation.ensuredData;

    showDialog<void>(
      context: context,
      builder: (dialogContext) => UserGroupEditFormModal(
        userGroupId: userGroup.id,
        userGroupsCubit: userGroupsCubit,
        translation: translation,
        existingUsers: [],
        onSuccess: (message) => context.getBloc.appScaffold.addBanner(
          DSBanner.success(message, source: 'user_groups_form_success'),
        ),
      ),
    );
  }

  List<List<Widget>> _buildRows(List<UserGroupModel> userGroups, CommonTranslation translation) {
    final rows = <List<Widget>>[];

    void addGroupRows(UserGroupModel group, int depth) {
      rows.add([
        _UserGroupNameCell(
          userGroup: group,
          depth: depth,
          isExpanded: _expandedGroupIds.contains(group.id),
          onToggleExpanded: () {
            setState(() {
              if (!_expandedGroupIds.remove(group.id)) {
                _expandedGroupIds.add(group.id);
              }
            });
          },
        ),
        _UserGroupActionsCell(
          userGroup: group,
          translation: translation,
          onAddChild: () => _showCreateUserGroupForm(context, parentUserGroupId: group.id),
          onEdit: () => _showEditUserGroupForm(context, group),
        ),
      ]);
      if (_expandedGroupIds.contains(group.id)) {
        for (final child in group.children) {
          addGroupRows(child, depth + 1);
        }
      }
    }

    for (final group in userGroups) {
      addGroupRows(group, 0);
    }

    return rows;
  }

  DTTableLabels _buildTableLabels(CommonTranslation translation) {
    return DTTableLabels(
      noDataFound: translation.NO_RESULTS_FOUND,
      todo: translation.TODO,
      started: translation.STARTED,
      halfway: translation.HALFWAY,
      almostDone: translation.ALMOST_DONE,
      finished: translation.FINISHED,
      normal: translation.NORMAL,
      high: translation.HIGH,
      urgent: translation.URGENT,
      published: translation.PUBLISHED,
      unpublished: translation.UNPUBLISHED,
      draft: translation.DRAFT,
      copy: translation.COPY,
      copyToClipboard: translation.COPY_TO_CLIPBOARD,
      trueLabel: translation.TRUE,
      falseLabel: translation.FALSE,
      currentPeriodLabel: translation.CURRENT_PERIOD,
    );
  }
}

class _UserGroupActionsCell extends StatelessWidget {
  final UserGroupModel userGroup;
  final CommonTranslation translation;
  final VoidCallback onAddChild;
  final VoidCallback onEdit;

  const _UserGroupActionsCell({
    required this.userGroup,
    required this.translation,
    required this.onAddChild,
    required this.onEdit,
  });

  @override
  Widget build(BuildContext context) {
    void deleteUserGroup() async {
      final shouldDelete = await AppConfirmDialog.showDelete(context);
      if (shouldDelete == true && context.mounted) {
        context.read<UserGroupsCubit>().deleteUserGroup(userGroup.id);
      }
    }

    void showUserList() {
      final userGroupsCubit = context.read<UserGroupsCubit>();

      showDialog<void>(
        context: context,
        builder: (context) => UserGroupUserListModal(
          userGroup: userGroup,
          translation: translation,
          userGroupsCubit: userGroupsCubit,
        ),
      );
    }

    return SizedBox(
      width: double.infinity,
      child: Align(
        alignment: Alignment.centerRight,
        child: DTActionCell(
          children: [
            if (userGroup.canCreateChildren)
              DTCommonButtons.action(
                icon: PhosphorIconsThin.plus,
                semanticLabel: translation.ADD,
                onPressed: onAddChild,
              ),
            DTCommonButtons.action(
              icon: PhosphorIconsThin.user,
              semanticLabel: translation.USERS,
              onPressed: showUserList,
            ),
            if (userGroup.canEdit) ...[
              DTCommonButtons.action(
                icon: PhosphorIconsThin.pen,
                semanticLabel: translation.EDIT,
                onPressed: onEdit,
              ),
              DTCommonButtons.negativeAction(
                icon: PhosphorIconsThin.trash,
                semanticLabel: translation.DELETE,
                onPressed: deleteUserGroup,
              ),
            ],
          ],
        ),
      ),
    );
  }
}

class _UserGroupNameCell extends StatelessWidget {
  final UserGroupModel userGroup;
  final int depth;
  final bool isExpanded;
  final VoidCallback onToggleExpanded;

  const _UserGroupNameCell({
    required this.userGroup,
    required this.depth,
    required this.isExpanded,
    required this.onToggleExpanded,
  });

  @override
  Widget build(BuildContext context) {
    final hasChildren = userGroup.children.isNotEmpty;

    return Row(
      children: [
        SizedBox(width: depth * 24),
        SizedBox(
          width: 28,
          height: 24,
          child: hasChildren
              ? IconButton(
                  padding: EdgeInsets.zero,
                  visualDensity: VisualDensity.compact,
                  icon: Icon(
                    isExpanded ? PhosphorIconsThin.caretDown : PhosphorIconsThin.caretRight,
                    size: 16,
                  ),
                  onPressed: onToggleExpanded,
                )
              : const SizedBox.shrink(),
        ),
        Expanded(
          child: SelectableText(
            userGroup.name,
            maxLines: 3,
            minLines: 1,
            style: CoporTheme.of(context).text.tableCell,
          ),
        ),
      ],
    );
  }
}
