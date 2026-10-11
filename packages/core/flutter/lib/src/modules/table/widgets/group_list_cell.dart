import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/modules/table/data/model/cell_content.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

const double _kListMaxHeight = 440;
const double _kHeaderIconBox = 38;
const double _kCardRadius = 8;
const EdgeInsets _kSidePadding = EdgeInsets.symmetric(horizontal: 20);

class GroupListLabels {
  final String title;
  final String userGroups;
  final String close;

  const GroupListLabels({
    required this.title,
    required this.userGroups,
    required this.close,
  });

  factory GroupListLabels.fromContext(BuildContext context) {
    final translation = context.getState.commonTranslation.ensuredData;

    return GroupListLabels(
      title: translation.GROUPS,
      userGroups: translation.USER_GROUPS,
      close: translation.CLOSE,
    );
  }
}

class GroupListCell extends StatelessWidget {
  final GroupListContent groupList;
  final GroupListLabels labels;

  const GroupListCell({super.key, required this.groupList, required this.labels});

  @override
  Widget build(BuildContext context) {
    if (groupList.isEmpty) return const SizedBox.shrink();

    return Align(
      alignment: Alignment.centerLeft,
      child: DTButton.surface(
        icon: PhosphorIconsThin.usersThree,
        label: '${groupList.length}',
        semanticLabel: labels.title,
        inputSize: DTInputSize.xs,
        onPressed: () => _show(context),
      ),
    );
  }

  void _show(BuildContext context) {
    DTDialog.show(
      context,
      barrierDismissible: true,
      builder: (_) => _GroupListContentView(groupList: groupList, labels: labels),
      footerBuilder: (borderRadius) => DTActionFooter.single(
        label: labels.close,
        onPressed: () => Navigator.of(context, rootNavigator: true).pop(),
        bottomRadius: borderRadius,
        safeArea: false,
      ),
    );
  }
}

class _GroupListContentView extends HookWidget {
  final GroupListContent groupList;
  final GroupListLabels labels;

  const _GroupListContentView({required this.groupList, required this.labels});

  String _subtitle() {
    final parts = <String>[
      if (groupList.userGroupList.isNotEmpty)
        '${groupList.userGroupList.length} ${labels.userGroups}',
    ];

    return parts.join('  ·  ');
  }

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);
    final scrollController = useScrollController();

    final hasUserGroups = groupList.userGroupList.isNotEmpty;

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        _Header(title: labels.title, subtitle: _subtitle()),
        Divider(height: 1, color: dc.outlineSubtle),
        ConstrainedBox(
          constraints: const BoxConstraints(maxHeight: _kListMaxHeight),
          child: Scrollbar(
            controller: scrollController,
            thumbVisibility: true,
            child: ListView(
              controller: scrollController,
              shrinkWrap: true,
              padding: const EdgeInsets.only(top: 18, bottom: 20),
              children: [
                if (hasUserGroups) ...[
                  _SectionLabel(label: labels.userGroups, count: groupList.userGroupList.length),
                  const SizedBox(height: 10),
                  Padding(
                    padding: _kSidePadding,
                    child: Wrap(
                      spacing: 6,
                      runSpacing: 6,
                      children: groupList.userGroupList
                          .map(
                            (group) => DTInfoChip.surface(
                              icon: PhosphorIconsThin.users,
                              label: group.name,
                              large: true,
                            ),
                          )
                          .toList(),
                    ),
                  ),
                ],
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class _Header extends StatelessWidget {
  final String title;
  final String subtitle;

  const _Header({required this.title, required this.subtitle});

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);
    final text = CoporTextStyles.of(context);

    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 18, 20, 16),
      child: Row(
        children: [
          Container(
            width: _kHeaderIconBox,
            height: _kHeaderIconBox,
            decoration: BoxDecoration(
              color: dc.primaryContainer,
              borderRadius: BorderRadius.circular(_kCardRadius),
            ),
            child: Icon(PhosphorIconsThin.usersThree, size: 19, color: dc.onPrimaryContainer),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(title, style: text.sectionTitle),
                if (subtitle.isNotEmpty) ...[
                  const SizedBox(height: 2),
                  Text(subtitle, style: text.bodySecondary.copyWith(color: dc.onSurfaceSubtle)),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _SectionLabel extends StatelessWidget {
  final String label;
  final int count;

  const _SectionLabel({required this.label, required this.count});

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);
    final text = CoporTextStyles.of(context);

    return Padding(
      padding: _kSidePadding,
      child: Row(
        children: [
          Text(
            label.toUpperCase(),
            style: text.labelDefault.copyWith(
              color: dc.onSurfaceSubtle,
              fontWeight: FontWeight.w700,
              letterSpacing: 0.6,
            ),
          ),
          const SizedBox(width: 10),
          Expanded(child: Divider(height: 1, color: dc.outlineSubtle)),
          const SizedBox(width: 10),
          Text('$count', style: text.bodySecondary.copyWith(color: dc.onSurfaceSubtle)),
        ],
      ),
    );
  }
}
