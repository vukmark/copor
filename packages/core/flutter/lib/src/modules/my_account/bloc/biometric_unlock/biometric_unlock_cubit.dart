import 'package:bloc/bloc.dart';
import 'package:copor_core/src/core/security/biometric_preferences.dart';
import 'package:shared_preferences/shared_preferences.dart';

class BiometricUnlockCubit extends Cubit<bool> {
  final SharedPreferences _sharedPreferences;
  final String _userId;

  BiometricUnlockCubit({required SharedPreferences sharedPreferences, required String userId})
    : _sharedPreferences = sharedPreferences,
      _userId = userId,
      super(
        sharedPreferences.getStringList(BiometricPreferences.userIdsKey)?.contains(userId) ?? false,
      );

  Future<void> setEnabled(bool enabled) async {
    final previousValue = state;
    emit(enabled);

    final userIds = {...?_sharedPreferences.getStringList(BiometricPreferences.userIdsKey)};
    if (enabled) {
      userIds.add(_userId);
    } else {
      userIds.remove(_userId);
    }

    final wasSaved = await _sharedPreferences.setStringList(
      BiometricPreferences.userIdsKey,
      userIds.toList(),
    );
    if (!wasSaved) {
      emit(previousValue);
    }
  }
}
