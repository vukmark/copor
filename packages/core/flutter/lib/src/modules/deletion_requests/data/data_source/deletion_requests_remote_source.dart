import 'package:copor_core/src/modules/deletion_requests/data/repository/deletion_requests_repository.dart';
import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

part 'deletion_requests_remote_source.g.dart';

@RestApi()
abstract class DeletionRequestsRemoteDataSourceImpl implements DeletionRequestsRemoteDataSource {
  factory DeletionRequestsRemoteDataSourceImpl(Dio dio, {String? baseUrl}) =
      _DeletionRequestsRemoteDataSourceImpl;

  @override
  @PATCH('/user/deletion-requests')
  Future<void> requestAccountDeletion();

  @override
  @DELETE('/user/deletion-requests')
  Future<void> cancelAccountDeletion();
}
