import 'package:copor_core/src/core/security/biometric_preferences.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:local_auth/local_auth.dart';
import 'package:shared_preferences/shared_preferences.dart';

class BiometricAppLock extends StatefulWidget {
  final Widget child;
  final SharedPreferences sharedPreferences;
  final bool isAuthenticated;
  final String? userId;

  const BiometricAppLock({
    super.key,
    required this.child,
    required this.sharedPreferences,
    required this.isAuthenticated,
    required this.userId,
  });

  @override
  State<BiometricAppLock> createState() => _BiometricAppLockState();
}

class _BiometricAppLockState extends State<BiometricAppLock> with WidgetsBindingObserver {
  final LocalAuthentication _localAuthentication = LocalAuthentication();

  late bool _isUnlocked;
  bool _isAuthenticating = false;
  bool _canDisableBiometricUnlock = false;
  String? _errorMessage;

  bool get _isSupportedPlatform {
    if (kIsWeb) return false;

    return switch (defaultTargetPlatform) {
      TargetPlatform.android || TargetPlatform.iOS || TargetPlatform.macOS => true,
      _ => false,
    };
  }

  bool get _isBiometricUnlockEnabled {
    final userId = widget.userId;
    if (!widget.isAuthenticated || userId == null || userId.isEmpty) return false;

    return widget.sharedPreferences
            .getStringList(BiometricPreferences.userIdsKey)
            ?.contains(userId) ??
        false;
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _isUnlocked = !_isBiometricUnlockEnabled || !_isSupportedPlatform;

    if (!_isUnlocked) {
      WidgetsBinding.instance.addPostFrameCallback((_) => _authenticate());
    }
  }

  @override
  void didUpdateWidget(covariant BiometricAppLock oldWidget) {
    super.didUpdateWidget(oldWidget);

    if (!_isBiometricUnlockEnabled || !_isSupportedPlatform) {
      _isUnlocked = true;
      _errorMessage = null;
      return;
    }

    final startedAuthenticatedSession = !oldWidget.isAuthenticated && widget.isAuthenticated;
    final authenticatedUserChanged = oldWidget.userId != widget.userId;
    if (startedAuthenticatedSession || authenticatedUserChanged) {
      _isUnlocked = false;
      WidgetsBinding.instance.addPostFrameCallback((_) => _authenticate());
    }
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (!_isBiometricUnlockEnabled || !_isSupportedPlatform) return;

    if ((state == AppLifecycleState.paused || state == AppLifecycleState.hidden) && _isUnlocked) {
      setState(() => _isUnlocked = false);
    } else if (state == AppLifecycleState.resumed && !_isUnlocked) {
      _authenticate();
    }
  }

  Future<void> _authenticate() async {
    if (_isAuthenticating || _isUnlocked) return;

    setState(() {
      _isAuthenticating = true;
      _canDisableBiometricUnlock = false;
      _errorMessage = null;
    });

    try {
      final didAuthenticate = await _localAuthentication.authenticate(
        localizedReason: 'Authenticate to unlock Copor',
        biometricOnly: true,
        persistAcrossBackgrounding: true,
      );

      if (!mounted) return;
      setState(() {
        _isUnlocked = didAuthenticate;
        _errorMessage = didAuthenticate ? null : 'Authentication was not successful.';
      });
    } on LocalAuthException catch (error) {
      if (_meansBiometricsAreUnavailable(error.code)) {
        if (!mounted) return;
        setState(() {
          _canDisableBiometricUnlock = true;
          _errorMessage = 'No biometric authentication is registered on this device.';
        });
        return;
      }

      if (!mounted) return;
      setState(() => _errorMessage = 'Authentication was not successful. Please try again.');
    } catch (_) {
      if (!mounted) return;
      setState(() => _errorMessage = 'Biometric authentication is currently unavailable.');
    } finally {
      if (mounted) setState(() => _isAuthenticating = false);
    }
  }

  bool _meansBiometricsAreUnavailable(LocalAuthExceptionCode code) {
    return code == LocalAuthExceptionCode.noBiometricHardware ||
        code == LocalAuthExceptionCode.noBiometricsEnrolled ||
        code == LocalAuthExceptionCode.noCredentialsSet;
  }

  Future<void> _disableBiometricUnlock() async {
    final userId = widget.userId;
    if (userId == null) return;

    final userIds = {...?widget.sharedPreferences.getStringList(BiometricPreferences.userIdsKey)}
      ..remove(userId);
    await widget.sharedPreferences.setStringList(BiometricPreferences.userIdsKey, userIds.toList());
    if (!mounted) return;
    setState(() {
      _isUnlocked = true;
      _canDisableBiometricUnlock = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_isUnlocked) return widget.child;

    return ColoredBox(
      color: Theme.of(context).colorScheme.surface,
      child: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(Icons.fingerprint, size: 72, color: Theme.of(context).colorScheme.primary),
              const SizedBox(height: 24),
              Text('Copor is locked', style: Theme.of(context).textTheme.headlineSmall),
              if (_errorMessage != null) ...[
                const SizedBox(height: 12),
                Text(
                  _errorMessage!,
                  textAlign: TextAlign.center,
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              ],
              const SizedBox(height: 24),
              FilledButton.icon(
                onPressed: _isAuthenticating ? null : _authenticate,
                icon: _isAuthenticating
                    ? const SizedBox.square(
                        dimension: 18,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : const Icon(Icons.fingerprint),
                label: const Text('Unlock'),
              ),
              if (_canDisableBiometricUnlock) ...[
                const SizedBox(height: 12),
                TextButton(
                  onPressed: _disableBiometricUnlock,
                  child: const Text('Disable biometric unlock'),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
