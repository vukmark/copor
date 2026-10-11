import 'package:copor_core/src/data/model/media_file/file_types/image_file_model/image_file_model.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/data/model/media_file/mime_type.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_cloud/src/config/cloud_file_names.dart';
import 'package:copor_cloud/src/data/model/cloud_file.dart';
import 'package:copor_cloud/src/data/model/cloud_folder.dart';
import 'package:copor_core/src/modules/media_picker/domain/repositories/media_repository.dart';
import 'package:copor_core/src/utils/compressing_image.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_image_compress/flutter_image_compress.dart';
import 'package:copor_cloud/src/data/repository/drive_repository.dart';
import 'drive_page_state.dart';

class DrivePageCubit extends Cubit<DrivePageState> {
  final DriveRepository driveRepository;
  final MediaRepository mediaRepository;
  int maxFileSize;
  int maxFileSizeBytes;
  bool? _showFlachBeforeSearch;
  final List<MediaFileModel> _pendingUploads = [];
  final Set<String> _reservedUploadNames = {};
  String? _pendingUploadEndpoint;
  bool _anyPendingUploadFailed = false;
  bool _anyPendingUploadSucceeded = false;
  bool? _replaceUploadConflicts;
  String _pendingUploadDescription = '';
  bool _pendingNotifyReceivers = true;
  ValueChanged<int>? _onUploadStarted;
  int _currentUploadNumber = 0;

  DrivePageCubit({
    required this.driveRepository,
    required this.mediaRepository,
    required this.maxFileSize,
  }) : maxFileSizeBytes = maxFileSize * 1024 * 1024,
       super(const DrivePageState());

  void updateMaxFileSize(int value) {
    maxFileSize = value;
    maxFileSizeBytes = value * 1024 * 1024;
  }

  void toggleFlach() {
    emit(state.copyWith(showFlach: !state.showFlach));
  }

  void applyFilters({
    required Set<CloudModifiedDateFilter> modifiedDateFilters,
    required Set<CloudFileTypeFilter> fileTypeFilters,
    required Set<CloudFileSizeFilter> fileSizeFilters,
  }) {
    emit(
      state.copyWith(
        modifiedDateFilters: modifiedDateFilters,
        fileTypeFilters: fileTypeFilters,
        fileSizeFilters: fileSizeFilters,
      ),
    );
  }

  /// navigation through cloud
  void openFolder(CloudFolder folder) {
    emit(state.copyWith(navigationStack: [...state.navigationStack, folder]));
  }

  void navigateToPath(List<CloudFolder> path) {
    emit(state.copyWith(navigationStack: path));
  }

  void navigateToRoot() {
    emit(state.copyWith(navigationStack: []));
  }

  Future<void> reloadRootFolders() async {
    navigateToRoot();
    await loadMyDriveFolders();
  }

  Future<void> loadMyDriveFoldersIfNeeded() async {
    if (state.isLoading || state.folders.isNotEmpty) return;
    await loadMyDriveFolders();
  }

  Future<void> refreshFolders() => _refreshFolders();

  /// Refreshes, then opens the folder that holds [fileId] (e.g. a tapped
  /// notification). Stays in the current folder if the file isn't found.
  Future<void> openFolderOfFile(String fileId) async {
    await _refreshFolders();
    final path = _pathToFile(state.folders, fileId);
    if (path != null) navigateToPath(path);
  }

  List<CloudFolder>? _pathToFile(List<CloudFolder> folders, String fileId) {
    for (final folder in folders) {
      if (folder.files.any((file) => file.bulkDeleteId == fileId)) return [folder];
      final subPath = _pathToFile(folder.subfolders, fileId);
      if (subPath != null) return [folder, ...subPath];
    }
    return null;
  }

  void navigateToDepth(int depth) {
    if (depth >= state.navigationStack.length) return;
    emit(state.copyWith(navigationStack: state.navigationStack.sublist(0, depth + 1)));
  }

  /// fetching data, upload, and downloading files

  void search(String value) {
    final hadSearch = state.search.trim().isNotEmpty;
    final hasSearch = value.trim().isNotEmpty;
    var showFlach = state.showFlach;

    if (!hadSearch && hasSearch) {
      _showFlachBeforeSearch = state.showFlach;
      showFlach = true;
    } else if (hadSearch && !hasSearch) {
      showFlach = _showFlachBeforeSearch ?? state.showFlach;
      _showFlachBeforeSearch = null;
    }

    emit(state.copyWith(search: value, showFlach: showFlach));
  }

