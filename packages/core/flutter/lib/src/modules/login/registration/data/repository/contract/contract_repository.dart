import 'dart:typed_data';
import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/error/failure.dart';

abstract class ContractRepository {
  Future<Either<Failure, Result<Uint8List>>> getContract(String contractRoute);
}
