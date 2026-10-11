import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/data/model/user_picker/user_picker_item_model.dart';
import 'package:copor_core/src/data/repository_impl/user_picker/user_picker_repository_impl.dart';
import 'package:copor_core/src/error/error_handler.dart';
import 'package:copor_core/src/error/failure.dart';

class _FakeRemoteDataSource implements UserPickerRemoteDataSource {
  String? path;
  FilterListDTO? request;
  dynamic response;
  Object? error;

  @override
  Future<dynamic> searchUsers(String path, FilterListDTO request) async {
    this.path = path;
    this.request = request;
    if (error != null) throw error!;
    return response;
  }
}

class _FakeErrorHandler implements ErrorHandler {
  @override
  Failure handle(dynamic error) => Failure(500, error.toString());
}

class _FakeConnectivityService implements ConnectivityService {
  @override
  Future<bool> isConnected() async => true;

  @override
  Stream<bool> get connectivityStream => const Stream.empty();
}

void main() {
  late _FakeRemoteDataSource remoteDataSource;
  late UserPickerRepositoryImpl repository;

  setUp(() {
    remoteDataSource = _FakeRemoteDataSource();
    repository = UserPickerRepositoryImpl(
      remoteDataSource: remoteDataSource,
      errorHandler: _FakeErrorHandler(),
      connectivityService: _FakeConnectivityService(),
    );
  });

  test('posts a SEARCH filter page to the module path and parses the items', () async {
    remoteDataSource.response = {
      'items': [
        {'id': 'user-1', 'fullName': 'Emma Johnson', 'picture': '', 'isActive': true},
        {'id': 'user-2', 'fullName': 'Liam Becker', 'picture': 'liam.png', 'isActive': false},
      ],
      'limit': '20',
      'offset': '40',
    };

    final result = await repository.searchUsers('/cloud/recipients', 'em', offset: 40);

    expect(remoteDataSource.path, '/cloud/recipients');
    expect(jsonDecode(jsonEncode(remoteDataSource.request!.toJson())), {
      'filterList': [
        {'name': 'SEARCH', 'values': ['em']},
      ],
      'limit': '${UserPickerRepositoryImpl.pageSize}',
      'offset': '40',
    });
    expect(result.getOrElse(() => throw StateError('expected users')).data, const [
      UserPickerItemModel(id: 'user-1', fullName: 'Emma Johnson', picture: '', isActive: true),
      UserPickerItemModel(id: 'user-2', fullName: 'Liam Becker', picture: 'liam.png', isActive: false),
    ]);
  });

  test('returns a failure when the request fails', () async {
    remoteDataSource.error = Exception('forbidden');

    final result = await repository.searchUsers('/cloud/recipients', '');

    expect(result.isLeft(), isTrue);
  });
}