  Future<void> loadMyDriveFolders() async {
    emit(state.copyWith(isLoading: true, error: null));

    final result = await driveRepository.getAllMyDriveFolders();

    result.fold(
      (failure) => emit(state.copyWith(isLoading: false, error: failure.message)),
      (success) =>
          emit(state.copyWith(isLoading: false, folders: success.data, navigationStack: [])),
    );
  }

  Future<void> uploadFromFileSystem() async {
    final files = await pickFilesForUpload();
    if (files.isNotEmpty) await _startUploads(files);
  }

  Future<List<MediaFileModel>> pickFilesForUpload() async {
    final result = await mediaRepository.pickFromFileSystem();
    return result.fold((failure) {
      if (failure.message.trim().isNotEmpty) {
        emit(state.copyWith(uploadStatus: UploadFailure(failure)));
      }
      return const [];
    }, prepareFilesForUpload);
  }

  Future<List<MediaFileModel>> prepareFilesForUpload(List<MediaFileModel> files) async {
    final validFiles = <MediaFileModel>[];
    final rejectedNames = <String>[];

    for (final file in files) {
      final processed = await _processFile(file);
      if (processed != null) {
        validFiles.add(processed);
      } else {
        rejectedNames.add(file.name);
      }
    }

    if (rejectedNames.isNotEmpty) {
      emit(state.copyWith(uploadStatus: UploadFailure(Failure(413, rejectedNames.join('\n')))));
    }

    return validFiles;
  }

  /// Uploads [files] into the current folder, or — when [targetUserId] is set —
  /// into that user's Public folder (`POST /cloud/PUBLIC/USER/:id/*`). The
  /// latter is how "share a file with a person" works: the recipient is the
  /// owner of the Public folder the file lands in.
  Future<void> uploadPreparedFiles(
    List<MediaFileModel> files, {
    required bool replaceConflicts,
    String description = '',
    bool notifyReceivers = true,
    ValueChanged<int>? onUploadStarted,
    String? targetUserId,
  }) async {
    if (files.isEmpty) return;
    _replaceUploadConflicts = replaceConflicts;
    _pendingUploadDescription = description;
    _pendingNotifyReceivers = notifyReceivers;
    await _startUploads(files, onUploadStarted: onUploadStarted, targetUserId: targetUserId);
  }

  Future<void> addFolderCarrierFile(String folderName) async {
    final uploadEndpoint = state.currentFolder?.uploadEndpoint;
    final trimmedFolderName = folderName.trim();
    if (uploadEndpoint == null || trimmedFolderName.isEmpty) return;

    final sanitizedFolderName = _sanitizeFolderName(trimmedFolderName);
    const placeholderFileName = CloudFileNames.folderCarrier;
    final folderUploadEndpoint = _appendPathSegment(uploadEndpoint, sanitizedFolderName);
    final file = MediaFileModel.fromData(
      name: placeholderFileName,
      type: MimeType.txt,
      bytes: Uint8List(0),
      size: 0,
    );

    final result = await driveRepository.uploadFile(folderUploadEndpoint, file);

    await result.fold(
      (failure) async => emit(state.copyWith(uploadStatus: UploadFailure(failure))),
      (_) async {
        emit(state.copyWith(uploadStatus: const UploadSuccess()));
        await _refreshFolders();
      },
    );
  }

  String _sanitizeFolderName(String folderName) => folderName.replaceAll(RegExp(r'[\\/]'), '_');

  String _appendPathSegment(String endpoint, String segment) {
    final separator = endpoint.endsWith('/') ? '' : '/';
    return '$endpoint$separator${Uri.encodeComponent(segment)}';
  }

  Future<void> _startUploads(
    List<MediaFileModel> files, {
    ValueChanged<int>? onUploadStarted,
    String? targetUserId,
  }) async {
    final uploadEndpoint = targetUserId != null
        ? '/cloud/PUBLIC/USER/$targetUserId/'
        : state.currentFolder?.uploadEndpoint;
    if (uploadEndpoint == null) return;

    _pendingUploads
      ..clear()
      ..addAll(files);
    _reservedUploadNames
      ..clear()
      ..addAll(
        targetUserId != null
            ? const <String>[]
            : state.visibleFiles.map((file) => file.name.toLowerCase()),
      );
    _pendingUploadEndpoint = uploadEndpoint;
    _anyPendingUploadFailed = false;
    _anyPendingUploadSucceeded = false;
    _onUploadStarted = onUploadStarted;
    _currentUploadNumber = 0;

    await _continueUploads();
  }

