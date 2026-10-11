import 'package:copor_scaffold/copor_scaffold.dart' show DSNotificationDestination;

/// App-specific [DSNotificationDestination] constants.
///
/// Each key identifies a badge-bearing surface in the app.
/// Use these constants everywhere instead of raw strings to avoid typos
/// and make destinations easy to grep.
///
/// ```dart
/// // Increment when a vuMeet message arrives:
/// scaffoldCubit.incrementBadgeCount(NotificationDestinations.vuMeet.key);
/// scaffoldCubit.incrementBadgeCount(NotificationDestinations.bell.key);
///
/// // Clear when the user opens the vuMeet tab:
/// scaffoldCubit.clearBadgeCount(NotificationDestinations.vuMeet.key);
/// ```
abstract final class NotificationDestinations {
  /// Standard notification bell in the app bar — end drawer badge.
  /// Cleared automatically when the end drawer is opened.
  static const DSNotificationDestination bell = DSNotificationDestination.bell;

  /// VuMeet bottom-nav item badge.
  static const DSNotificationDestination vuMeet = DSNotificationDestination('vu_meet');

  /// Desk (to-do/home) bottom-nav item badge.
  static const DSNotificationDestination desk = DSNotificationDestination('desk');
}
