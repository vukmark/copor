import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_cloud/src/config/cloud_file_names.dart';
import 'package:equatable/equatable.dart';
import 'package:copor_cloud/src/data/model/cloud_file.dart';
import 'package:copor_cloud/src/data/model/cloud_folder.dart';
import 'package:copor_core/src/utils/date_formatter.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_utils/applied_filter_group.dart';

enum CloudModifiedDateFilter { all, today, last7Days }

enum CloudFileTypeFilter { images, videos, pdf }

enum CloudFileSizeFilter { under200Kb, under1Mb, over4Mb }

sealed class UploadStatus {
  const UploadStatus();
}

class UploadIdle extends UploadStatus {
  const UploadIdle();
}

class UploadSuccess extends UploadStatus {
  const UploadSuccess();
}

class UploadFailure extends UploadStatus {
  final Failure failure;

  const UploadFailure(this.failure);
}

class UploadConflict extends UploadStatus {
  final String fileName;
  final String suggestedFileName;

  const UploadConflict({required this.fileName, required this.suggestedFileName});
}

class DrivePageState extends Equatable {
  static const String privateFolderUploadEndpoint = '/cloud/PRIVATE/';

  final List<CloudFolder> folders;
  final List<CloudFolder> navigationStack;
  final bool isLoading;
  final bool showFlach;
  final String? error;
  final List<MediaFileModel> uploads;
  final UploadStatus uploadStatus;
  final String search;
  final Set<CloudModifiedDateFilter> modifiedDateFilters;
  final Set<CloudFileTypeFilter> fileTypeFilters;
  final Set<CloudFileSizeFilter> fileSizeFilters;

  const DrivePageState({
    this.folders = const [],
    this.navigationStack = const [],
    this.isLoading = false,
    this.showFlach = false,
    this.error,
    this.uploads = const [],
    this.uploadStatus = const UploadIdle(),
    this.search = '',
    this.modifiedDateFilters = const {},
    this.fileTypeFilters = const {},
    this.fileSizeFilters = const {},
  });

  CloudFolder? get currentFolder => navigationStack.isNotEmpty ? navigationStack.last : null;

  List<AppliedFilterGroup> get appliedFilters {
    final groups = <AppliedFilterGroup>[];

    if (modifiedDateFilters.isNotEmpty) {
      groups.add(
        AppliedFilterGroup(
          label: 'Modified date',
          values: modifiedDateFilters.map(_modifiedDateFilterLabel).toList(),
        ),
      );
    }

    if (fileTypeFilters.isNotEmpty) {
      groups.add(
        AppliedFilterGroup(
          label: 'File type',
          values: fileTypeFilters.map(_fileTypeFilterLabel).toList(),
        ),
      );
    }

    if (fileSizeFilters.isNotEmpty) {
      groups.add(
        AppliedFilterGroup(
          label: 'File size',
          values: fileSizeFilters.map(_fileSizeFilterLabel).toList(),
        ),
      );
    }

    return groups;
  }

  String _modifiedDateFilterLabel(CloudModifiedDateFilter filter) => switch (filter) {
    CloudModifiedDateFilter.all => 'All',
    CloudModifiedDateFilter.today => 'Today',
    CloudModifiedDateFilter.last7Days => 'Last 7 days',
  };

  String _fileTypeFilterLabel(CloudFileTypeFilter filter) => switch (filter) {
    CloudFileTypeFilter.images => 'Images',
    CloudFileTypeFilter.videos => 'Videos',
    CloudFileTypeFilter.pdf => 'PDF',
  };

  String _fileSizeFilterLabel(CloudFileSizeFilter filter) => switch (filter) {
    CloudFileSizeFilter.under200Kb => '<200KB',
    CloudFileSizeFilter.under1Mb => '<1MB',
    CloudFileSizeFilter.over4Mb => '>4MB',
  };

  List<CloudFolder> get visibleFolders {
    final visibleFolders = currentFolder?.subfolders ?? folders;
    final privateFolderIndex = visibleFolders.indexWhere(
      (folder) => folder.uploadEndpoint == privateFolderUploadEndpoint,
    );

    if (privateFolderIndex <= 0) return visibleFolders;

    return [
      visibleFolders[privateFolderIndex],
      ...visibleFolders.take(privateFolderIndex),
      ...visibleFolders.skip(privateFolderIndex + 1),
    ];
  }

  List<CloudFile> get visibleFiles {
    final isRestricted = CloudFolder.isRestrictedUploadEndpoint(currentFolder?.uploadEndpoint);

    return (currentFolder?.files ?? const [])
        .where((file) => !CloudFileNames.isFolderCarrier(file.name))
        .map((file) => file.copyWith(isRestrictedFolder: isRestricted))
        .where(_matchesFilters)
        .toList();
  }

  List<CloudFile> get flatFiles {
    final files = [for (final folder in folders) ..._collectFiles(folder)];
    final normalizedSearch = search.trim().toLowerCase();

    return files.where((file) {
      final matchesSearch =
          normalizedSearch.isEmpty || file.name.toLowerCase().contains(normalizedSearch);
      return matchesSearch && _matchesFilters(file);
    }).toList();
  }

  Map<CloudFile, List<String>> get flatFilePaths {
    final paths = <CloudFile, List<String>>{};

    for (final folder in folders) {
      _collectFilePaths(folder, const [], paths);
    }

    return paths;
  }

