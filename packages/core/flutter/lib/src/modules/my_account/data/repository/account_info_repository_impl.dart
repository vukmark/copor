import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/modules/my_account/data/model/account_info_model.dart';
import 'package:copor_core/src/modules/my_account/data/model/update_account_info_dto.dart';
import 'package:copor_core/src/modules/my_account/data/repository/account_info_repository.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:dio/dio.dart';

class AccountInfoRepositoryImpl extends BaseRepository implements AccountInfoRepository {
  final AccountInfoLocalDataSource localDataSource;
  final AccountInfoRemoteDataSource remoteDataSource;

  AccountInfoRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<AccountInfoModel>>> getMyAccountInfo() async {
    return performOperationAndMapToResult<AccountInfoModel>(
      localOperation: () {
        return performLocalStorageOperation<AccountInfoModel>(localDataSource.getAccountInfo);
      },
      remoteOperation: () {
        return performNetworkOperation<AccountInfoModel>(() async {
          final accountModel = await remoteDataSource.getMyAccountInfo();
          await localDataSource.setAccountInfo(accountModel);
          return accountModel;
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<AccountInfoModel>>> getAccountInfo(String userId) async {
    return performOperationAndMapToResult<AccountInfoModel>(
      remoteOperation: () {
        return performNetworkOperation<AccountInfoModel>(() async {
          return await remoteDataSource.getAccountInfo(userId);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> updateAccountInfo(UpdateAccountInfoDTO updateData) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.updateAccountInfo(updateData);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> uploadPersonalImage(MediaFileModel file) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          final multipartFile = MultipartFile.fromBytes(file.bytes, filename: file.name);
          await remoteDataSource.uploadPersonalImage(multipartFile);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> uploadUserImage(MediaFileModel file, String userId) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          final multipartFile = MultipartFile.fromBytes(file.bytes, filename: file.name);
          await remoteDataSource.uploadUserImage(multipartFile, userId);
        });
      },
    );
  }

  @override
  Future<Either<Failure, void>> clearLocalCache() {
    return performLocalStorageOperation<void>(localDataSource.clearAccountInfo);
  }
}
