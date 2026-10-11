import 'dart:typed_data';
import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_cloud/src/data/model/cloud_folder.dart';

abstract class DriveRepository {
  Future<Either<Failure, Result<List<CloudFolder>>>> getAllMyDriveFolders();

  Future<Either<Failure, void>> uploadFile(
    String uploadEndpoint,
    MediaFileModel file, {
    bool overwrite = false,
    String description = '',
    bool notifyReceivers = true,
  });

  Future<Uint8List?> downloadFile(String downloadUrl);

  Future<Either<Failure, void>> deleteCloudGroup(String id);

  Future<Either<Failure, void>> deleteCloudFile(String downloadUrl);

  Future<Either<Failure, void>> bulkDeleteCloudFiles(List<String> ids);
}
