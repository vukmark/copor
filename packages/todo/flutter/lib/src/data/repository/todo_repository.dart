import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_model/filter_model.dart';
import 'package:copor_todo/src/data/model/create_todo_dto.dart';
import 'package:copor_todo/src/data/model/todo_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:dio/dio.dart';
import 'dart:typed_data';
import 'package:retrofit/retrofit.dart';

abstract class TodoRepository {
  Future<Either<Failure, Result<TodoModel>>> getTodo(String todoId, String todoType);
  Future<Either<Failure, Result<MediaFileModel>>> getAttachment(String attachmentId);
  Future<Either<Failure, Result<void>>> updateTodo(CreateToDoDTO todoToUpdate);
  Future<Either<Failure, Result<void>>> createTodo(
    CreateToDoDTO todoToCreate, {
    List<MediaFileModel> attachments = const [],
  });
  Future<Either<Failure, Result<void>>> deleteTodo(String todoId, String todoType);
  Future<Either<Failure, Result<List<TodoModel>>>> getTodoList(FilterListDTO filterList);
  Future<Either<Failure, Result<List<FilterModel>>>> getTodoFilterList();
}

abstract class TodoLocalDataSource {
  Future<List<TodoModel>> getTodoList();
  Future<void> setTodoList(List<TodoModel> todoList);
}

abstract class TodoRemoteDataSource {
  Future<dynamic> createTodo(CreateToDoDTO todoToCreate);
  Future<void> createAttachment(String todoId, MultipartFile attachment);
  Future<void> deleteTodo(String todoId, String todoType);
  Future<void> updateTodo(CreateToDoDTO todoToUpdate);
  Future<List<TodoModel>> getTodoList(FilterListDTO filterList);
  Future<TodoModel> getTodo(String todoId, String todoType);
  Future<HttpResponse<Uint8List>> getAttachment(String attachmentId);
  Future<List<FilterModel>> getTodoFilterList();
}
