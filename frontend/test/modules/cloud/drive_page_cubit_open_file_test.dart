import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_cloud/src/data/model/cloud_file.dart';
import 'package:copor_cloud/src/data/model/cloud_folder.dart';
import 'package:copor_cloud/src/data/repository/drive_repository.dart';
import 'package:copor_cloud/src/presentation/cubit/drive_page_cubit.dart';
import 'package:copor_core/src/modules/media_picker/domain/repositories/media_repository.dart';
import 'package:flutter_test/flutter_test.dart';

CloudFile _file(String id) => CloudFile(
  name: '$id.pdf',
  size: '1',
  description: '',
  extension: 'pdf',
  thumbnail: '',
  downloadURL: '/cloud/$id',
  creatorId: 'admin',
  creatorName: 'Admin',
);

const _private = CloudFolder(name: 'Private', uploadEndpoint: '/cloud/PRIVATE/');
final _public = CloudFolder(name: 'Public', uploadEndpoint: '/cloud/PUBLIC/', files: [_file('shared')]);
final _myFiles = CloudFolder(name: 'My files', uploadEndpoint: '', subfolders: [_private, _public]);
final _group = CloudFolder(name: 'Team', uploadEndpoint: '/cloud/USER_GROUP/g1/', files: [_file('in-group')]);
final _groups = CloudFolder(name: 'Groups', uploadEndpoint: '', subfolders: [_group]);

class _FakeDriveRepository implements DriveRepository {
  @override
  Future<Either<Failure, Result<List<CloudFolder>>>> getAllMyDriveFolders() async =>
      Right(Result(data: [_myFiles, _groups]));

  @override
  dynamic noSuchMethod(Invocation invocation) => throw UnimplementedError();
}

class _FakeMediaRepository implements MediaRepository {
  @override
  dynamic noSuchMethod(Invocation invocation) => throw UnimplementedError();
}

void main() {
  late DrivePageCubit cubit;

  setUp(() {
    cubit = DrivePageCubit(
      driveRepository: _FakeDriveRepository(),
      mediaRepository: _FakeMediaRepository(),
      maxFileSize: 50,
    );
  });

  test('opens the folder that holds the file', () async {
    await cubit.openFolderOfFile('shared');

    expect(cubit.state.navigationStack.map((folder) => folder.name), ['My files', 'Public']);
  });

  test('finds files in nested group folders', () async {
    await cubit.openFolderOfFile('in-group');

    expect(cubit.state.navigationStack.map((folder) => folder.name), ['Groups', 'Team']);
  });

  test('stays where it is when the file is not in the tree', () async {
    await cubit.openFolderOfFile('deleted');

    expect(cubit.state.navigationStack, isEmpty);
  });
}
