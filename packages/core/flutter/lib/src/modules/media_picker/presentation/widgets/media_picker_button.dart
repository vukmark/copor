import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/error/media_picker_failures.dart';
import 'package:copor_core/src/modules/media_picker/presentation/cubit/media_picker_cubit.dart';
import 'package:copor_core/src/modules/media_picker/presentation/cubit/media_picker_state.dart';
import 'package:copor_core/src/modules/media_picker/domain/entities/media_picker_translations.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:copor_scaffold/copor_scaffold.dart' show DSBanner;
import 'package:permission_handler/permission_handler.dart';

class MediaPickerButton extends StatefulWidget {
  final MediaPickerTranslations translations;

  const MediaPickerButton({super.key, required this.translations});

  @override
  State<MediaPickerButton> createState() => _MediaPickerButtonState();
}

class _MediaPickerButtonState extends State<MediaPickerButton> with SingleTickerProviderStateMixin {
  static const _animationDuration = Duration(milliseconds: 400);

  OverlayEntry? _overlayEntry;
  final _buttonKey = GlobalKey();
  late final AnimationController _animationController;
  late final Animation<double> _scaleAnimation;
  late final Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(vsync: this, duration: _animationDuration);
    _scaleAnimation = CurvedAnimation(parent: _animationController, curve: Curves.easeOutBack);
    _fadeAnimation = CurvedAnimation(parent: _animationController, curve: Curves.easeIn);
  }

  @override
  void dispose() {
    _removeOverlay();
    _animationController.dispose();
    super.dispose();
  }

  void _removeOverlay() {
    _animationController.reverse().then((_) {
      _overlayEntry?.remove();
      _overlayEntry = null;
    });
  }

  @override
  Widget build(BuildContext context) {
    return BlocListener<MediaPickerCubit, MediaPickerState>(
      listenWhen: (prev, curr) => curr.failure != null && curr.failure != prev.failure,
      listener: (context, state) {
        if (state.failure?.message == MediaPickerFailureKeys.cameraPermissionPermanentlyDenied) {
          _showPermissionDialog(context);
        } else if (state.failure?.responseCode == 413) {
          _showFileTooLargeDialog(context, state.failure?.message);
        } else if (state.failure != null && state.failure!.message != '') {
          final translatedFailure = translateFailure(state.failure!, widget.translations);
          context.getBloc.appScaffold.addBanner(
            DSBanner.error(translatedFailure.message, source: 'media_picker_key'),
          );
        }
      },
      child: IconButton(
        key: _buttonKey,
        onPressed: () => _togglePopup(context),
        icon: const Icon(PhosphorIconsThin.paperclip),
      ),
    );
  }

  void _showPermissionDialog(BuildContext context) {
    DTDialog.showConfirm(
      context,
      title: widget.translations.CAMERA_PERMISSION_REQUIRED_TITLE,
      content: widget.translations.CAMERA_PERMISSION_REQUIRED_TITLE,
      cancelLabel: widget.translations.CANCEL,
      confirmLabel: widget.translations.OPEN_SETTINGS,
    ).then((confirmed) {
      if (confirmed == true) openAppSettings();
    });
  }

  void _showFileTooLargeDialog(BuildContext context, String? message) {
    final maxFileSize = context.read<MediaPickerCubit>().maxFileSize;
    showDialog<void>(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: Text(widget.translations.FILE_TOO_LARGE),
        content: Text('${message ?? ''}\n${widget.translations.MAXIMUM_FILE_IS} $maxFileSize MB'),
        actions: [
          TextButton(onPressed: () => Navigator.of(dialogContext).pop(), child: const Text('OK')),
        ],
      ),
    );
  }

  void _togglePopup(BuildContext context) {
    if (!context.isMobilePlatform) {
      context.read<MediaPickerCubit>().pickFromFileSystem();
      return;
    }

    if (_overlayEntry != null) {
      _removeOverlay();
      return;
    }

    final renderBox = _buttonKey.currentContext?.findRenderObject() as RenderBox?;
    if (renderBox == null) return;

    _overlayEntry = OverlayEntry(
      builder: (_) => _PopupOverlay(
        buttonOffset: renderBox.localToGlobal(Offset.zero),
        buttonSize: renderBox.size,
        scaleAnimation: _scaleAnimation,
        fadeAnimation: _fadeAnimation,
        onDismiss: _removeOverlay,
        actions: _buildActions(context),
      ),
    );

    Overlay.of(context).insert(_overlayEntry!);
    _animationController.forward(from: 0);
  }

  List<PopupAction> _buildActions(BuildContext context) {
    final cubit = context.read<MediaPickerCubit>();
    return [
      PopupAction(
        icon: PhosphorIconsThin.camera,
        onTap: () {
          cubit.captureFromCamera();
          _removeOverlay();
        },
      ),
      PopupAction(
        icon: PhosphorIconsThin.images,
        onTap: () {
          cubit.pickFromGallery();
          _removeOverlay();
        },
      ),
      PopupAction(
        icon: PhosphorIconsThin.folder,
        onTap: () {
          cubit.pickFromFileSystem();
          _removeOverlay();
        },
      ),
    ];
  }
}

