import 'package:copor_core/src/data/model/authorization/authorization_tokens_model.dart';
import 'package:copor_core/src/data/model/authorization/change_password_model.dart';
import 'package:copor_core/src/data/model/authorization/login_credentials_model.dart';
import 'package:copor_core/src/data/model/authorization/user_profile_model.dart';
import 'package:copor_core/src/data/repository_impl/authorization/authorization_repository.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:dartz/dartz.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

class AuthorizationRepositoryImpl extends BaseRepository implements AuthorizationRepository {
  final AuthorizationRemoteDataSource remoteDataSource;
  final AuthorizationLocalDataSource localDataSource;

  AuthorizationRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, void>> login(LoginCredentialsModel params) async {
    return performNetworkOperation<AuthorizationTokensModel>(() async {
      final authorizationTokensModel = await remoteDataSource.login(params);
      await localDataSource.stashTokens(authorizationTokensModel);
      return authorizationTokensModel;
    });
  }

  @override
  Future<Either<Failure, void>> changePassword(ChangePasswordModel changePasswordData) async {
    return performNetworkOperation<void>(() async {
      await remoteDataSource.changePassword(changePasswordData);
      return; // OK for void
    });
  }

  @override
  Future<Either<Failure, Result<AuthorizationTokensModel>>> getTokens() async {
    return performOperationAndMapToResult(
      localOperation: () {
        return performLocalStorageOperation<AuthorizationTokensModel>(localDataSource.getTokens);
      },
    );
  }

  @override
  Future<Either<Failure, void>> logout() async {
    return performLocalStorageOperation<void>(() {
      return localDataSource.clearData();
    });
  }

  Future<Either<Failure, void>> stashTokens(AuthorizationTokensModel tokens) async {
    return performOperationAndMapToResult(
      localOperation: () {
        return performLocalStorageOperation<void>(() => localDataSource.stashTokens(tokens));
      },
    );
  }
}

abstract class AuthorizationRemoteDataSource {
  Future<AuthorizationTokensModel> requestNewTokens(String refreshToken);
  Future<AuthorizationTokensModel> login(LoginCredentialsModel loginCredentials);
  Future<UserProfileModel> getUserDetails(String userId);
  Future<void> changePassword(ChangePasswordModel changePasswordData);
}

abstract class AuthorizationLocalDataSource {
  Future<void> clearData();
  Future<void> stashTokens(AuthorizationTokensModel authorizationTokensModel);
  Future<AuthorizationTokensModel> getTokens();
  Stream<AuthorizationTokensModel> getTokensStream();
}
