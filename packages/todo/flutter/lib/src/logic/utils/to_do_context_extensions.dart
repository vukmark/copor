import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_todo/src/data/model/translation/todo_translation.dart';
import 'package:copor_todo/src/logic/to_do_form/to_do_form_bloc.dart';
import 'package:copor_todo/src/logic/to_do_form/to_do_form_state.dart';
import 'package:copor_todo/src/logic/to_do_list/todo_list_bloc.dart';
import 'package:copor_todo/src/logic/to_do_list/todo_list_state.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

// ToDo's shortcuts on the core context accessors (`context.getBloc.todo`, …),
// kept in the module so core doesn't import ToDo.
extension ToDoGetBloc on GetBloc {
  TranslationBloc<TodoPageTranslation> get toDoTranslation => context.read<TranslationBloc<TodoPageTranslation>>();

  TodoListBloc get todo => context.read<TodoListBloc>();

  TodoFormBloc get todoForm => context.read<TodoFormBloc>();
}

extension ToDoWatchState on WatchState {
  TranslationState<TodoPageTranslation> get todoTranslation =>
      context.watch<TranslationBloc<TodoPageTranslation>>().state;

  TodoListState get todo => context.watch<TodoListBloc>().state;

  TodoFormState get todoForm => context.watch<TodoFormBloc>().state;
}

extension ToDoGetState on GetState {
  TranslationState<TodoPageTranslation> get todoTranslation =>
      context.read<TranslationBloc<TodoPageTranslation>>().state;

  TodoListState get todo => context.read<TodoListBloc>().state;

  TodoFormState get todoForm => context.read<TodoFormBloc>().state;
}
