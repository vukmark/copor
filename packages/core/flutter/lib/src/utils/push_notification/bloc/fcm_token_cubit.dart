import 'package:copor_core/src/modules/push_notification/model/push_notification_token_save_model.dart';
import 'package:copor_core/src/utils/push_notification/repository_impl/fcm_token_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'fcm_token_state.dart';

class FcmTokenCubit extends Cubit<FcmTokenState> {
  final FcmTokenRepository _tokenRepository;

  FcmTokenCubit(this._tokenRepository) : super(FcmTokenInitial());

  Future<void> saveToken(PushNotificationTokenSaveModel token) async {
    emit(FcmTokenSaving());
    try {
      await _tokenRepository.save(token);
      emit(FcmTokenSaveSuccess());
    } catch (e) {
      emit(FcmTokenSaveFailure(e.toString()));
    }
  }
}
