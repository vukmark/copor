import 'package:copor_vu_meet/src/config/vu_meet_module.dart';
import 'package:copor_core/src/data/model/media_file/file_types/document_file_model.dart';
import 'package:copor_core/src/data/model/media_file/file_types/image_file_model/image_file_model.dart';
import 'package:copor_core/src/data/model/media_file/file_types/unsupported_file_model.dart';
import 'package:copor_core/src/modules/media_picker/data/repositories/media_repository_impl.dart';
import 'package:copor_core/src/modules/media_picker/presentation/cubit/media_picker_cubit.dart';
import 'package:copor_core/src/modules/preferences/bloc/preferences_bloc.dart';
import 'package:copor_vu_meet/src/logic/utils/vu_meet_bloc_event_dispatcher.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/send_vu_meet_file_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/send_vu_meet_message_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/typing_status_req_body.dart';
import 'package:copor_vu_meet/src/data/model/translation/vu_meet_translation.dart';
import 'package:copor_vu_meet/src/logic/message/vu_meet_message/vu_meet_message_bloc.dart';
import 'package:copor_vu_meet/src/logic/message/vu_meet_message/vu_meet_message_event.dart';
import 'package:copor_vu_meet/src/logic/message/vu_meet_message/vu_meet_message_state.dart';
import 'package:copor_vu_meet/src/presentation/components/chat/message_feed.dart';
import 'package:copor_vu_meet/src/presentation/components/chat/message_input.dart';
import 'package:copor_vu_meet/src/presentation/components/chat/typing_indicator.dart'
    show TypingIndicator, typingToMessageCrossfadeDuration;
import 'package:copor_vu_meet/src/helpers/typing_data.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:copor_core/src/config/dependency_injection.dart';

class ConversationView extends HookWidget {
  final String chatId;
  final String picture;
  final bool isPrivate;
  final VuMeetPageTranslation translations;

  const ConversationView({
    super.key,
    required this.chatId,
    required this.picture,
    required this.isPrivate,
    required this.translations,
  });

  @override
  Widget build(BuildContext context) {
    final messageController = useTextEditingController();

    return BlocProvider(
      create: (context) => MediaPickerCubit(
        mediaRepository: MediaRepositoryImpl(),
        maxFileSize: context.read<PreferencesBloc>().state.result?.data.moduleMaxFileSize(VuMeetModule.moduleName) ?? 1,
      ),
      child: BlocProvider<VuMeetMessageBloc>.value(
        value: getIt<VuMeetMessageBloc>(),
        child: MultiBlocListener(
          listeners: [
            BlocListener<VuMeetMessageBloc, VuMeetMessageState>(
              listenWhen: (prev, curr) => curr.failure != null && curr.failure != prev.failure,
              listener: (context, state) {
                if (state.failure?.responseCode == 413) {
                  _showFileTooLargeDialog(context);
                }
                context.read<VuMeetMessageBloc>().add(const ClearVuMeetMessageFailure());
              },
            ),
            BlocListener<VuMeetMessageBloc, VuMeetMessageState>(
              listenWhen: (prev, curr) =>
                  curr.justArrivedMessageId != null &&
                  curr.justArrivedMessageId != prev.justArrivedMessageId,
              listener: (context, state) {
                // One-shot: let the crossfade play out, then clear the flag
                // so a later, unrelated typing-stop in this chat goes back
                // to its normal instant disappearance.
                Future.delayed(
                  typingToMessageCrossfadeDuration + const Duration(milliseconds: 50),
                  () {
                    if (context.mounted) {
                      context.read<VuMeetMessageBloc>().add(const ClearJustArrivedMessage());
                    }
                  },
                );
              },
            ),
          ],
          child: Builder(
            builder: (context) => Center(
              child: Container(
                color: CoporColors.of(context).surface,
                constraints: const BoxConstraints(maxWidth: 800),
                child: Column(
                  children: [
                    Expanded(
                      child: MessageFeed(isPrivate: isPrivate, translations: translations),
                    ),
                    TypingIndicator(chatId: chatId, translations: translations),
                    _getMessageInput(context, messageController),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _getMessageInput(BuildContext context, TextEditingController controller) {
    return MessageInput(
      messageController: controller,
      onSendPressed: () => _sendMessage(context, controller),
      isSendButtonEnabled: true,
      translations: translations,
      onTypingStatusChanged: (isTyping) async {
        final status = isTyping ? TypingStatus.startedTyping : TypingStatus.stoppedTyping;
        await _emitTypingStatusUpdate(status);
      },
    );
  }

  Future<void> _emitTypingStatusUpdate(TypingStatus typingStatus) async {
    final body = TypingStatusReqBody(chatId: chatId, typingStatus: typingStatus);
    VuMeetDispatcher.messages.changeTypingStatus(body);
  }

  Future<void> _sendMessage(BuildContext context, TextEditingController controller) async {
    final mediaPickerCubit = context.read<MediaPickerCubit>();
    final uploads = mediaPickerCubit.state.uploads;

    if (uploads.isNotEmpty) {
      for (final file in uploads) {
        Uint8List? bytes;
        if (file is ImageFileModel) {
          bytes = file.bytes;
        } else if (file is DocumentFileModel) {
          bytes = file.bytes;
        } else if (file is UnsupportedFileModel) {
          bytes = file.bytes;
        }

        if (bytes != null) {
          if (controller.text.trim().isNotEmpty) {
            VuMeetDispatcher.messages.sendMessage(
              SendVuMeetMessageReqBodyDto(chatId: chatId, content: controller.text),
            );
            controller.clear();
          }

          final messageFileDto = SendVuMeetFileReqBodyDto(
            chatId: chatId,
            content: file.name,
            fileName: file.name,
            fileBytes: bytes,
            mimeType: file.type,
          );

          VuMeetDispatcher.messages.sendFileMessage(messageFileDto);
        }
      }
      mediaPickerCubit.clearUploads();
      return;
    }

    if (controller.text.trim().isEmpty) return;

    VuMeetDispatcher.messages.sendMessage(
      SendVuMeetMessageReqBodyDto(chatId: chatId, content: controller.text),
    );

    mediaPickerCubit.clearUploads();
    controller.clear();
  }

  void _showFileTooLargeDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text(translations.FILE_TOO_LARGE),
          content: Text(translations.FILE_TOO_LARGE_MESSAGE),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: Text(translations.CANCEL),
            ),
          ],
        );
      },
    );
  }
}
