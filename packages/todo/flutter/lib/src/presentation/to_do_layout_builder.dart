import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:copor_todo/src/data/model/todo_model.dart';
import 'package:copor_todo/src/data/model/translation/todo_translation.dart';
import 'package:copor_todo/src/presentation/modals/todo_details_dialog.dart';
import 'package:copor_todo/src/presentation/widgets/todo_progress_line.dart';
import 'package:flutter/material.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_bloc.dart';
import 'package:copor_core/src/config/dependency_injection.dart';

// ─── Display mappers ──────────────────────────────────────────────────────────

DTPriority _toPriority(String id) => switch (id.toUpperCase()) {
  'HIGH' => DTPriority.high,
  'URGENT' => DTPriority.urgent,
  _ => DTPriority.normal,
};

String _progressLabel(String progress, TodoPageTranslation translation) =>
    switch (progress.toUpperCase()) {
      'STARTED' => translation.STARTED,
      'HALF_WAY' => translation.HALFWAY,
      'ALMOST_DONE' => translation.ALMOST_DONE,
      'FINISHED' => translation.FINISHED,
      _ => translation.TODO,
    };

// ─── Layout builder ───────────────────────────────────────────────────────────

class ToDoLayoutBuilder extends StatelessWidget {
  final TodoPageTranslation translation;
  final List<TodoModel> todoList;
  final List<DTColumnHeader> columns;
  final String? activeSortKey;
  final String? activeSortDir;
  final TextEditingController searchController;
  final ValueChanged<String> onSearchChanged;
  final VoidCallback onAdd;
  final VoidCallback onFilter;
  final VoidCallback onSort;
  final void Function(BuildContext ctx, String id, String type) onEdit;
  final Future<void> Function(BuildContext ctx, String id, String type) onDelete;
  final ValueChanged<String> onChat;
  final void Function(String sortKey, String? order) onSortClicked;
  final String currentUserId;

  const ToDoLayoutBuilder({
    super.key,
    required this.translation,
    required this.todoList,
    required this.columns,
    required this.searchController,
    required this.onSearchChanged,
    required this.onAdd,
    required this.onFilter,
    required this.onSort,
    required this.onEdit,
    required this.onDelete,
    required this.onChat,
    required this.onSortClicked,
    required this.currentUserId,
    this.activeSortKey,
    this.activeSortDir,
  });

  @override
  Widget build(BuildContext context) {
    final languageCode = getIt<ConfigBloc>().state.result?.data.language.code ?? 'en';

    return LayoutBuilder(
      builder: (ctx, _) {
        final isMobile = ctx.isMobile;

        final rows = todoList
            .map(
              (TodoModel todo) => <Widget>[
                _TodoDescriptionCell(
                  todo: todo,
                  currentUserId: currentUserId,
                  translation: translation,
                  selectable: !isMobile,
                ),
                DTPriorityCell(priority: _toPriority(todo.priority.id)),
                TodoProgressLine(
                  label: _progressLabel(todo.progress, translation),
                  progress: todo.progress,
                ),
                DTDateTimeCell(date: todo.deadline, showWeekday: true, languageCode: languageCode),
                DTActionCell(
                  children: [
                    if (todo.attachmentList.isNotEmpty)
                      Tooltip(
                        message: translation.THIS_ITEM_INCLUDES_ATTACHMENT,
                        child: Semantics(
                          button: true,
                          child: Padding(
                            padding: const EdgeInsets.only(right: 2),
                            child: Icon(PhosphorIconsThin.paperclip, size: 20),
                          ),
                        ),
                      ),
                    if (todo.creatorId != null &&
                        todo.creatorId!.isNotEmpty &&
                        todo.creatorId != currentUserId)
                      DTCommonButtons.action(
                        icon: DTIcons.message,
                        semanticLabel: 'Chat',
                        onPressed: () => onChat(todo.creatorId!),
                      ),
                    DTCommonButtons.edit(
                      semanticLabel: 'Edit',
                      onPressed: () => onEdit(ctx, todo.id, todo.type),
                    ),
                    DTCommonButtons.delete(
                      semanticLabel: 'Delete',
                      onPressed: () => onDelete(ctx, todo.id, todo.type),
                    ),
                  ],
                ),
              ],
            )
            .toList();

        final toolbar = _TodoToolbar(
          translation: translation,
          searchController: searchController,
          onSearchChanged: onSearchChanged,
          onAdd: onAdd,
          onFilter: onFilter,
          onSort: onSort,
        );

        final labels = DTTableLabels(
          noDataFound: translation.EMPTY_TODO_LIST_MESSAGE,
          todo: translation.TODO,
          started: translation.STARTED,
          halfway: translation.HALFWAY,
          almostDone: translation.ALMOST_DONE,
          finished: translation.FINISHED,
          normal: translation.NORMAL,
          high: translation.HIGH,
          urgent: translation.URGENT,
          published: '',
          unpublished: '',
          draft: '',
          copy: '',
          copyToClipboard: '',
          trueLabel: '',
          falseLabel: '',
          currentPeriodLabel: '',
        );

        final noData = Center(
          child: DTEmptyState(
            icon: DTIcons.emptyList,
            title: translation.EMPTY_TODO_LIST_MESSAGE,
            subtitle: translation.CREATE_FIRST_TODO_MESSAGE,
          ),
        );

        return DSPageWrapper(
          isMobile: isMobile,
          children: [
            toolbar,
            const SizedBox(height: 12),
            DTTable(
              headers: columns,
              rows: rows,
              noData: noData,
              labels: labels,
              isMobile: isMobile,
              activeSortKey: activeSortKey,
              activeSortDir: activeSortDir,
              onSortClicked: onSortClicked,
              onRowTap: (index) => showTodoDetailsDialog(
                ctx,
                todoList[index],
                translation,
              ),
              dataRowMinHeight: 80,
              dataCellAlignment: Alignment.topLeft,
              minWidth: 500,
              rowHoverColor: CoporColors.of(context).surfaceHovered,
            ),
          ],
        );
      },
    );
  }
}

