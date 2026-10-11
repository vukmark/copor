import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_todo/src/config/to_do_routes.dart';
import 'package:copor_todo/src/data/model/todo_model.dart';
import 'package:copor_todo/src/presentation/search/todo_search_translation_utils.dart';
import 'package:copor_core/src/utils/helper_functions.dart';
import 'package:copor_core/src/modules/search/data/model/translation/search_translation.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class TodoSearchCard extends StatefulWidget {
  final TodoModel todo;
  final String highlight;
  final SearchPageTranslation translation;

  const TodoSearchCard({
    super.key,
    required this.todo,
    required this.highlight,
    required this.translation,
  });

  @override
  State<TodoSearchCard> createState() => _TodoSearchCardState();
}

class _TodoSearchCardState extends State<TodoSearchCard> {
  late ScrollController _tagScrollController;

  @override
  void initState() {
    super.initState();
    _tagScrollController = ScrollController();
  }

  @override
  void dispose() {
    _tagScrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    final isMobile = context.isMobile;

    return DTCard.tap(
      onTap: () => goToPage(ToDoRoutes.getEditExistingUri(widget.todo.id, widget.todo.type)),
      child: Padding(
        padding: const EdgeInsets.all(4),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (isMobile) ...[
              Text(widget.todo.title, style: dt.text.bodyStrong, overflow: TextOverflow.ellipsis),
              const SizedBox(height: 8),
              if (widget.todo.deadline != null && widget.todo.deadline!.isNotEmpty) ...[
                _DeadlineChip(deadline: widget.todo.deadline!),
                const SizedBox(height: 8),
              ],
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    _PriorityChip(todo: widget.todo, translation: widget.translation),
                    const SizedBox(width: 6),
                    _ProgressChip(todo: widget.todo, translation: widget.translation),
                  ],
                ),
              ),
            ] else
              Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Expanded(
                    child: Text(
                      widget.todo.title,
                      style: dt.text.bodyStrong,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  const SizedBox(width: 6),
                  _PriorityChip(todo: widget.todo, translation: widget.translation),
                  const SizedBox(width: 6),
                  _ProgressChip(todo: widget.todo, translation: widget.translation),
                  const SizedBox(width: 6),
                  if (widget.todo.deadline != null && widget.todo.deadline!.isNotEmpty)
                    _DeadlineChip(deadline: widget.todo.deadline!),
                ],
              ),
            if (widget.todo.tagList != null && widget.todo.tagList!.isNotEmpty) ...[
              const SizedBox(height: 8),
              Scrollbar(
                controller: _tagScrollController,
                thumbVisibility: true,
                child: SingleChildScrollView(
                  controller: _tagScrollController,
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: widget.todo.tagList!
                        .map(
                          (tag) => Padding(
                            padding: const EdgeInsets.fromLTRB(0, 0, 6, 12),
                            child: DTInfoChip.surface(icon: DTIcons.tag, label: tag.name),
                          ),
                        )
                        .toList(),
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

class _PriorityChip extends StatelessWidget {
  final TodoModel todo;
  final SearchPageTranslation translation;

  const _PriorityChip({required this.todo, required this.translation});

  @override
  Widget build(BuildContext context) {
    final icon = switch (todo.priority.id) {
      'HIGH' => DTIcons.priorityHigh,
      'URGENT' => DTIcons.priorityUrgent,
      _ => DTIcons.priorityNormal,
    };
    return DTInfoChip.surface(icon: icon, label: translatePriority(todo.priority.id, translation));
  }
}

class _ProgressChip extends StatelessWidget {
  final TodoModel todo;
  final SearchPageTranslation translation;

  const _ProgressChip({required this.todo, required this.translation});

  @override
  Widget build(BuildContext context) {
    final icon = switch (todo.progress) {
      'STARTED' => DTIcons.progressStarted,
      'HALF_WAY' => DTIcons.progressHalfway,
      'ALMOST_DONE' => DTIcons.progressAlmostDone,
      'FINISHED' => DTIcons.progressDone,
      _ => DTIcons.progressTodo,
    };
    final isFinished = todo.progress == 'FINISHED';
    return isFinished
        ? DTInfoChip.surface(icon: icon, label: translateProgress(todo.progress, translation))
        : DTInfoChip.surface(icon: icon, label: translateProgress(todo.progress, translation));
  }
}

class _DeadlineChip extends StatelessWidget {
  final String deadline;

  const _DeadlineChip({required this.deadline});

  @override
  Widget build(BuildContext context) {
    try {
      final parsed = DateTime.parse(deadline).toLocal();
      final isToday = isISOToday(parsed);
      final label = isToday
          ? 'Today ${formatISOTime(parsed)}'
          : '${formatISODate(parsed)} ${formatISOTime(parsed)}';
      return isToday
          ? DTInfoChip.error(icon: DTIcons.calendar, label: label)
          : DTInfoChip.surface(icon: DTIcons.calendar, label: label);
    } catch (_) {
      return const SizedBox.shrink();
    }
  }
}