  Future<void> resolveUploadConflict({required bool replace}) async {
    if (_pendingUploads.isEmpty) return;

    final pendingFile = _pendingUploads.removeAt(0);
    final file = replace
        ? pendingFile
        : _renameFile(pendingFile, _nextAvailableName(pendingFile.name));
    await _uploadFile(file, overwrite: replace);
    await _continueUploads();
  }

  Future<void> cancelConflictingUpload() async {
    if (_pendingUploads.isEmpty) return;

    _pendingUploads.removeAt(0);
    await _continueUploads();
  }

  Future<void> _continueUploads() async {
    while (_pendingUploads.isNotEmpty) {
      final file = _pendingUploads.first;
      if (_reservedUploadNames.contains(file.name.toLowerCase())) {
        final replaceConflicts = _replaceUploadConflicts;
        if (replaceConflicts != null) {
          _pendingUploads.removeAt(0);
          final resolvedFile = replaceConflicts
              ? file
              : _renameFile(file, _nextAvailableName(file.name));
          await _uploadFile(resolvedFile, overwrite: replaceConflicts);
          continue;
        }
        emit(
          state.copyWith(
            uploadStatus: UploadConflict(
              fileName: file.name,
              suggestedFileName: _nextAvailableName(file.name),
            ),
          ),
        );
        return;
      }

      _pendingUploads.removeAt(0);
      await _uploadFile(file);
    }

    _pendingUploadEndpoint = null;
    _replaceUploadConflicts = null;
    _pendingUploadDescription = '';
    _pendingNotifyReceivers = true;
    _onUploadStarted = null;
    _currentUploadNumber = 0;
    _reservedUploadNames.clear();
    if (!_anyPendingUploadFailed && _anyPendingUploadSucceeded) {
      emit(state.copyWith(uploadStatus: const UploadSuccess()));
    } else if (!_anyPendingUploadFailed) {
      emit(state.copyWith(uploadStatus: const UploadIdle()));
    }
    await _refreshFolders();
  }

  Future<void> _uploadFile(MediaFileModel file, {bool overwrite = false}) async {
    final uploadEndpoint = _pendingUploadEndpoint;
    if (uploadEndpoint == null) return;

    _currentUploadNumber++;
    _onUploadStarted?.call(_currentUploadNumber);

    final result = await driveRepository.uploadFile(
      uploadEndpoint,
      file,
      overwrite: overwrite,
      description: _pendingUploadDescription,
      notifyReceivers: _pendingNotifyReceivers,
    );
    result.fold(
      (failure) {
        _anyPendingUploadFailed = true;
        emit(state.copyWith(uploadStatus: UploadFailure(failure)));
      },
      (_) {
        _anyPendingUploadSucceeded = true;
        _reservedUploadNames.add(file.name.toLowerCase());
        emit(state.copyWith(uploads: [...state.uploads, file]));
      },
    );
  }

  String _nextAvailableName(String fileName) {
    final dotIndex = fileName.lastIndexOf('.');
    final hasExtension = dotIndex > 0;
    final baseName = hasExtension ? fileName.substring(0, dotIndex) : fileName;
    final extension = hasExtension ? fileName.substring(dotIndex) : '';
    var suffix = 1;
    var candidate = '$baseName ($suffix)$extension';

    while (_reservedUploadNames.contains(candidate.toLowerCase())) {
      suffix++;
      candidate = '$baseName ($suffix)$extension';
    }

    return candidate;
  }

  MediaFileModel _renameFile(MediaFileModel file, String name) {
    return MediaFileModel.fromData(
      id: file.id,
      name: name,
      type: file.type,
      bytes: file.bytes,
      path: file is ImageFileModel ? file.path : null,
      size: file.size,
    );
  }

