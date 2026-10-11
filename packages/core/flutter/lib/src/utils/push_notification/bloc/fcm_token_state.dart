abstract class FcmTokenState {}

class FcmTokenInitial extends FcmTokenState {}

class FcmTokenSaving extends FcmTokenState {}

class FcmTokenSaveSuccess extends FcmTokenState {}

class FcmTokenSaveFailure extends FcmTokenState {
  final String error;
  FcmTokenSaveFailure(this.error);
}
