import 'package:equatable/equatable.dart';

enum DSBannerType { error, warning, success, info }

sealed class DSBannerDismiss extends Equatable {
  const DSBannerDismiss();

  static const DSBannerDismiss configDefault = _ConfigDefault();

  static const DSBannerDismiss indefinite = _Indefinite();

  const factory DSBannerDismiss.after(Duration duration) = _After;

  Duration? resolveDuration(
    DSBannerType type,
    Duration? Function(DSBannerType) configProvider,
  );
}

final class _ConfigDefault extends DSBannerDismiss {
  const _ConfigDefault();
  @override
  Duration? resolveDuration(type, configProvider) => configProvider(type);
  @override
  List<Object?> get props => const [];
}

final class _Indefinite extends DSBannerDismiss {
  const _Indefinite();
  @override
  Duration? resolveDuration(type, configProvider) => null;
  @override
  List<Object?> get props => const [];
}

final class _After extends DSBannerDismiss {
  final Duration duration;
  const _After(this.duration);
  @override
  Duration? resolveDuration(type, configProvider) => duration;
  @override
  List<Object?> get props => [duration];
}

class DSBanner extends Equatable {
  final DSBannerType type;
  final String message;

  final String? copiableData;

  final String source;

  final DSBannerDismiss dismiss;

  const DSBanner({
    required this.type,
    required this.message,
    required this.source,
    this.dismiss = DSBannerDismiss.configDefault,
    this.copiableData,
  });

  const DSBanner.error(
    this.message, {
    required this.source,
    this.dismiss = DSBannerDismiss.configDefault,
    this.copiableData,
  }) : type = DSBannerType.error;

  const DSBanner.warning(
    this.message, {
    required this.source,
    this.dismiss = DSBannerDismiss.configDefault,
    this.copiableData,
  }) : type = DSBannerType.warning;

  const DSBanner.success(
    this.message, {
    required this.source,
    this.dismiss = DSBannerDismiss.configDefault,
    this.copiableData,
  }) : type = DSBannerType.success;

  const DSBanner.info(
    this.message, {
    required this.source,
    this.dismiss = DSBannerDismiss.configDefault,
    this.copiableData,
  }) : type = DSBannerType.info;

  @override
  List<Object?> get props => [type, message, source, dismiss, copiableData];
}
