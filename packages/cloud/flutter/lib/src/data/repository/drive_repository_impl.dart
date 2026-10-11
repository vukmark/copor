import 'dart:typed_data';
import 'package:dartz/dartz.dart';
import 'package:dio/dio.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_cloud/src/data/datasource/drive_remote_datasource.dart';
import 'package:copor_cloud/src/data/model/cloud_folder.dart';
import 'package:copor_cloud/src/data/repository/drive_repository.dart';

class DriveRepositoryImpl implements DriveRepository {
  final DriveRemoteDataSource remoteDataSource;

  DriveRepositoryImpl({required this.remoteDataSource});

  @override
  Future<Either<Failure, Result<List<CloudFolder>>>> getAllMyDriveFolders() async {
    try {
      final folders = await remoteDataSource.getAllMyDriveFolders();
      return Right(Result(data: folders));
    } catch (e) {
      return Left(Failure(0, e.toString()));
    }
  }

  @override
  Future<Either<Failure, void>> uploadFile(
    String uploadEndpoint,
    MediaFileModel file, {
    bool overwrite = false,
    String description = '',
    bool notifyReceivers = true,
  }) async {
    try {
      final multipartFile = MultipartFile.fromBytes(file.bytes, filename: file.name);
      await remoteDataSource.uploadFile(
        uploadEndpoint,
        multipartFile,
        file.name,
        'FILE',
        overwrite,
        description,
        notifyReceivers,
      );
      return const Right(null);
    } catch (e) {
      return Left(Failure(0, e.toString()));
    }
  }

  @override
  Future<Uint8List?> downloadFile(String downloadUrl) async {
    try {
      dynamic httpResponse = await remoteDataSource.downloadFile(downloadUrl);
      return httpResponse.data;
    } catch (e) {
      return null;
    }
  }

  @override
  Future<Either<Failure, void>> deleteCloudGroup(String id) async {
    try {
      await remoteDataSource.deleteCloudGroup(id);
      return const Right(null);
    } catch (e) {
      return Left(Failure(0, e.toString()));
    }
  }

  @override
  Future<Either<Failure, void>> deleteCloudFile(String downloadUrl) async {
    try {
      await remoteDataSource.deleteCloudFile(downloadUrl);
      return const Right(null);
    } catch (e) {
      return Left(Failure(0, e.toString()));
    }
  }

  @override
  Future<Either<Failure, void>> bulkDeleteCloudFiles(List<String> ids) async {
    try {
      await remoteDataSource.bulkDeleteCloudFiles({'ids': ids});
      return const Right(null);
    } catch (e) {
      return Left(Failure(0, e.toString()));
    }
  }
}
