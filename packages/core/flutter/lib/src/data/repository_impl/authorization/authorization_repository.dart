import 'package:copor_core/src/data/model/authorization/authorization_tokens_model.dart';
import 'package:copor_core/src/data/model/authorization/change_password_model.dart';
import 'package:copor_core/src/data/model/authorization/login_credentials_model.dart';
import 'package:dartz/dartz.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

abstract class AuthorizationRepository {
  Future<Either<Failure, void>> logout();
  Future<Either<Failure, void>> login(LoginCredentialsModel loginParams);
  Future<Either<Failure, Result<AuthorizationTokensModel>>> getTokens();
  Future<Either<Failure, void>> changePassword(ChangePasswordModel changePasswordData);
}