class _PopupOverlay extends StatelessWidget {
  const _PopupOverlay({
    required this.buttonOffset,
    required this.buttonSize,
    required this.scaleAnimation,
    required this.fadeAnimation,
    required this.onDismiss,
    required this.actions,
  });

  final Offset buttonOffset;
  final Size buttonSize;
  final Animation<double> scaleAnimation;
  final Animation<double> fadeAnimation;
  final VoidCallback onDismiss;
  final List<PopupAction> actions;

  static const double _itemWidth = 48.0;
  static const double _popupHeight = 72.0;
  static const double _horizontalPadding = 8.0;
  static const double _screenEdgeMargin = 8.0;
  static const double _gapBelowPopup = 6.0;

  @override
  Widget build(BuildContext context) {
    final popupWidth = actions.length * _itemWidth + _horizontalPadding * 2;

    final rawLeft = buttonOffset.dx + buttonSize.width / 2 - popupWidth / 2;
    final top = buttonOffset.dy - _popupHeight - _gapBelowPopup;

    final screenWidth = MediaQuery.sizeOf(context).width;
    final left = rawLeft.clamp(_screenEdgeMargin, screenWidth - popupWidth - _screenEdgeMargin);

    return Stack(
      children: [
        Positioned.fill(
          child: GestureDetector(onTap: onDismiss, behavior: HitTestBehavior.translucent),
        ),
        Positioned(
          left: left,
          top: top,
          child: FadeTransition(
            opacity: fadeAnimation,
            child: ScaleTransition(
              scale: scaleAnimation,
              alignment: Alignment.bottomCenter,
              child: _PopupCard(actions: actions),
            ),
          ),
        ),
      ],
    );
  }
}

class _PopupCard extends StatelessWidget {
  const _PopupCard({required this.actions});

  final List<PopupAction> actions;

  static const _backgroundColor = Color(0xFF4A4A4A);
  static const _shadowColor = Color(0x40000000);
  static const _borderRadius = 16.0;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
        decoration: BoxDecoration(
          color: _backgroundColor,
          borderRadius: BorderRadius.circular(_borderRadius),
          boxShadow: const [BoxShadow(color: _shadowColor, blurRadius: 12, offset: Offset(0, 4))],
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: actions.map((action) => _ActionItem(action: action)).toList(),
        ),
      ),
    );
  }
}

class _ActionItem extends StatelessWidget {
  const _ActionItem({required this.action});

  final PopupAction action;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: action.onTap,
      borderRadius: BorderRadius.circular(10),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
        child: Icon(action.icon, color: Colors.white, size: 20),
      ),
    );
  }
}

class PopupAction {
  const PopupAction({required this.icon, required this.onTap});

  final IconData icon;
  final VoidCallback onTap;
}
