import 'package:desktop_drop/desktop_drop.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/data/model/media_file/mime_type.dart';

Future<List<MediaFileModel>> readDroppedMedia(List<DropItem> droppedItems) async {
  final files = <MediaFileModel>[];

  for (final item in droppedItems.whereType<DropItemFile>()) {
    final bytes = await item.readAsBytes();
    files.add(
      MediaFileModel.fromData(
        name: item.name,
        type: MimeType.detect(item.name, bytes),
        bytes: bytes,
        size: bytes.length,
      ),
    );
  }

  return files;
}
