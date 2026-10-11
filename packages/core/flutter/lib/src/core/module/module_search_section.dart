import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/modules/search/data/model/translation/search_translation.dart';
import 'package:flutter/widgets.dart';
import 'package:provider/single_child_widget.dart';

/// A results section a module adds to the core Search page, shown below the
/// Users section. The module owns the blocs it searches with and the cards it
/// shows; core only provides them, starts each search and lays the sections out.
abstract class ModuleSearchSection {
  const ModuleSearchSection();

  /// Position among the module sections, ascending.
  int get order;

  /// Blocs the section reads, provided on the search page.
  List<SingleChildWidget> providers(BuildContext context);

  /// Listeners for those blocs (loading / failure keys).
  List<SingleChildWidget> listeners() => const [];

  /// Starts a search with [filters] (the `SEARCH` query, limit and offset).
  void search(BuildContext context, FilterListDTO filters);

  /// Whether the last search found anything; watches the section's blocs.
  bool hasResults(BuildContext context);

  /// The section, built only when [hasResults] is true.
  Widget buildSection(BuildContext context, String query, SearchPageTranslation translation);
}
