import 'ds_banner.dart';

class DSBannerState {
  final DSBanner? banner;

  const DSBannerState({this.banner});

  bool get hasBanner => banner != null;
}
