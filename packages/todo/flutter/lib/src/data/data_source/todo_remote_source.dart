import 'dart:typed_data';

import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_model/filter_model.dart';
import 'package:copor_todo/src/data/model/create_todo_dto.dart';
import 'package:copor_todo/src/data/model/todo_model.dart';
import 'package:copor_todo/src/data/repository/todo_repository.dart';
import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

part 'todo_remote_source.g.dart';

@RestApi()
abstract class TodoRemoteDataSourceImpl implements TodoRemoteDataSource {
  factory TodoRemoteDataSourceImpl(Dio dio, {String baseUrl}) = _TodoRemoteDataSourceImpl;

  @override
  @POST('/todo/get-all-for-user')
  Future<List<TodoModel>> getTodoList(@Body() FilterListDTO filterList);

  @override
  @GET('/todo/{id}/{type}')
  Future<TodoModel> getTodo(@Path('id') String todoId, @Path('type') String type);

  @override
  @GET('/todo/attachment/{id}')
  @DioResponseType(ResponseType.bytes)
  Future<HttpResponse<Uint8List>> getAttachment(@Path('id') String attachmentId);

  @override
  @PATCH('/todo')
  Future<void> updateTodo(@Body() CreateToDoDTO todoToUpdate);

  @override
  @POST('/todo')
  Future<dynamic> createTodo(@Body() CreateToDoDTO todoToCreate);

  @override
  @POST('/todo/attachment/{id}')
  @MultiPart()
  Future<void> createAttachment(
    @Path('id') String todoId,
    @Part(name: 'file') MultipartFile attachment,
  );

  @override
  @DELETE('/todo/{id}/{type}')
  Future<void> deleteTodo(@Path('id') String todoId, @Path('type') String todoType);

  @override
  @GET('/todo/filter')
  Future<List<FilterModel>> getTodoFilterList();
}
