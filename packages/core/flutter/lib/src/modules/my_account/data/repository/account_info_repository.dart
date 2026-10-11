import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/my_account/data/model/account_info_model.dart';
import 'package:copor_core/src/modules/my_account/data/model/update_account_info_dto.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:dio/dio.dart';

abstract class AccountInfoRepository {
  Future<Either<Failure, Result<AccountInfoModel>>> getMyAccountInfo();
  Future<Either<Failure, Result<AccountInfoModel>>> getAccountInfo(String userId);
  Future<Either<Failure, Result<void>>> updateAccountInfo(UpdateAccountInfoDTO updateData);
  Future<Either<Failure, void>> clearLocalCache();
  Future<Either<Failure, Result<void>>> uploadPersonalImage(MediaFileModel file);
  Future<Either<Failure, Result<void>>> uploadUserImage(MediaFileModel file, String userId);
}

abstract class AccountInfoLocalDataSource {
  Future<AccountInfoModel> getAccountInfo();
  Future<void> setAccountInfo(AccountInfoModel model);
  Future<void> clearAccountInfo();
}

abstract class AccountInfoRemoteDataSource {
  Future<AccountInfoModel> getMyAccountInfo();
  Future<AccountInfoModel> getAccountInfo(String userId);
  Future<void> updateAccountInfo(UpdateAccountInfoDTO updateData);
  Future<void> uploadPersonalImage(MultipartFile image);
  Future<void> uploadUserImage(MultipartFile image, String userId);
}
