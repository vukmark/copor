import 'package:copor_core/src/utils/constants.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:copor_help/src/about/data/model/change_log_models.dart';
import 'package:copor_core/src/utils/url_launcher_helper.dart';
import 'package:flutter/material.dart';

class InfoCardGrid extends StatelessWidget {
  final ChangeLogVersionInfo? changeLogInfo;

  const InfoCardGrid({super.key, required this.changeLogInfo});

  @override
  Widget build(BuildContext context) {
    final translation = context.watchState.commonTranslation.ensuredData;
    final version = changeLogInfo?.version ?? '...';
    final publishDate = changeLogInfo?.publishDate ?? '...';
    final isDisplayedInListTiles = MediaQuery.of(context).size.width < 680;
    final currentYear = DateTime.now().year;

    final cards = [
      _InfoCardData(
        icon: PhosphorIconsThin.info,
        title: translation.VERSION,
        subtitle: version,
      ),
      _InfoCardData(
        icon: PhosphorIconsThin.calendar,
        title: translation.PUBLISHED_APP,
        subtitle: publishDate,
      ),
      _InfoCardData(
        icon: PhosphorIconsThin.copyright,
        title: translation.COPYRIGHT,
        subtitle: '© 2022–$currentYear ${isDisplayedInListTiles ? '' : '\n'} VukMark',
      ),
      _InfoCardData(
        icon: PhosphorIconsThin.gavel,
        title: translation.LICENSE,
        subtitle: 'GPLv3',
        onTap: () => launchUrlHelper('https://www.gnu.org/licenses/gpl-3.0.html', context),
      ),
      _InfoCardData(
        icon: PhosphorIconsThin.chatCircleDots,
        title: translation.SUPPORT,
        subtitle: 'E-Mail',
        onTap: () => launchUrlHelper('mailto:${AppLinks.supportEmail}', context),
      ),
      _InfoCardData(
        icon: PhosphorIconsRegular.fileText,
        title: translation.IMPRESSUM,
        subtitle: translation.IMPRESSUM,
        onTap: () => launchUrlHelper(AppLinks.legalNotice, context),
      ),
      _InfoCardData(
        icon: PhosphorIconsThin.shieldCheck,
        title: translation.POLICY,
        subtitle: translation.PRIVACY_POLICY,
        onTap: () => launchUrlHelper(AppLinks.privacyPolicy, context),
      ),
    ];

    final colors = CoporColors.of(context);
    final dt = CoporTextStyles.of(context);

    if (isDisplayedInListTiles) {
      return Column(
        children: cards.expand((card) {
          final trailing = card.subtitle != null
              ? Text(card.subtitle!, style: dt.bodySecondary)
              : null;
          final tile = card.onTap != null
              ? DTListTile.primary(
                  icon: card.icon,
                  label: card.title,
                  trailing: trailing,
                  onPressed: card.onTap!,
                )
              : DTListTile.surface(
                  icon: card.icon,
                  label: card.title,
                  trailing: trailing,
                  onPressed: () {},
                );
          return [tile, const SizedBox(height: 8)];
        }).toList()..removeLast(),
      );
    }

    Widget buildCard(_InfoCardData card) {
      final isClickable = card.onTap != null;
      final content = SizedBox(
        width: 200,
        height: 120,
        child: Padding(
          padding: const EdgeInsets.all(8),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Icon(
                card.icon,
                size: 38,
                weight: 600,
                color: isClickable ? colors.onPrimaryContainerSubtle : colors.onSurfaceSubtle,
              ),
              const SizedBox(height: 8),
              Text(
                card.title,
                style: dt.body,
                textAlign: TextAlign.center,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
              if (card.subtitle != null && card.subtitle!.isNotEmpty)
                Padding(
                  padding: const EdgeInsets.only(top: 4),
                  child: Text(
                    card.subtitle!,
                    style: dt.bodySecondary,
                    textAlign: TextAlign.center,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
            ],
          ),
        ),
      );
      return isClickable ? DTCard.tap(onTap: card.onTap!, child: content) : DTCard(child: content);
    }

    Widget buildRow(List<_InfoCardData> rowCards) => Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: rowCards.expand((card) => [buildCard(card), const SizedBox(width: 16)]).toList()
        ..removeLast(),
    );

    return Column(children: [buildRow(cards.sublist(0, 3)), buildRow(cards.sublist(3))]);
  }
}

class _InfoCardData {
  final IconData icon;
  final String title;
  final String? subtitle;
  final VoidCallback? onTap;

  _InfoCardData({required this.icon, required this.title, this.subtitle, this.onTap});
}
