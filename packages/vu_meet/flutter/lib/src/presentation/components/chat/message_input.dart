import 'dart:async';
import 'package:copor_theme/copor_theme.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/modules/media_picker/presentation/widgets/media_picker_button.dart';
import 'package:copor_core/src/modules/media_picker/presentation/widgets/media_upload_bar.dart';
import 'package:copor_vu_meet/src/data/model/translation/vu_meet_translation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter/foundation.dart';

class MessageInput extends StatefulWidget {
  final TextEditingController messageController;
  final VoidCallback onSendPressed;
  final bool isSendButtonEnabled;
  final Function(bool isTyping) onTypingStatusChanged;
  final VuMeetPageTranslation translations;

  const MessageInput({
    super.key,
    required this.messageController,
    required this.onSendPressed,
    required this.isSendButtonEnabled,
    required this.onTypingStatusChanged,
    required this.translations,
  });

  @override
  MessageInputState createState() => MessageInputState();
}

class MessageInputState extends State<MessageInput> {
  Timer? _typingTimer;
  bool _isTyping = false;

  void _onTextChanged(String value) {
    if (value.isEmpty) {
      _stopTyping();
      return;
    }

    if (!_isTyping) {
      _isTyping = true;
      widget.onTypingStatusChanged(true);
    }

    _typingTimer?.cancel();
    _typingTimer = Timer(const Duration(seconds: 2), _stopTyping);
  }

  void _stopTyping() {
    if (!_isTyping) return;
    _isTyping = false;
    _typingTimer?.cancel();
    widget.onTypingStatusChanged(false);
  }

  void _submitMessage() {
    if (widget.isSendButtonEnabled) {
      _stopTyping();
      widget.onSendPressed();
    }
  }

  late final _focusNode = FocusNode(
    onKeyEvent: (FocusNode node, KeyEvent event) {
      if (!HardwareKeyboard.instance.isShiftPressed &&
          event.logicalKey == LogicalKeyboardKey.enter &&
          kIsWeb) {
        if (event is KeyDownEvent) {
          _submitMessage();
        }
        return KeyEventResult.handled;
      }
      return KeyEventResult.ignored;
    },
  );

  @override
  void dispose() {
    _stopTyping();
    _typingTimer?.cancel();
    _focusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      top: false,
      maintainBottomViewPadding: true,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Padding(padding: EdgeInsets.only(bottom: 8), child: MediaUploadBar()),
            Row(
              children: [
                MediaPickerButton(translations: widget.translations),
                Expanded(
                  child: DTInputField(
                    controller: widget.messageController,
                    focusNode: _focusNode,
                    label: '',
                    hintText: widget.translations.MESSAGE,
                    minLines: 1,
                    maxLines: 3,
                    padding: EdgeInsets.zero,
                    onChanged: _onTextChanged,
                  ),
                ),
                DTButton.surface(
                  icon: DTIcons.send,
                  label: '',
                  border: false,
                  semanticLabel: context.getState.commonTranslation.ensuredData.SEND,
                  onPressed: _submitMessage,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
