import 'package:flutter_bloc/flutter_bloc.dart';
import 'ds_banner.dart';
import 'ds_banner_state.dart';

class DSBannerCubit extends Cubit<DSBannerState> {
  DSBannerCubit() : super(const DSBannerState());

  bool _isBannerShown = false;

  String? _route;

  bool get isBannerShown => _isBannerShown;

  void addBanner(DSBanner banner) {
    if (state.banner == banner) return;
    _isBannerShown = false;
    emit(DSBannerState(banner: banner));
  }

  void removeBanner() {
    if (!state.hasBanner) return;
    _isBannerShown = false;
    emit(const DSBannerState());
  }

  void clearBanners() => removeBanner();

  void markBannerShown(DSBanner banner) {
    if (state.banner == banner) _isBannerShown = true;
  }

  void notifyRouteChanged(String route) {
    if (route == _route) return;
    _route = route;
    if (_isBannerShown) removeBanner();
  }
}
