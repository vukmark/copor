import 'package:flutter/material.dart';
import '../model/ds_breakpoints.dart';

export '../model/ds_breakpoints.dart';

enum DSFormFactor { mobile, tablet, desktop }

extension DSDeviceContext on BuildContext {
  double get _width => MediaQuery.of(this).size.width;

  bool get isMobile => _width < DSBreakpointsScope.of(this).mobile;

  bool get isDesktop => _width >= DSBreakpointsScope.of(this).desktop;

  bool get isTablet => !isMobile && !isDesktop;

  DSFormFactor get formFactor => isDesktop
      ? DSFormFactor.desktop
      : (isTablet ? DSFormFactor.tablet : DSFormFactor.mobile);
}
