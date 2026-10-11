import 'package:copor_core/src/bloc/utils/bloc_listeners.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/core/module/module_search_section.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/modules/search/components/search_section.dart';
import 'package:copor_core/src/modules/search/config/search_keys.dart';
import 'package:copor_core/src/modules/search/data/model/translation/search_translation.dart';
import 'package:copor_todo/src/config/to_do_keys.dart';
import 'package:copor_todo/src/data/model/todo_model.dart';
import 'package:copor_todo/src/logic/to_do_list/todo_list_bloc.dart';
import 'package:copor_todo/src/logic/to_do_list/todo_list_event.dart';
import 'package:copor_todo/src/logic/to_do_list/todo_list_state.dart';
import 'package:copor_todo/src/presentation/search/todo_search_card.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:provider/single_child_widget.dart';

/// ToDo results on the core Search page.
class ToDoSearchSection extends ModuleSearchSection {
  const ToDoSearchSection();

  @override
  int get order => 10;

  @override
  List<SingleChildWidget> providers(BuildContext context) => [
    BlocProvider<TodoListBloc>(create: (context) => getIt<TodoListBloc>()),
  ];

  @override
  List<SingleChildWidget> listeners() => [
    LoadingListener<TodoListBloc, TodoListState>(loadingKey: SearchKeys.searchPageLoading),
    FailureListener<TodoListBloc, TodoListState>(failureKey: TodoKeys.searchToDoListFailure),
  ];

  @override
  void search(BuildContext context, FilterListDTO filters) {
    context.read<TodoListBloc>().add(GetTodoList(filters));
  }

  @override
  bool hasResults(BuildContext context) =>
      context.watch<TodoListBloc>().state.result?.data.isNotEmpty ?? false;

  @override
  Widget buildSection(BuildContext context, String query, SearchPageTranslation translation) =>
      _ToDoSearchResults(query: query, translation: translation);
}

class _ToDoSearchResults extends HookWidget {
  static const initialLimit = 3;
  static const increment = 3;

  final String query;
  final SearchPageTranslation translation;

  const _ToDoSearchResults({required this.query, required this.translation});

  @override
  Widget build(BuildContext context) {
    final todos = context.watch<TodoListBloc>().state.result?.data ?? <TodoModel>[];
    final shownCount = useState(initialLimit);
    final todosToShow = todos.take(shownCount.value).toList();

    return SearchSection(
      title: translation.TO_DO,
      icon: PhosphorIconsThin.listChecks,
      translation: translation,
      items: todosToShow
          .map((todo) => TodoSearchCard(todo: todo, highlight: query, translation: translation))
          .toList(),
      currentItemCount: todosToShow.length,
      totalItemCount: todos.length,
      initialLimit: initialLimit,
      onShowMore: () => shownCount.value += increment,
      onShowLess: () => shownCount.value = initialLimit,
    );
  }
}
