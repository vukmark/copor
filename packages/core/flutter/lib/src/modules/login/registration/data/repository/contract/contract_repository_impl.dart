import 'dart:typed_data';
import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/modules/login/registration/data/data_source/contract/contract_remote_data_source.dart';
import 'package:copor_core/src/modules/login/registration/data/repository/contract/contract_repository.dart';

class ContractRepositoryImpl extends BaseRepository implements ContractRepository {
  final ContractRemoteDataSource remoteDataSource;

  ContractRepositoryImpl({
    required this.remoteDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<Uint8List>>> getContract(String contractRoute) async {
    return performOperationAndMapToResult<Uint8List>(
      remoteOperation: () async {
        return performNetworkOperation<Uint8List>(() async {
          final formData = await remoteDataSource.getContract(contractRoute);
          return formData;
        });
      },
    );
  }
}
