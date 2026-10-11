import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/tag/data/model/tag_model.dart';
import 'package:copor_core/src/modules/administration/tag/data/model/create_tag_dto.dart';
import 'package:copor_core/src/modules/administration/tag/data/repository/tag_repository.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

class TagRepositoryImpl extends BaseRepository implements TagRepository {
  final TagRemoteDataSource remoteDataSource;
  final TagLocalDataSource localDataSource;

  TagRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<List<TagModel>>>> getPublicTagList(FilterListDTO filterList) async {
    return performOperationAndMapToResult<List<TagModel>>(
      localOperation: () async {
        return performLocalStorageOperation<List<TagModel>>(() async {
          final localTagList = await localDataSource.getPublicTagList();
          return localTagList;
        });
      },
      remoteOperation: () async {
        return performNetworkOperation<List<TagModel>>(() async {
          final tagList = await remoteDataSource.getPublicTagList(filterList);
          await localDataSource.setPublicTagList(tagList);
          return tagList;
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<List<TagModel>>>> getPrivateTagList() async {
    return performOperationAndMapToResult<List<TagModel>>(
      remoteOperation: () async {
        return performNetworkOperation<List<TagModel>>(() async {
          final tagList = await remoteDataSource.getPrivateTagList();
          return tagList;
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<List<TagModel>>>> getAllTagsForUser() async {
    return performOperationAndMapToResult<List<TagModel>>(
      remoteOperation: () async {
        return performNetworkOperation<List<TagModel>>(() async {
          final tagList = await remoteDataSource.getAllTagsForUser();
          return tagList;
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<TagModel>>> getTag(String tagId) async {
    return performOperationAndMapToResult<TagModel>(
      remoteOperation: () async {
        return performNetworkOperation<TagModel>(() async {
          final tag = await remoteDataSource.getTag(tagId);
          return tag;
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> deleteTag(String tagId) {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.deleteTag(tagId);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> createTag(CreateTagDTO tagToCreate) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.createTag(tagToCreate);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> updateTag(CreateTagDTO tagToUpdate) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.updateTag(tagToUpdate);
        });
      },
    );
  }
}
