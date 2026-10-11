import 'package:dartz/dartz.dart';
import 'package:copor_core/src/components/password_validation/data/model/password_policy_model.dart';
import 'package:copor_core/src/error/failure.dart';

abstract class PasswordValidationRepository {
  Future<Either<Failure, PasswordPolicyModel>> getPolicy();
}
