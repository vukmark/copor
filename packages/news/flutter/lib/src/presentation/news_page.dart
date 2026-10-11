import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class NewsArticle {
  final String title;
  final String date;
  final String summary;
  final IconData icon;

  NewsArticle({required this.title, required this.date, required this.summary, required this.icon});
}

class NewsPage extends StatelessWidget {
  NewsPage({super.key});

  final List<NewsArticle> _newsArticles = [
    NewsArticle(
      title: 'Großes Sommerfest am Ende der Saison!',
      date: '25.08.2024',
      summary:
          'Wir laden alle Mitglieder und Partner herzlich zu unserem jährlichen Sommerfest ein. Es erwarten Sie Spiele, Essen und viel Spaß!',
      icon: PhosphorIconsThin.champagne,
    ),
    NewsArticle(
      title: 'Neuer IT-Workshop startet nächste Woche',
      date: '15.09.2024',
      summary:
          'Für alle Technikbegeisterten: Der neue IT-Workshop beginnt am kommenden Montag. Anmeldung über das Büro.',
      icon: PhosphorIconsThin.desktop,
    ),
    NewsArticle(
      title: 'Offene Sprechstunde im Oktober',
      date: '05.10.2024',
      summary:
          'Am 05. Oktober findet unsere offene Sprechstunde statt. Bitte vereinbaren Sie vorab einen Termin mit den jeweiligen Ansprechpartnern.',
      icon: PhosphorIconsThin.users,
    ),
    NewsArticle(
      title: 'Lesewettbewerb für Groß und Klein',
      date: '18.11.2024',
      summary:
          'Die besten Leseratten treten gegeneinander an. Kommt vorbei und feuert eure Favoriten an!',
      icon: PhosphorIconsThin.bookOpen,
    ),
    NewsArticle(
      title: 'Spendenaktion für das lokale Tierheim',
      date: '02.12.2024',
      summary:
          'Unser Team organisiert eine Spendenaktion. Gebraucht werden Futter und Decken. Abgabe am Empfang.',
      icon: PhosphorIconsThin.pawPrint,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return DSPageWrapper(
      isMobile: context.isMobile,
      scrollable: false,
      children: [
        Expanded(
          child: ListView.builder(
            padding: coporPagePadding,
            itemCount: _newsArticles.length,
            itemBuilder: (context, index) => _buildNewsItemCard(context, _newsArticles[index]),
          ),
        ),
      ],
    );
  }

  Widget _buildNewsItemCard(BuildContext context, NewsArticle article) {
    final colors = CoporColors.of(context);
    final dt = CoporTextStyles.of(context);

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: colors.surfaceContainer,
        borderRadius: BorderRadius.circular(kInputBorderRadius),
        border: Border.all(color: colors.outlineSubtle),
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(kInputBorderRadius),
        onTap: () {
          context.getBloc.appScaffold.addBanner(
            DSBanner.info(
              '"${article.title}" - Mehr Details hier... (Platzhalter)',
              source: 'news_item_tap',
            ),
          );
        },
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Icon(article.icon, color: colors.primary, size: 24),
                  const SizedBox(width: 12),
                  Expanded(child: Text(article.title, style: dt.bodyStrong)),
                ],
              ),
              const SizedBox(height: 6),
              Text(article.date, style: dt.bodySecondary),
              const SizedBox(height: 10),
              Text(article.summary, style: dt.body, maxLines: 3, overflow: TextOverflow.ellipsis),
              const SizedBox(height: 10),
              Text('Weiterlesen', style: dt.bodyStrong.copyWith(color: colors.primary)),
            ],
          ),
        ),
      ),
    );
  }
}
