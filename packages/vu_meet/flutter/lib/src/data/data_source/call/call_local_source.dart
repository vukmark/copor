import 'package:shared_preferences/shared_preferences.dart';

abstract class CallLocalDataSource {
  Future<void> save(String chatId, DateTime connectedAt);

  Future<DateTime?> getConnectedAtFor(String chatId);

  Future<void> clear();
}

/// Persists the currently connected call's start time across process restarts
/// (a dev hot restart, or the OS killing/restoring a backgrounded app in
/// production) so [CallBloc] can restore the real elapsed duration instead of
/// resetting the "Return to call" pill's timer to 00:00 when the app rebuilds
/// while a call is still active.
class CallLocalDataSourceImpl implements CallLocalDataSource {
  static const _chatIdKey = 'active_call_chat_id';
  static const _connectedAtKey = 'active_call_connected_at';

  @override
  Future<void> save(String chatId, DateTime connectedAt) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_chatIdKey, chatId);
    await prefs.setString(_connectedAtKey, connectedAt.toIso8601String());
  }

  @override
  Future<DateTime?> getConnectedAtFor(String chatId) async {
    final prefs = await SharedPreferences.getInstance();
    if (prefs.getString(_chatIdKey) != chatId) return null;
    final stored = prefs.getString(_connectedAtKey);
    return stored != null ? DateTime.tryParse(stored) : null;
  }

  @override
  Future<void> clear() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_chatIdKey);
    await prefs.remove(_connectedAtKey);
  }
}
