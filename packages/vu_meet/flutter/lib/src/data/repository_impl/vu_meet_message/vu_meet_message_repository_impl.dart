import 'dart:typed_data';
import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/media_file/mime_type.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_vu_meet/src/data/data_source/vu_meet_message/vu_meet_message_local_source.dart';
import 'package:copor_vu_meet/src/data/data_source/vu_meet_message/vu_meet_message_remote_source.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/get_vu_meet_message_file_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/get_vu_meet_message_list_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/send_vu_meet_file_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/send_vu_meet_message_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/typing_status_req_body.dart';
import 'package:copor_vu_meet/src/data/repository_impl/vu_meet_message/vu_meet_message_repository.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/vu_meet_message_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:dio/dio.dart';
import 'package:retrofit/dio.dart';

class VuMeetMessageRepositoryImpl extends BaseRepository implements VuMeetMessageRepository {
  final VuMeetMessageRemoteDataSource remoteDataSource;
  final VuMeetMessageLocalDataSource localDataSource;
  final Map<String, MediaFileModel> _fileCache = {};

  VuMeetMessageRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<List<VuMeetMessageItemModel>>>> getVuMeetMessage({
    required String chatId,
    String beforeDate = '',
    String afterDate = '',
  }) {
    return performOperationAndMapToResult<List<VuMeetMessageItemModel>>(
      remoteOperation: () {
        return performNetworkOperation<List<VuMeetMessageItemModel>>(() async {
          final model = await remoteDataSource.getVuMeetMessage(
            GetVuMeetMessageListReqBodyDto(
              chatId: chatId,
              beforeDate: beforeDate,
              afterDate: afterDate,
            ),
          );
          await localDataSource.setVuMeetMessage(model);
          return model;
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<MediaFileModel>>> getVuMeetMessageFile(
    GetVuMeetMessageFileReqBodyDto dto,
  ) async {
    if (_fileCache.containsKey(dto.fileId)) {
      return Right(Result(data: _fileCache[dto.fileId]!));
    }
    return performOperationAndMapToResult<MediaFileModel>(
      remoteOperation: () {
        return performNetworkOperation<MediaFileModel>(() async {
          final HttpResponse<Uint8List> httpResponse = await remoteDataSource.getVuMeetMessageFile(
            dto.fileId,
          );

          final String? contentDisposition = httpResponse.response.headers.value(
            'Content-Disposition',
          );
          final String? contentType = httpResponse.response.headers.value('Content-Type');

          final String rawFileName = _parseFilenameFromHeader(contentDisposition) ?? dto.fileName;
          final String fileNameFromHeader = _removeDuplicateExtension(rawFileName);

          final extension = fileNameFromHeader.split('.').last.toLowerCase();
          MimeType mimeType = MimeType.fromExtension(extension);

          if (mimeType == MimeType.unknown && contentType != null) {
            final baseContentType = contentType.split(';').first.trim();
            mimeType = MimeType.fromValue(baseContentType);
          }

          if (mimeType == MimeType.unknown) {
            mimeType = MimeType.detectMimeTypeFromBytes(httpResponse.data);
          }
          final MediaFileModel mediaFileModel = MediaFileModel.fromData(
            id: dto.fileId,
            name: fileNameFromHeader,
            type: mimeType,
            bytes: httpResponse.data,
            size: httpResponse.data.length,
          );

          _fileCache[dto.fileId] = mediaFileModel;

          return mediaFileModel;
        });
      },
    );
  }

  String _removeDuplicateExtension(String fileName) {
    final dotIndex = fileName.lastIndexOf('.');
    if (dotIndex <= 0) return fileName;

    final extension = fileName.substring(dotIndex);
    final withoutExt = fileName.substring(0, dotIndex);

    if (withoutExt.endsWith(extension)) {
      return withoutExt;
    }
    return fileName;
  }

  String? _parseFilenameFromHeader(String? header) {
    if (header == null) return null;
    try {
      final RegExp filenameRegex = RegExp(r'filename="?([^";]+)"?');
      final match = filenameRegex.firstMatch(header);
      return match?.group(1);
    } catch (e) {
      return null;
    }
  }

  @override
  Future<Either<Failure, Result<void>>> sendMessage(SendVuMeetMessageReqBodyDto messageDto) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.sendMessage(messageDto);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> sendFileMessage(
    SendVuMeetFileReqBodyDto messageFileDto,
  ) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          final multipartFile = MultipartFile.fromBytes(
            messageFileDto.fileBytes,
            filename: messageFileDto.fileName,
          );

          await remoteDataSource.sendFileMessage(
            file: multipartFile,
            content: messageFileDto.content,
            chat: messageFileDto.chatId,
            type: "FILE",
          );
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> changeTypingStatus(TypingStatusReqBody body) {
    return performVoidOperation(
      remoteOperation: () {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.changeTypingStatus(body);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> markChatSeen(String chatId) {
    return performVoidOperation(
      remoteOperation: () {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.markChatSeen(chatId);
        });
      },
    );
  }
}
