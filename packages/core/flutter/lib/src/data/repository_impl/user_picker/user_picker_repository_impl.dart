import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_model_dto.dart';
import 'package:copor_core/src/data/model/user_picker/user_picker_item_model.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/data/repository_impl/user_picker/user_picker_repository.dart';
import 'package:copor_core/src/error/failure.dart';

abstract class UserPickerRemoteDataSource {
  Future<dynamic> searchUsers(String path, FilterListDTO request);
}

class UserPickerRepositoryImpl extends BaseRepository implements UserPickerRepository {
  static const int pageSize = 20;

  final UserPickerRemoteDataSource remoteDataSource;

  UserPickerRepositoryImpl({
    required this.remoteDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<List<UserPickerItemModel>>>> searchUsers(
    String path,
    String query, {
    int offset = 0,
  }) async {
    final requestDTO = FilterListDTO(
      filterList: [
        FilterModelDTO(name: 'SEARCH', values: [query]),
      ],
      limit: '$pageSize',
      offset: '$offset',
    );

    return performOperationAndMapToResult(
      remoteOperation: () async {
        return performNetworkOperation<List<UserPickerItemModel>>(() async {
          final response = await remoteDataSource.searchUsers(path, requestDTO) as Map<String, dynamic>;
          final items = response['items'] as List<dynamic>? ?? const [];
          return items
              .map((item) => UserPickerItemModel.fromJson(item as Map<String, dynamic>))
              .toList();
        });
      },
    );
  }
}
