import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/error/failure.dart';

abstract class MediaRepository {
  Future<Either<Failure, MediaFileModel>> captureFromCamera();
  Future<Either<Failure, List<MediaFileModel>>> pickFromGallery();
  Future<Either<Failure, List<MediaFileModel>>> pickFromFileSystem();
}
