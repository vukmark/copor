import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_vu_meet/src/data/data_source/call/call_remote_source.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_video_call/decline_call_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_video_call/make_video_call_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/repository_impl/call/call_repository.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

class CallRepositoryImpl extends BaseRepository implements CallRepository {
  final CallRemoteDataSource remoteDataSource;

  CallRepositoryImpl({
    required this.remoteDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<void>>> makeVideoCallAction(
    MakeVideoCallActionReqBodyDto requestDto,
  ) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.makeVideoCallAction(requestDto);
        });
      },
    );
  }

  @override
  Future<Either<Failure, Result<void>>> declineCall(
    DeclineCallReqBodyDto numberOfDeclinedCalls,
  ) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.declineCall(numberOfDeclinedCalls);
        });
      },
    );
  }
}