  Future<void> _refreshFolders() async {
    final savedStack = state.navigationStack;
    emit(state.copyWith(isLoading: true, error: null));

    final result = await driveRepository.getAllMyDriveFolders();
    result.fold((failure) => emit(state.copyWith(isLoading: false, error: failure.message)), (
      success,
    ) {
      List<CloudFolder> newStack = [];
      List<CloudFolder> searchIn = success.data;

      for (final oldFolder in savedStack) {
        final matches = searchIn.where(
          (f) => f.uploadEndpoint == oldFolder.uploadEndpoint && f.name == oldFolder.name,
        );
        if (matches.isEmpty) break;
        final match = matches.first;
        newStack.add(match);
        searchIn = match.subfolders;
      }

      emit(state.copyWith(isLoading: false, folders: success.data, navigationStack: newStack));
    });
  }

  Future<Uint8List?> downloadFile(CloudFile file) async {
    return await driveRepository.downloadFile(file.downloadURL);
  }

  Future<bool> deleteFile(CloudFile file) async {
    final result = await driveRepository.deleteCloudFile(file.downloadURL);
    return result.fold((_) => false, (_) async {
      await _refreshFolders();
      return true;
    });
  }

  Future<bool> bulkDeleteFiles(List<CloudFile> files) async {
    if (files.isEmpty) return false;

    final result = await driveRepository.bulkDeleteCloudFiles(
      files.map((file) => file.bulkDeleteId).toList(),
    );
    return result.fold((_) => false, (_) async {
      await _refreshFolders();
      return true;
    });
  }

  Future<bool> deleteFolderRecursively(CloudFolder folder) async {
    final files = _collectFolderFiles(folder);
    bool anyFailure = false;

    for (final file in files) {
      final result = await driveRepository.deleteCloudFile(file.downloadURL);
      result.fold((failure) {
        anyFailure = true;
        emit(state.copyWith(error: failure.message));
      }, (_) {});
    }

    await _refreshFolders();
    return !anyFailure;
  }

  List<CloudFile> _collectFolderFiles(CloudFolder folder) {
    final carrierFiles = folder.files.where((file) => CloudFileNames.isFolderCarrier(file.name));

    return [
      ...folder.files.where((file) => !CloudFileNames.isFolderCarrier(file.name)),
      for (final subfolder in folder.subfolders) ..._collectFolderFiles(subfolder),
      ...carrierFiles,
    ];
  }

  /// group actions

  Future<bool> deleteGroup(CloudFolder folder) async {
    final groupId = folder.cloudGroupId;
    if (groupId == null) return false;

    final result = await driveRepository.deleteCloudGroup(groupId);
    return result.fold(
      (failure) {
        emit(state.copyWith(error: failure.message));
        return false;
      },
      (_) async {
        await _refreshFolders();
        return true;
      },
    );
  }

  /// file size checker and image compression

  Future<MediaFileModel?> _processFile(MediaFileModel file) async {
    if (!_isOversized(file)) return file;

    if (_isCompressibleImage(file)) {
      return _compressImage(file as ImageFileModel);
    }

    return null;
  }

  bool _isOversized(MediaFileModel file) {
    final fileSize = file.size ?? file.bytes.length;
    return fileSize > maxFileSizeBytes;
  }

  bool _isCompressibleImage(MediaFileModel file) {
    return file is ImageFileModel && file.type != MimeType.svg && file.type != MimeType.gif;
  }

  bool get _supportsFlutterImageCompress =>
      kIsWeb ||
      defaultTargetPlatform == TargetPlatform.android ||
      defaultTargetPlatform == TargetPlatform.iOS ||
      defaultTargetPlatform == TargetPlatform.macOS;

  Future<MediaFileModel?> _compressImage(ImageFileModel file) async {
    Uint8List compressed;

    if (_supportsFlutterImageCompress) {
      int quality = 90;
      compressed = file.bytes;

      while (compressed.length > maxFileSizeBytes && quality > 10) {
        compressed = await FlutterImageCompress.compressWithList(
          file.bytes,
          quality: quality,
          format: CompressFormat.jpeg,
        );
        quality -= 10;
      }
    } else {
      compressed = await compute(compressImageIsolate, {
        'bytes': file.bytes,
        'maxBytes': maxFileSizeBytes,
      });
    }

    if (compressed.length > maxFileSizeBytes) return null;

    return MediaFileModel.fromData(
      id: file.id,
      name: file.name,
      type: MimeType.jpeg,
      bytes: compressed,
      path: file.path,
      size: compressed.length,
    );
  }
}
