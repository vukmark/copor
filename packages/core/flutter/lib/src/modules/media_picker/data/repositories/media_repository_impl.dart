import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/media_picker/domain/repositories/media_repository.dart';
import 'package:copor_core/src/modules/media_picker/data/datasource/camera_datasource.dart';
import 'package:copor_core/src/modules/media_picker/data/datasource/gallery_datasource.dart';
import 'package:copor_core/src/modules/media_picker/data/datasource/file_datasource.dart';

class MediaRepositoryImpl implements MediaRepository {
  final CameraDatasource _cameraDatasource;
  final GalleryDatasource _galleryDatasource;
  final FileDatasource _fileDatasource;

  MediaRepositoryImpl({
    CameraDatasource? cameraDatasource,
    GalleryDatasource? galleryDatasource,
    FileDatasource? fileDatasource,
  }) : _cameraDatasource = cameraDatasource ?? CameraDatasource(),
       _galleryDatasource = galleryDatasource ?? GalleryDatasource(),
       _fileDatasource = fileDatasource ?? FileDatasource();

  @override
  Future<Either<Failure, MediaFileModel>> captureFromCamera() async {
    try {
      final upload = await _cameraDatasource.capture();
      return Right(upload);
    } on Failure catch (failure) {
      return Left(failure);
    } catch (e) {
      return Left(Failure(500, e.toString()));
    }
  }

  @override
  Future<Either<Failure, List<MediaFileModel>>> pickFromGallery() async {
    try {
      final uploads = await _galleryDatasource.pick();
      return Right(uploads);
    } on Failure catch (failure) {
      return Left(failure);
    } catch (e) {
      return Left(Failure(500, e.toString()));
    }
  }

  @override
  Future<Either<Failure, List<MediaFileModel>>> pickFromFileSystem() async {
    try {
      final uploads = await _fileDatasource.pick();
      return Right(uploads);
    } on Failure catch (failure) {
      return Left(failure);
    } catch (e) {
      return Left(Failure(500, e.toString()));
    }
  }
}
