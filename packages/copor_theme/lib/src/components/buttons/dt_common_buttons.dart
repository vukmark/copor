import 'package:copor_theme/src/components/buttons/dt_button.dart';
import 'package:copor_theme/src/components/display/dt_badge.dart';
import 'package:copor_theme/src/utils/dt_icons.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

/// Pre-configured icon buttons for common recurring actions.
///
/// Each method returns a fully styled, size-appropriate button — callers
/// only supply the data / callbacks they care about.
///
/// - [DTCommonButtons.info]           — toggleable info disclosure (xs)
/// - [DTCommonButtons.warningToggle]  — toggleable disclosure that can flag a problem (xs)
/// - [DTCommonButtons.copy]           — copy-to-clipboard (xs)
/// - [DTCommonButtons.document]       — document/PDF action (small, file icon)
/// - [DTCommonButtons.edit]           — edit row/record (small, pen icon)
/// - [DTCommonButtons.delete]         — delete row/record (small, trash icon)
/// - [DTCommonButtons.action]         — neutral action with custom icon (small)
/// - [DTCommonButtons.negativeAction] — destructive action with custom icon (small)
class DTCommonButtons {
  const DTCommonButtons._();

  /// Toggleable info icon — reveals supplemental help content when active.
  static Widget info({
    Key? key,
    required bool isActive,
    String? semanticLabel,
    required VoidCallback onPressed,
    DTInputSize size = DTInputSize.xs,
    Color? borderColor,
  }) => DTButton.toggle(
    key: key,
    icon: DTIcons.info,
    semanticLabel: semanticLabel,
    isToggled: isActive,
    onPressed: onPressed,
    inputSize: size,
    borderColor: borderColor,
  );

  /// Toggleable disclosure icon that also flags a problem: same expand/
  /// collapse behavior as [info], but renders in DTBanner.warning's colors
  /// while [isWarning] is true, regardless of [isActive].
  static Widget warningToggle({
    Key? key,
    required IconData icon,
    required bool isActive,
    required bool isWarning,
    String? semanticLabel,
    required VoidCallback onPressed,
    DTInputSize size = DTInputSize.xs,
  }) => DTButton.toggle(
    key: key,
    icon: icon,
    semanticLabel: semanticLabel,
    isToggled: isActive,
    warning: isWarning,
    onPressed: onPressed,
    inputSize: size,
  );

  /// Copy-to-clipboard button with an optional success message.
  static Widget copy({
    Key? key,
    required String value,
    String? semanticLabel,
    required VoidCallback onCopied,
    DTInputSize size = DTInputSize.xs,
  }) => _CopyButton(
    key: key,
    value: value,
    onCopied: onCopied,
    semanticLabel: semanticLabel,
    inputSize: size,
  );

  /// Document action button — neutral style, small by default.
  /// Used for document/PDF viewing actions.
  static Widget document({
    Key? key,
    String? semanticLabel,
    required VoidCallback onPressed,
    DTInputSize size = DTInputSize.small,
  }) => DTButton.surface(
    key: key,
    icon: DTIcons.filePdf,
    label: '',
    semanticLabel: semanticLabel,
    onPressed: onPressed,
    inputSize: size,
  );

  /// Edit action button — outlined neutral style, small by default.
  static Widget edit({
    Key? key,
    String? semanticLabel,
    required VoidCallback onPressed,
    DTInputSize size = DTInputSize.small,
  }) => DTButton.surface(
    key: key,
    icon: DTIcons.edit,
    label: '',
    semanticLabel: semanticLabel,
    onPressed: onPressed,
    inputSize: size,
  );

  /// Delete action button — error-coloured style, small by default.
  static Widget delete({
    Key? key,
    String? semanticLabel,
    required VoidCallback onPressed,
    DTInputSize size = DTInputSize.small,
  }) => DTButton.surface(
    key: key,
    icon: DTIcons.delete,
    label: '',
    semanticLabel: semanticLabel,
    onPressed: onPressed,
    inputSize: size,
  );

