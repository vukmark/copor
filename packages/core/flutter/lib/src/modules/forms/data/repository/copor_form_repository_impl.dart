import 'package:dartz/dartz.dart';
import 'package:dio/dio.dart';
import 'package:copor_core/src/data/model/key_value_pair/key_value_model.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/modules/forms/data/data_source/copor_form_remote_data_source.dart';
import 'package:copor_core/src/modules/forms/data/model/copor_form_dto.dart';
import 'package:copor_core/src/modules/forms/data/model/copor_form_submit_result.dart';
import 'package:copor_core/src/modules/forms/data/repository/copor_form_repository.dart';

class CoporFormRepositoryImpl extends BaseRepository implements CoporFormRepository {
  final CoporFormRemoteDataSource remoteDataSource;

  CoporFormRepositoryImpl({
    required this.remoteDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<CoporFormDTO>>> getCoporForm(String name) async {
    return performOperationAndMapToResult<CoporFormDTO>(
      remoteOperation: () async {
        return performNetworkOperation<CoporFormDTO>(() async {
          final formData = await remoteDataSource.getCoporForm(name);
          return formData;
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<CoporFormDTO>>> getPublicCoporForm(String name) async {
    return performOperationAndMapToResult<CoporFormDTO>(
      remoteOperation: () async {
        return performNetworkOperation<CoporFormDTO>(() async {
          final formData = await remoteDataSource.getPublicCoporForm(name);
          return formData;
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> submitFromCoporForm(
    String endpoint,
    Map<String, dynamic> formData,
  ) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.submitFromCoporForm(endpoint, formData);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> createFromCoporForm(
    String endpoint,
    Map<String, dynamic> formData,
  ) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.createFromCoporForm(endpoint, formData);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<CoporFormSubmitResult>>> updateFromCoporForm(
    String endpoint,
    Map<String, dynamic> formData,
  ) async {
    return performNetworkOperation<Result<CoporFormSubmitResult>>(() async {
      final response = await remoteDataSource.updateFromCoporForm(endpoint, formData);
      return Result(data: coporFormSubmitResultFromResponse(response), warning: null);
    });
  }

  @override
  Future<Either<Failure, Result<void>>> updateSystemSettings(
    List<KeyValueModel<dynamic>> formData,
  ) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.updateSystemSettings(formData);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> uploadFormImage(
    String endpoint,
    MediaFileModel image,
  ) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.uploadFormImage(
            endpoint.replaceFirst(RegExp(r'^/+'), ''),
            MultipartFile.fromBytes(image.bytes, filename: image.name),
          );
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> deleteFormImage(String endpoint) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.deleteFormImage(endpoint.replaceFirst(RegExp(r'^/+'), ''));
        });
      },
    );
  }
}
