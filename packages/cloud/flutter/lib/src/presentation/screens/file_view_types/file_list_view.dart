import 'package:copor_cloud/src/data/model/cloud_file.dart';
import 'package:copor_cloud/src/data/model/cloud_folder.dart';
import 'package:copor_cloud/src/data/model/translation/cloud_translation.dart';
import 'package:copor_cloud/src/presentation/screens/file_view_types/flach_file_list_view.dart';
import 'package:flutter/material.dart';

class FileListView extends StatelessWidget {
  final List<CloudFolder> subfolders;
  final List<CloudFile> files;
  final CloudPageTranslation translations;
  final ValueChanged<List<CloudFile>>? onSelectionChanged;

  const FileListView({
    required this.subfolders,
    required this.files,
    required this.translations,
    this.onSelectionChanged,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return CloudFileTable(
      folders: subfolders,
      files: files,
      translations: translations,
      onSelectionChanged: onSelectionChanged,
      showTypeAndSize: false,
    );
  }
}
