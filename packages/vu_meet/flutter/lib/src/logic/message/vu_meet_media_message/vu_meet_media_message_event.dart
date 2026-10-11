import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/get_vu_meet_message_file_req_body_dto.dart';
import 'package:equatable/equatable.dart';

sealed class VuMeetMediaMessageEvent extends Equatable {
  const VuMeetMediaMessageEvent();

  @override
  List<Object?> get props => [];
}

class GetVuMeetMessageFile extends VuMeetMediaMessageEvent {
  final GetVuMeetMessageFileReqBodyDto dto;
  const GetVuMeetMessageFile(this.dto);

  @override
  List<Object?> get props => [dto];
}

class AddLocalMediaFile extends VuMeetMediaMessageEvent {
  final MediaFileModel file;
  const AddLocalMediaFile(this.file);

  @override
  List<Object?> get props => [file];
}
