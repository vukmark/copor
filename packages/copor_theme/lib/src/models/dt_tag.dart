class DTTag {
  final String id;
  final String name;
  final int color;
  final bool isPrivate;
  final String? description;
  const DTTag({required this.id, required this.name, required this.color, required this.isPrivate, this.description});

  @override
  bool operator ==(Object other) => other is DTTag && other.id == id;

  @override
  int get hashCode => id.hashCode;
}
