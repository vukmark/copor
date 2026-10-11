import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/data/model/media_file/file_types/image_file_model/image_file_model.dart';
import 'package:copor_core/src/data/model/media_file/mime_type.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/utils/compressing_image.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_image_compress/flutter_image_compress.dart';
import 'package:copor_core/src/modules/media_picker/domain/repositories/media_repository.dart';
import 'package:copor_core/src/modules/media_picker/presentation/cubit/media_picker_state.dart';

class MediaPickerCubit extends Cubit<MediaPickerState> {
  final MediaRepository _mediaRepository;
  final int maxFileSize;
  final int maxFileSizeBytes;

  MediaPickerCubit({required MediaRepository mediaRepository, required this.maxFileSize})
    : _mediaRepository = mediaRepository,
      maxFileSizeBytes = maxFileSize * 1024 * 1024,
      super(const MediaPickerState());

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

  Future<MediaFileModel?> _processFile(MediaFileModel file) async {
    if (!_isOversized(file)) return file;

    if (_isCompressibleImage(file)) {
      return _compressImage(file as ImageFileModel);
    }

    return null;
  }

  Future<void> captureFromCamera() async {
    emit(state.copyWith(isLoading: true, failure: null));
    final result = await _mediaRepository.captureFromCamera();
    await result.fold((failure) async => emit(state.copyWith(isLoading: false, failure: failure)), (
      upload,
    ) async {
      final processed = await _processFile(upload);
      if (processed == null) {
        emit(state.copyWith(isLoading: false, failure: Failure(413, upload.name)));
      } else {
        emit(state.copyWith(isLoading: false, uploads: [...state.uploads, processed]));
      }
    });
  }

  Future<void> pickFromGallery() async {
    emit(state.copyWith(isLoading: true, failure: null));
    final result = await _mediaRepository.pickFromGallery();
    await result.fold((failure) async => emit(state.copyWith(isLoading: false, failure: failure)), (
      uploads,
    ) async {
      final List<MediaFileModel> validFiles = [];
      final List<String> rejectedNames = [];

      for (final file in uploads) {
        final processed = await _processFile(file);
        if (processed != null) {
          validFiles.add(processed);
        } else {
          rejectedNames.add(file.name);
        }
      }

      emit(
        state.copyWith(
          isLoading: false,
          uploads: [...state.uploads, ...validFiles],
          failure: rejectedNames.isNotEmpty ? Failure(413, rejectedNames.join('\n')) : null,
        ),
      );
    });
  }

  Future<void> addFiles(List<MediaFileModel> files) async {
    emit(state.copyWith(isLoading: true, failure: null));

    final List<MediaFileModel> validFiles = [];
    final List<String> rejectedNames = [];

    for (final file in files) {
      final processed = await _processFile(file);
      if (processed != null) {
        validFiles.add(processed);
      } else {
        rejectedNames.add(file.name);
      }
    }

    emit(
      state.copyWith(
        isLoading: false,
        uploads: [...state.uploads, ...validFiles],
        failure: rejectedNames.isNotEmpty ? Failure(413, rejectedNames.join('\n')) : null,
      ),
    );
  }

  Future<void> pickFromFileSystem() async {
    emit(state.copyWith(isLoading: true, failure: null));
    final result = await _mediaRepository.pickFromFileSystem();

    await result.fold(
      (failure) async => emit(
        state.copyWith(
          isLoading: false,
          failure: failure.message.trim().isNotEmpty ? failure : null,
        ),
      ),
      (uploads) async {
        final List<MediaFileModel> validFiles = [];
        final List<String> rejectedNames = [];

        for (final file in uploads) {
          final processed = await _processFile(file);
          if (processed != null) {
            validFiles.add(processed);
          } else {
            rejectedNames.add(file.name);
          }
        }

        emit(
          state.copyWith(
            isLoading: false,
            uploads: [...state.uploads, ...validFiles],
            failure: rejectedNames.isNotEmpty ? Failure(413, rejectedNames.join('\n')) : null,
          ),
        );
      },
    );
  }

  void setFailure(Failure failure) {
    emit(state.copyWith(failure: failure));
  }

  void removeUpload(int index) {
    final updatedUploads = List.of(state.uploads)..removeAt(index);
    emit(state.copyWith(uploads: updatedUploads));
  }

  void clearUploads() {
    emit(state.copyWith(uploads: []));
  }
}
