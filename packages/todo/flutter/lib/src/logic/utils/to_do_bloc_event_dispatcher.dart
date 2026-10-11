import 'package:copor_todo/src/logic/all_tags_for_user/all_tags_for_user_bloc.dart';
import 'package:copor_todo/src/logic/all_tags_for_user/all_tags_for_user_event.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_todo/src/data/model/translation/todo_translation.dart';
import 'package:copor_todo/src/logic/to_do_form/to_do_form_bloc.dart';
import 'package:copor_todo/src/logic/to_do_form/to_do_form_event.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_event.dart';
import 'package:copor_todo/src/logic/to_do_list/todo_list_bloc.dart';
import 'package:copor_todo/src/logic/to_do_list/todo_list_event.dart';
import 'package:copor_todo/src/data/model/create_todo_dto.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';

class TodoBlocEventDispatcher {
  static _Translation translation = _Translation();
  static _ToDo toDo = _ToDo();
}

class _Translation {
  void getTodoTranslation(TranslationBloc<TodoPageTranslation> bloc, LanguageModel language) {
    bloc.add(
      GetTranslationEvent<TodoPageTranslation>(
        namespace: TodoPageTranslation.namespaceStatic,
        languageModel: language,
        constructor: (translationStringList) =>
            TodoPageTranslation(translationStringList: translationStringList),
      ),
    );
  }
}

class _ToDo {
  void getAllTagsForUser(AllTagsForUserBloc bloc) {
    bloc.add(GetAllTagsForUser());
  }

  void getTodoList(TodoListBloc bloc, FilterListDTO filterList) {
    bloc.add(GetTodoList(filterList));
  }

  void updateTodo(TodoFormBloc bloc, CreateToDoDTO todoToUpdate) {
    bloc.add(UpdateTodo(todoToUpdate));
  }


  void createTodo(
    TodoFormBloc bloc,
    CreateToDoDTO todoItemToCreate, {
    List<MediaFileModel> attachments = const [],
  }) {
    bloc.add(CreateTodo(todoItemToCreate, attachments: attachments));
  }

  void getTodo(TodoFormBloc bloc, String todoId, String todoType) {
    bloc.add(GetTodo(todoId, todoType));
  }

  void deleteTodo(TodoListBloc bloc, String todoId, String todoType) {
    bloc.add(DeleteTodo(todoId, todoType));
  }
}