  bool _matchesFilters(CloudFile file) {
    return _matchesModifiedDate(file) && _matchesFileType(file) && _matchesFileSize(file);
  }

  bool _matchesModifiedDate(CloudFile file) {
    if (modifiedDateFilters.isEmpty || modifiedDateFilters.contains(CloudModifiedDateFilter.all)) {
      return true;
    }

    final createdAt = parseFlexibleDate(file.createdAt)?.toLocal();
    if (createdAt == null || modifiedDateFilters.isEmpty) return false;

    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    final fileDate = DateTime(createdAt.year, createdAt.month, createdAt.day);

    return modifiedDateFilters.any(
      (filter) => switch (filter) {
        CloudModifiedDateFilter.all => true,
        CloudModifiedDateFilter.today => fileDate == today,
        CloudModifiedDateFilter.last7Days =>
          !fileDate.isBefore(today.subtract(const Duration(days: 6))) &&
              fileDate.isBefore(today.add(const Duration(days: 1))),
      },
    );
  }

  bool _matchesFileType(CloudFile file) {
    if (fileTypeFilters.isEmpty || fileTypeFilters.length == CloudFileTypeFilter.values.length) {
      return true;
    }

    final extension = file.extension.toLowerCase().replaceFirst('.', '');
    return fileTypeFilters.any(
      (filter) => switch (filter) {
        CloudFileTypeFilter.images => const {
          'avif',
          'bmp',
          'gif',
          'heic',
          'jpeg',
          'jpg',
          'png',
          'svg',
          'webp',
        }.contains(extension),
        CloudFileTypeFilter.videos => const {
          'avi',
          'm4v',
          'mkv',
          'mov',
          'mp4',
          'mpeg',
          'mpg',
          'webm',
        }.contains(extension),
        CloudFileTypeFilter.pdf => extension == 'pdf',
      },
    );
  }

  bool _matchesFileSize(CloudFile file) {
    if (fileSizeFilters.isEmpty || fileSizeFilters.length == CloudFileSizeFilter.values.length) {
      return true;
    }

    final sizeInBytes = _parseFileSize(file.size);
    if (sizeInBytes == null) return false;

    return fileSizeFilters.any((filter) {
      return switch (filter) {
        CloudFileSizeFilter.under200Kb => sizeInBytes < 200 * 1024,
        CloudFileSizeFilter.under1Mb => sizeInBytes < 1024 * 1024,
        CloudFileSizeFilter.over4Mb => sizeInBytes > 4 * 1024 * 1024,
      };
    });
  }

  double? _parseFileSize(String value) {
    final match = RegExp(
      r'([\d.,]+)\s*(B|KB|MB|GB)?',
      caseSensitive: false,
    ).firstMatch(value.trim());
    if (match == null) return null;

    final number = double.tryParse(match.group(1)!.replaceAll(',', '.'));
    if (number == null) return null;

    final multiplier = switch (match.group(2)?.toUpperCase()) {
      'KB' => 1024,
      'MB' => 1024 * 1024,
      'GB' => 1024 * 1024 * 1024,
      _ => 1,
    };
    return number * multiplier;
  }

  List<CloudFile> _collectFiles(CloudFolder folder) {
    final isRestricted = CloudFolder.isRestrictedUploadEndpoint(folder.uploadEndpoint);

    return [
      ...folder.files
          .where((file) => !CloudFileNames.isFolderCarrier(file.name))
          .map((file) => file.copyWith(isRestrictedFolder: isRestricted)),
      for (final subfolder in folder.subfolders) ..._collectFiles(subfolder),
    ];
  }

  void _collectFilePaths(
    CloudFolder folder,
    List<String> parentPath,
    Map<CloudFile, List<String>> paths,
  ) {
    final path = [...parentPath, folder.name];

    for (final file in folder.files) {
      if (!CloudFileNames.isFolderCarrier(file.name)) {
        paths[file] = path;
      }
    }

    for (final subfolder in folder.subfolders) {
      _collectFilePaths(subfolder, path, paths);
    }
  }

  DrivePageState copyWith({
    List<CloudFolder>? folders,
    List<CloudFolder>? navigationStack,
    bool? isLoading,
    bool? showFlach,
    String? error,
    List<MediaFileModel>? uploads,
    UploadStatus uploadStatus = const UploadIdle(),
    String? search,
    Set<CloudModifiedDateFilter>? modifiedDateFilters,
    Set<CloudFileTypeFilter>? fileTypeFilters,
    Set<CloudFileSizeFilter>? fileSizeFilters,
  }) {
    return DrivePageState(
      folders: folders ?? this.folders,
      navigationStack: navigationStack ?? this.navigationStack,
      isLoading: isLoading ?? this.isLoading,
      showFlach: showFlach ?? this.showFlach,
      error: error,
      uploads: uploads ?? this.uploads,
      uploadStatus: uploadStatus,
      search: search ?? this.search,
      modifiedDateFilters: modifiedDateFilters ?? this.modifiedDateFilters,
      fileTypeFilters: fileTypeFilters ?? this.fileTypeFilters,
      fileSizeFilters: fileSizeFilters ?? this.fileSizeFilters,
    );
  }

  @override
  List<Object?> get props => [
    folders,
    navigationStack,
    isLoading,
    showFlach,
    error,
    uploads,
    uploadStatus,
    search,
    modifiedDateFilters,
    fileTypeFilters,
    fileSizeFilters,
  ];
}
