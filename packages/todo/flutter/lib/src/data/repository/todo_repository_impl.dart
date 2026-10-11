import 'dart:typed_data';

import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_model/filter_model.dart';
import 'package:copor_todo/src/data/model/create_todo_dto.dart';
import 'package:copor_todo/src/data/model/todo_model.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_todo/src/data/repository/todo_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/data/model/media_file/mime_type.dart';
import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

class TodoRepositoryImpl extends BaseRepository implements TodoRepository {
  final TodoRemoteDataSource remoteDataSource;
  final TodoLocalDataSource localDataSource;

  TodoRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<void>>> deleteTodo(String todoId, String todoType) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.deleteTodo(todoId, todoType);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> createTodo(
    CreateToDoDTO todoToCreate, {
    List<MediaFileModel> attachments = const [],
  }) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          final response = await remoteDataSource.createTodo(todoToCreate);
          if (attachments.isEmpty) return;

          final todoId = _createdTodoId(response);
          for (final attachment in attachments) {
            await remoteDataSource.createAttachment(
              todoId,
              MultipartFile.fromBytes(attachment.bytes, filename: attachment.name),
            );
          }
        });
      },
    );
  }

  String _createdTodoId(dynamic response) {
    if (response is String && response.isNotEmpty) return response;
    if (response is Map<String, dynamic>) {
      final id = response['id'] ?? response['todoId'];
      if (id is String && id.isNotEmpty) return id;
      final nestedResponse = response['data'] ?? response['result'] ?? response['todo'];
      if (nestedResponse != null) return _createdTodoId(nestedResponse);
    }
    throw const FormatException('The create todo response does not contain a todo id.');
  }

  @override
  Future<Either<Failure, Result<MediaFileModel>>> getAttachment(String attachmentId) async {
    return performOperationAndMapToResult<MediaFileModel>(
      remoteOperation: () async {
        return performNetworkOperation<MediaFileModel>(() async {
          final HttpResponse<Uint8List> response = await remoteDataSource.getAttachment(
            attachmentId,
          );
          final contentDisposition = response.response.headers.value('Content-Disposition');
          final contentType = response.response.headers.value('Content-Type');
          final filename = _attachmentFilename(contentDisposition, attachmentId);
          final extension = filename.contains('.') ? filename.split('.').last.toLowerCase() : '';
          var mimeType = MimeType.fromExtension(extension);
          if (mimeType == MimeType.unknown && contentType != null) {
            mimeType = MimeType.fromValue(contentType.split(';').first.trim());
          }
          if (mimeType == MimeType.unknown) {
            mimeType = MimeType.detectMimeTypeFromBytes(response.data);
          }
          return MediaFileModel.fromData(
            id: attachmentId,
            name: filename,
            type: mimeType,
            bytes: response.data,
            size: response.data.length,
          );
        });
      },
    );
  }

  String _attachmentFilename(String? contentDisposition, String attachmentId) {
    if (contentDisposition != null) {
      final encodedMatch = RegExp("filename\\*=UTF-8''([^;]+)").firstMatch(contentDisposition);
      final regularMatch = RegExp('filename="?([^";]+)"?').firstMatch(contentDisposition);
      final value = encodedMatch?.group(1) ?? regularMatch?.group(1);
      if (value != null && value.isNotEmpty) return Uri.decodeComponent(value);
    }
    return 'todo-attachment-$attachmentId';
  }

  @override
  Future<Either<Failure, Result<void>>> updateTodo(CreateToDoDTO todoToUpdate) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.updateTodo(todoToUpdate);
        });
      },
    );
  }


  @override
  Future<Either<Failure, Result<List<TodoModel>>>> getTodoList(FilterListDTO filterList) async {
    return performOperationAndMapToResult<List<TodoModel>>(
      localOperation: () async {
        return performLocalStorageOperation<List<TodoModel>>(() async {
          final localTodoList = await localDataSource.getTodoList();
          return localTodoList;
        });
      },
      remoteOperation: () async {
        return performNetworkOperation<List<TodoModel>>(() async {
          final todoList = await remoteDataSource.getTodoList(filterList);
          await localDataSource.setTodoList(todoList);
          return todoList;
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<TodoModel>>> getTodo(String todoId, String todoType) async {
    return performOperationAndMapToResult<TodoModel>(
      remoteOperation: () async {
        return performNetworkOperation<TodoModel>(() async {
          final todo = await remoteDataSource.getTodo(todoId, todoType);
          return todo;
        });
      },
    );
  }


  @override
  Future<Either<Failure, Result<List<FilterModel>>>> getTodoFilterList() {
    return performOperationAndMapToResult<List<FilterModel>>(
      remoteOperation: () async {
        return performNetworkOperation<List<FilterModel>>(() async {
          final todoFilterList = await remoteDataSource.getTodoFilterList();
          return todoFilterList;
        });
      },
    );
  }
}
