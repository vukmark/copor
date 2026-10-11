import 'dart:typed_data';

import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/data/model/media_file/mime_type.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_cloud/src/data/model/cloud_folder.dart';
import 'package:copor_cloud/src/data/repository/drive_repository.dart';
import 'package:copor_cloud/src/presentation/cubit/drive_page_cubit.dart';
import 'package:copor_core/src/modules/media_picker/domain/repositories/media_repository.dart';
import 'package:flutter_test/flutter_test.dart';

class _FakeDriveRepository implements DriveRepository {
  final List<String> uploadEndpoints = [];
  final List<bool> notifyFlags = [];

  @override
  Future<Either<Failure, void>> uploadFile(
    String uploadEndpoint,
    MediaFileModel file, {
    bool overwrite = false,
    String description = '',
    bool notifyReceivers = true,
  }) async {
    uploadEndpoints.add(uploadEndpoint);
    notifyFlags.add(notifyReceivers);
    return const Right(null);
  }

  @override
  Future<Either<Failure, Result<List<CloudFolder>>>> getAllMyDriveFolders() async =>
      Right(Result(data: const <CloudFolder>[]));

  @override
  dynamic noSuchMethod(Invocation invocation) => throw UnimplementedError();
}

class _FakeMediaRepository implements MediaRepository {
  @override
  dynamic noSuchMethod(Invocation invocation) => throw UnimplementedError();
}

MediaFileModel _file(String name) => MediaFileModel.fromData(
  name: name,
  type: MimeType.txt,
  bytes: Uint8List.fromList([1, 2, 3]),
  size: 3,
);

void main() {
  late _FakeDriveRepository repo;
  late DrivePageCubit cubit;

  setUp(() {
    repo = _FakeDriveRepository();
    cubit = DrivePageCubit(
      driveRepository: repo,
      mediaRepository: _FakeMediaRepository(),
      maxFileSize: 50,
    );
  });

  test('uploadPreparedFiles(targetUserId:) posts into that user\'s PUBLIC folder', () async {
    await cubit.uploadPreparedFiles(
      [_file('notes.pdf')],
      replaceConflicts: true,
      targetUserId: 'user-123',
    );

    expect(repo.uploadEndpoints, ['/cloud/PUBLIC/USER/user-123/']);
  });

  test('every file in the batch goes to the same recipient endpoint', () async {
    await cubit.uploadPreparedFiles(
      [_file('a.txt'), _file('b.txt')],
      replaceConflicts: true,
      targetUserId: 'u-9',
      notifyReceivers: false,
    );

    expect(repo.uploadEndpoints, ['/cloud/PUBLIC/USER/u-9/', '/cloud/PUBLIC/USER/u-9/']);
    expect(repo.notifyFlags, [false, false]);
  });

  test('without targetUserId nothing is uploaded when there is no current folder', () async {
    await cubit.uploadPreparedFiles([_file('x.txt')], replaceConflicts: true);

    expect(repo.uploadEndpoints, isEmpty);
  });
}
