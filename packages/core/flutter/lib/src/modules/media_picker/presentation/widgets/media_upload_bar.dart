import 'package:copor_theme/copor_theme.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/modules/media_picker/presentation/cubit/media_picker_cubit.dart';
import 'package:copor_core/src/modules/media_picker/presentation/cubit/media_picker_state.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class MediaUploadBar extends StatelessWidget {
  const MediaUploadBar({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<MediaPickerCubit, MediaPickerState>(
      buildWhen: (prev, curr) => prev.uploads != curr.uploads,
      builder: (context, state) {
        if (state.uploads.isEmpty) return const SizedBox.shrink();

        return SizedBox(
          height: 80,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            itemCount: state.uploads.length,
            separatorBuilder: (_, _) => const SizedBox(width: 8),
            itemBuilder: (context, index) {
              final upload = state.uploads[index];
              return _UploadThumbnail(
                upload: upload,
                onRemove: () => context.read<MediaPickerCubit>().removeUpload(index),
              );
            },
          ),
        );
      },
    );
  }
}

class _UploadThumbnail extends StatelessWidget {
  final MediaFileModel upload;
  final VoidCallback onRemove;

  const _UploadThumbnail({required this.upload, required this.onRemove});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Container(
          width: 72,
          height: 72,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(8),
            color: Theme.of(context).colorScheme.surfaceContainerHighest,
          ),
          clipBehavior: Clip.antiAlias,
          child: upload.getPreview(),
        ),
        Positioned(
          top: 0,
          right: 0,
          child: GestureDetector(
            onTap: onRemove,
            child: Container(
              width: 20,
              height: 20,
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.error,
                shape: BoxShape.circle,
              ),
              child: Icon(
                PhosphorIconsThin.x,
                size: 14,
                color: Theme.of(context).colorScheme.onError,
              ),
            ),
          ),
        ),
      ],
    );
  }
}
