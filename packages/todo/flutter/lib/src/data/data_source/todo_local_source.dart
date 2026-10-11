import 'package:copor_core/src/data/data_source/base_local_data_source.dart';
import 'package:copor_todo/src/data/model/todo_model.dart';
import 'package:copor_todo/src/data/repository/todo_repository.dart';
import 'package:copor_core/src/utils/typedef.dart';

class TodoLocalDataSourceImpl extends BaseListLocalDataSource<TodoModel>
    implements TodoLocalDataSource {
  TodoLocalDataSourceImpl({required super.sharedPreferences, required super.keyGenerator});

  @override
  Future<List<TodoModel>> getTodoList() async {
    return await getData(TodoModel.namespaceStatic, null);
  }

  @override
  Future<void> setTodoList(List<TodoModel> modelList) async {
    return await saveData(modelList, null);
  }

  @override
  TodoModel fromJsonSingle(JSON json) {
    return TodoModel.fromJson(json);
  }

  @override
  JSON toJsonSingle(TodoModel model) {
    return model.toJson();
  }
}