// ─── Toolbar ──────────────────────────────────────────────────────────────────

class _TodoDescriptionCell extends StatelessWidget {
  final TodoModel todo;
  final String currentUserId;
  final TodoPageTranslation translation;
  final bool selectable;

  const _TodoDescriptionCell({
    required this.todo,
    required this.currentUserId,
    required this.translation,
    required this.selectable,
  });

  String? get _attribution {
    if (todo.type == TodoType.private) return null;

    if (todo.creatorId == currentUserId) return null;
    final name = todo.creatorName?.trim();
    if (name == null || name.isEmpty) return null;

    return '${translation.CREATED_BY} $name';
  }

  @override
  Widget build(BuildContext context) {
    final attribution = _attribution;
    if (attribution == null) {
      return DTTextCell(text: todo.title, selectable: selectable);
    }

    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        DTTextCell(text: todo.title, selectable: selectable),
        Text(attribution, style: CoporTextStyles.of(context).bodyLight),
      ],
    );
  }
}

class _TodoToolbar extends StatelessWidget {
  final TodoPageTranslation translation;
  final TextEditingController searchController;
  final ValueChanged<String> onSearchChanged;
  final VoidCallback onAdd;
  final VoidCallback onFilter;
  final VoidCallback onSort;

  const _TodoToolbar({
    required this.translation,
    required this.searchController,
    required this.onSearchChanged,
    required this.onAdd,
    required this.onFilter,
    required this.onSort,
  });

  @override
  Widget build(BuildContext context) {
    if (context.isMobile) {
      return Row(
        mainAxisSize: MainAxisSize.max,
        children: [
          Row(
            children: [
              DTButton.surface(
                icon: DTIcons.filter,
                label: '',
                semanticLabel: translation.FILTER_BY,
                onPressed: onFilter,
                inputSize: DTInputSize.compact,
              ),
              const SizedBox(width: 8),
              DTButton.surface(
                icon: DTIcons.sort,
                label: '',
                semanticLabel: translation.SORT_BY,
                onPressed: onSort,
                inputSize: DTInputSize.compact,
              ),
            ],
          ),
          const SizedBox(width: 8),
          Expanded(
            child: DTSearchBar(
              title: translation.SEARCH_TO_DO,
              controller: searchController,
              onSearchChanged: onSearchChanged,
            ),
          ),
          const SizedBox(width: 8),
          DTButton.primary(
            icon: DTIcons.add,
            label: '',
            semanticLabel: translation.ADD,
            inputSize: DTInputSize.compact,
            onPressed: onAdd,
          ),
        ],
      );
    }

    return Row(
      children: [
        DTButton.surface(icon: DTIcons.filter, label: translation.FILTER_BY, onPressed: onFilter),
        const SizedBox(width: 8),
        Expanded(
          child: DTSearchBar(
            title: translation.SEARCH_TO_DO,
            controller: searchController,
            onSearchChanged: onSearchChanged,
          ),
        ),
        const SizedBox(width: 8),
        DTButton.primary(
          icon: DTIcons.add,
          label: translation.ADD,
          semanticLabel: translation.ADD,
          onPressed: onAdd,
        ),
      ],
    );
  }
}
