import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/model/key_value_pair/key_value_model.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/forms/data/model/copor_form_dto.dart';
import 'package:copor_core/src/modules/forms/data/model/copor_form_submit_result.dart';

abstract class CoporFormRepository {
  Future<Either<Failure, Result<CoporFormDTO>>> getCoporForm(String name);

  Future<Either<Failure, Result<CoporFormDTO>>> getPublicCoporForm(String name);

  Future<Either<Failure, Result<void>>> submitFromCoporForm(
    String endpoint,
    Map<String, dynamic> formData,
  );

  Future<Either<Failure, Result<void>>> createFromCoporForm(
    String endpoint,
    Map<String, dynamic> formData,
  );

  Future<Either<Failure, Result<CoporFormSubmitResult>>> updateFromCoporForm(
    String endpoint,
    Map<String, dynamic> formData,
  );

  Future<Either<Failure, Result<void>>> updateSystemSettings(List<KeyValueModel<dynamic>> formData);

  Future<Either<Failure, Result<void>>> uploadFormImage(String endpoint, MediaFileModel image);

  Future<Either<Failure, Result<void>>> deleteFormImage(String endpoint);
}
