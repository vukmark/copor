import 'package:copor_vu_meet/src/data/model/vu_meet_video_call/decline_call_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_video_call/make_video_call_req_body_dto.dart';
import 'package:retrofit/retrofit.dart';
import 'package:dio/dio.dart';

part 'call_remote_source.g.dart';

abstract class CallRemoteDataSource {
  Future<void> makeVideoCallAction(MakeVideoCallActionReqBodyDto requestDto);
  Future<void> declineCall(DeclineCallReqBodyDto dto);
}

@RestApi()
abstract class CallRemoteDataSourceImpl implements CallRemoteDataSource {
  factory CallRemoteDataSourceImpl(Dio dio, {String baseUrl}) = _CallRemoteDataSourceImpl;

  @override
  @POST('/vu-meet/chat/call')
  Future<void> makeVideoCallAction(@Body() MakeVideoCallActionReqBodyDto message);

  @override
  @POST('/vu-meet/chat/decline-call')
  Future<void> declineCall(@Body() DeclineCallReqBodyDto body);
}
