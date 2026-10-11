import 'dart:async';

import 'package:flutter/services.dart';
import 'package:vibration/vibration.dart';

/// Plays a repeating alert sound + vibration for the duration of an in-app
/// call screen (incoming ring or outgoing ringback).
///
/// There's no bundled ringtone/ringback audio asset in this repo yet, so this
/// uses [SystemSound] as an audible placeholder. Swap `_tick`'s SystemSound
/// call for a looping `AudioPlayer` once real ringtone/ringback files are
/// added — start()/stop() and the calling screens don't need to change.
class CallRingController {
  static const _tickInterval = Duration(milliseconds: 1800);

  Timer? _timer;
  bool _isRinging = false;

  void start() {
    if (_isRinging) return;
    _isRinging = true;
    _tick();
    _timer = Timer.periodic(_tickInterval, (_) => _tick());
  }

  void stop() {
    _isRinging = false;
    _timer?.cancel();
    _timer = null;
    Vibration.cancel();
  }

  Future<void> _tick() async {
    if (!_isRinging) return;
    SystemSound.play(SystemSoundType.alert);
    if (await Vibration.hasVibrator()) {
      Vibration.vibrate(duration: 600);
    }
  }
}