  /// Neutral action with a caller-supplied icon.
  static Widget action({
    Key? key,
    required IconData icon,
    String? semanticLabel,
    required VoidCallback onPressed,
    DTInputSize size = DTInputSize.small,
  }) => DTButton.surface(
    key: key,
    icon: icon,
    label: '',
    semanticLabel: semanticLabel,
    onPressed: onPressed,
    inputSize: size,
  );

  /// Theme toggle — sun in light mode, moon in dark mode.
  static Widget theme({
    Key? key,
    required bool isDark,
    required VoidCallback onPressed,
    bool border = true,
  }) => DTButton.floating(
    key: key,
    icon: isDark ? DTIcons.themeDark : DTIcons.themeLight,
    label: '',
    semanticLabel: isDark ? 'Switch to light' : 'Switch to dark',
    border: border,
    onPressed: onPressed,
  );

  /// Theme toggle with a text label.
  static Widget themeLabeled({
    Key? key,
    required bool isDark,
    required VoidCallback onPressed,
    bool border = true,
  }) => DTButton.floating(
    key: key,
    icon: isDark ? DTIcons.themeDark : DTIcons.themeLight,
    label: isDark ? 'Dark' : 'Light',
    semanticLabel: isDark ? 'Switch to light' : 'Switch to dark',
    border: border,
    onPressed: onPressed,
  );

  /// Notification bell button with an automatic [DTBadge] overlay.
  ///
  /// Pass [unreadCount] to show a badge; when zero the badge is hidden.
  /// Mirrors [DTCommonButtons.theme] in API shape — all visual, no BLoC.
  ///
  /// ```dart
  /// DTCommonButtons.notification(
  ///   unreadCount: 3,
  ///   border: !context.isMobile,
  ///   onPressed: () => Scaffold.of(context).openEndDrawer(),
  /// )
  /// ```
  static Widget notification({
    Key? key,
    int unreadCount = 0,
    IconData icon = DTIcons.notification,
    String? semanticLabel,
    bool border = false,
    required VoidCallback onPressed,
  }) => _NotificationButton(
    key: key,
    unreadCount: unreadCount,
    icon: icon,
    semanticLabel: semanticLabel ?? 'Notifications',
    border: border,
    onPressed: onPressed,
  );

  /// Destructive action with a caller-supplied icon.
  static Widget negativeAction({
    Key? key,
    required IconData icon,
    String? semanticLabel,
    required VoidCallback onPressed,
    DTInputSize size = DTInputSize.small,
  }) => DTButton.surface(
    key: key,
    icon: icon,
    label: '',
    semanticLabel: semanticLabel,
    onPressed: onPressed,
    inputSize: size,
  );
}

// ── Private implementation widgets ────────────────────────────────────────────

class _NotificationButton extends StatelessWidget {
  final int unreadCount;
  final IconData icon;
  final String? semanticLabel;
  final bool border;
  final VoidCallback onPressed;

  const _NotificationButton({
    super.key,
    required this.unreadCount,
    required this.icon,
    required this.semanticLabel,
    required this.border,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return Stack(
      clipBehavior: Clip.none,
      children: [
        DTButton.floating(
          icon: icon,
          label: '',
          semanticLabel: semanticLabel ?? 'Notifications',
          border: border,
          onPressed: onPressed,
        ),
        if (unreadCount > 0)
          Positioned(bottom: -5, right: -5, child: DTBadge(count: unreadCount)),
      ],
    );
  }
}

class _CopyButton extends StatelessWidget {
  final String value;
  final VoidCallback onCopied;
  final String? semanticLabel;
  final DTInputSize inputSize;

  const _CopyButton({
    super.key,
    required this.value,
    required this.onCopied,
    required this.semanticLabel,
    required this.inputSize,
  });

  @override
  Widget build(BuildContext context) {
    return DTButton.surface(
      icon: DTIcons.copy,
      label: '',
      semanticLabel: semanticLabel ?? 'Copy',
      inputSize: inputSize,
      onPressed: value.isEmpty
          ? () {}
          : () {
              Clipboard.setData(ClipboardData(text: value));
              onCopied();
            },
    );
  }
}
