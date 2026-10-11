class DTTableLabels {
  final String noDataFound;
  final String published;
  final String unpublished;
  final String draft;
  final String copy;
  final String copyToClipboard;
  final String todo;
  final String started;
  final String halfway;
  final String almostDone;
  final String finished;
  final String normal;
  final String high;
  final String urgent;
  final String trueLabel;
  final String falseLabel;
  final String currentPeriodLabel;

  const DTTableLabels({
    required this.noDataFound,
    required this.published,
    required this.unpublished,
    required this.draft,
    required this.copy,
    required this.copyToClipboard,
    required this.todo,
    required this.started,
    required this.halfway,
    required this.almostDone,
    required this.finished,
    required this.normal,
    required this.high,
    required this.urgent,
    required this.trueLabel,
    required this.falseLabel,
    required this.currentPeriodLabel,
  });

  const DTTableLabels.empty()
      : noDataFound = '',
        published = '',
        unpublished = '',
        draft = '',
        copy = '',
        copyToClipboard = '',
        todo = '',
        started = '',
        halfway = '',
        almostDone = '',
        finished = '',
        normal = '',
        high = '',
        urgent = '',
        trueLabel = '',
        falseLabel = '',
        currentPeriodLabel = '';
}
