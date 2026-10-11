import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/get_vu_meet_message_file_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/send_vu_meet_file_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/send_vu_meet_message_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/vu_meet_message_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/typing_status_req_body.dart';

abstract class VuMeetMessageRepository {
  Future<Either<Failure, Result<List<VuMeetMessageItemModel>>>> getVuMeetMessage({
    required String chatId,
    String beforeDate,
    String afterDate,
  });
  Future<Either<Failure, Result<void>>> sendMessage(SendVuMeetMessageReqBodyDto messageDto);
  Future<Either<Failure, Result<void>>> sendFileMessage(SendVuMeetFileReqBodyDto messageFileDto);
  Future<Either<Failure, Result<MediaFileModel>>> getVuMeetMessageFile(
    GetVuMeetMessageFileReqBodyDto messageDto,
  );
  Future<Either<Failure, Result<void>>> changeTypingStatus(TypingStatusReqBody body);
  Future<Either<Failure, Result<void>>> markChatSeen(String chatId);
}
