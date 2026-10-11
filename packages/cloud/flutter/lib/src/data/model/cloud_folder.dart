import 'package:copor_core/src/components/highlighted_text.dart';
import 'package:copor_cloud/src/config/cloud_file_names.dart';
import 'package:copor_cloud/src/data/model/translation/cloud_translation.dart';
import 'package:copor_cloud/src/presentation/cubit/drive_page_cubit.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:json_annotation/json_annotation.dart';
import 'cloud_file.dart';

part 'cloud_folder.g.dart';

@JsonSerializable()
class CloudFolder extends Equatable {
  final String name;
  final String uploadEndpoint;
  final List<CloudFolder> subfolders;
  final List<CloudFile> files;

  const CloudFolder({
    required this.name,
    required this.uploadEndpoint,
    this.subfolders = const [],
    this.files = const [],
  });

  factory CloudFolder.fromJson(Map<String, dynamic> json) => _$CloudFolderFromJson(json);

  Map<String, dynamic> toJson() => _$CloudFolderToJson(this);

  String? get cloudGroupId {
    final segments = uploadEndpoint.split('/').where((s) => s.isNotEmpty).toList();
    if (segments.length >= 3) {
      return segments[2];
    }
    return null;
  }

  String? get cloudGroupRootId {
    final segments = uploadEndpoint.split('/').where((s) => s.isNotEmpty).toList();
    if (segments.length == 3 && segments[1] == 'USER_GROUP') {
      return segments[2];
    }
    return null;
  }

  bool get isCarrierBacked => files.any((file) => CloudFileNames.isFolderCarrier(file.name));

  /// True for the tree root, which has no upload endpoint of its own - uploads there are
  /// admin-only.
  ///
  /// The Public folder is deliberately *not* restricted: it only ever appears in a user's
  /// tree as their own Public folder, and its owner has full upload/delete control over
  /// everything inside it (backend task 382).
  static bool isRestrictedUploadEndpoint(String? uploadEndpoint) {
    return (uploadEndpoint ?? '').isEmpty;
  }

  @override
  List<Object?> get props => [name, uploadEndpoint, subfolders, files];

  Widget folderListPreview(BuildContext context, CloudPageTranslation translations) {
    final cubit = context.read<DrivePageCubit>();

    return DTListTile.surface(
      icon: PhosphorIconsThin.folder,
      label: '',
      labelWidget: CoporHighlightedText(
        text: name,
        searchQuery: cubit.state.search,
        style: CoporTheme.of(context).text.body,
        maxLines: 1,
      ),
      border: false,
      height: 55,
      onPressed: () => cubit.openFolder(this),
    );
  }
}
