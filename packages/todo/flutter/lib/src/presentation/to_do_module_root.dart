import 'package:copor_todo/src/logic/utils/to_do_context_extensions.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/bloc/utils/bloc_state_conditions.dart';
import 'package:copor_core/src/components/dialogs/app_confirm_dialog.dart';
import 'package:copor_core/src/data/model/filter/bloc/filter_bloc.dart';
import 'package:copor_core/src/data/model/filter/bloc/filter_event.dart';
import 'package:copor_core/src/data/model/filter/presentation/utils/filter_utils.dart';
import 'package:copor_core/src/data/model/filter/presentation/utils/search_handler.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_todo/src/config/to_do_routes.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:copor_todo/src/presentation/modals/to_do_filter_sheet.dart';
import 'package:copor_todo/src/logic/to_do_list/todo_list_bloc.dart';
import 'package:copor_todo/src/logic/utils/to_do_bloc_event_dispatcher.dart';
import 'package:copor_todo/src/data/model/translation/todo_translation.dart';
import 'package:copor_todo/src/presentation/to_do_layout_builder.dart';
import 'package:copor_vu_meet/src/logic/utils/vu_meet_bloc_event_dispatcher.dart';
import 'package:copor_vu_meet/src/config/vu_meet_routes.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_list/chat_list_bloc.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_list/chat_list_state.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:copor_core/src/utils/helper_functions.dart'
    show currentUserId;

class ToDoModuleRoot extends HookWidget {
  const ToDoModuleRoot({super.key});

  @override
  Widget build(BuildContext context) {
    final search = useMemoized(() => setupSearchHandler(context));

    final todoListState = context.watch<TodoListBloc>().state;
    final translationState = context.watch<TranslationBloc<TodoPageTranslation>>().state;
    final filterState = context.watch<FilterBloc>().state;
    final userId = currentUserId(context);

    if (BlocStateConditions.hasInitialStates([todoListState, translationState, filterState])) {
      return const SizedBox.shrink();
    }

    final todoList = todoListState.ensuredData;
    final translation = translationState.ensuredData;

    Future<void> handleDelete(BuildContext ctx, String id, String type) async {
      final confirmed = await AppConfirmDialog.showDelete(ctx);
      if (confirmed == true && ctx.mounted) {
        TodoBlocEventDispatcher.toDo.deleteTodo(ctx.getBloc.todo, id, type);
      }
    }

    void goToEdit(BuildContext ctx, [String? id, String? type]) {
      if (id != null && type != null) {
        goToPage(ToDoRoutes.getEditExistingUri(id, type));
      } else {
        goToPage(ToDoRoutes.todoEditNew);
      }
    }

    final columns = [
      DTColumnHeader(
        key: 'title',
        name: translation.DESCRIPTION,
        size: DTColumnSize.col9,
        sortKey: 'SORT_BY_TITLE',
      ),
      DTColumnHeader(
        key: 'priority',
        name: translation.PRIORITY,
        size: DTColumnSize.col6,
        sortKey: 'SORT_BY_PRIORITY',
        defaultSortDir: 'asc',
      ),
      DTColumnHeader(
        key: 'progress',
        name: translation.PROGRESS,
        size: DTColumnSize.col4,
        sortKey: 'SORT_BY_PROGRESS',
      ),
      DTColumnHeader(
        key: 'deadline',
        name: translation.DUE_DATE,
        size: DTColumnSize.col5,
        sortKey: 'SORT_BY_DUE_DATE',
      ),
      DTColumnHeader(
        name: translation.ACTIONS,
        fixedWidth: 110,
        alignment: DTColumnAlignment.right,
      ),
    ];

    final sort = deriveSortState(columns, filterState.appliedFilters);

    if (filterState.defaultSortKey == null && sort.effectiveSortKey != null) {
      context.read<FilterBloc>().add(
        SetDefaultSort(
          defaultSortKey: sort.effectiveSortKey,
          defaultSortDir: sort.effectiveSortDir,
        ),
      );
    }

    void handleSort(String sortKey, String? order) {
      context.read<FilterBloc>().add(
        ApplyFilters(
          nextFiltersAfterSortClick(
            headers: columns,
            currentAppliedFilters: filterState.appliedFilters,
            sortKey: sortKey,
            order: order,
          ),
        ),
      );
    }

    return BlocListener<ChatListBloc, ChatListState>(
      listenWhen: (previous, current) => current is ChatCreationSuccessState,
      listener: (context, state) {
        final chatId = (state as ChatCreationSuccessState).newChatId;
        VuMeetDispatcher.chatList.setSelectedChat(chatId);
        goToPage(VuMeetRoutes.getChatUri(chatId));
      },
      child: ToDoLayoutBuilder(
        translation: translation,
        todoList: todoList,
        columns: columns,
        activeSortKey: sort.activeSortKey,
        activeSortDir: sort.activeSortDir,
        searchController: search.controller,
        onSearchChanged: search.onSearchChanged,
        onAdd: () => goToEdit(context),
        onFilter: () => showToDoFilterSheet(context),
        onSort: () => FilterUtils.showSortUI(context),
        onEdit: goToEdit,
        onDelete: handleDelete,
        onChat: (creatorId) => VuMeetDispatcher.chatList.createChat([creatorId]),
        currentUserId: userId,
        onSortClicked: handleSort,
      ),
    );
  }
}
