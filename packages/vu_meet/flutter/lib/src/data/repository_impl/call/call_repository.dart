import 'package:dartz/dartz.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_video_call/decline_call_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_video_call/make_video_call_req_body_dto.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

abstract class CallRepository {
  Future<Either<Failure, Result<void>>> makeVideoCallAction(
    MakeVideoCallActionReqBodyDto requestDto,
  );
  Future<Either<Failure, Result<void>>> declineCall(DeclineCallReqBodyDto numberOfDeclinedCalls);
}
