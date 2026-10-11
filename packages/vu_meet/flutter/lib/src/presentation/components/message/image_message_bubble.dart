import 'package:copor_vu_meet/src/data/model/vu_meet_message/get_vu_meet_message_file_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/vu_meet_message_model.dart';
import 'package:copor_vu_meet/src/data/model/translation/vu_meet_translation.dart';
import 'package:copor_vu_meet/src/logic/message/vu_meet_media_message/vu_meet_media_message_bloc.dart';
import 'package:copor_vu_meet/src/logic/message/vu_meet_media_message/vu_meet_media_message_event.dart';
import 'package:copor_vu_meet/src/presentation/components/message/bubble_loader_atom.dart';
import 'package:copor_vu_meet/src/presentation/components/message/message_bubble_radius.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class ImageMessageBubble extends HookWidget {
  final VuMeetMessageItemModel message;
  final VuMeetPageTranslation translations;

  const ImageMessageBubble({super.key, required this.message, required this.translations});

  @override
  Widget build(BuildContext context) {
    final state = context.watch<VuMeetMediaMessageBloc>().state;
    final file = state.result?.data[message.id];

    useEffect(() {
      if (file == null &&
          !state.loadingIds.contains(message.id) &&
          !state.failedIds.contains(message.id)) {
        context.read<VuMeetMediaMessageBloc>().add(
          GetVuMeetMessageFile(
            GetVuMeetMessageFileReqBodyDto(fileId: message.id, fileName: message.messageContent),
          ),
        );
      }
      return null;
    }, [message.id]);

    final borderRadius = getMessageBubbleRadius(message: message);

    return file != null
        ? file.getChatPreview(
            context,
            translations,
            borderRadius: borderRadius,
            isOwnMessage: message.isOwn,
          )
        : BubbleLoaderAtom(borderRadius: borderRadius);
  }
}
