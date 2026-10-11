import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';

class DSNotificationDestination extends Equatable {
  final String key;

  const DSNotificationDestination(this.key);

  static const DSNotificationDestination bell = DSNotificationDestination(
    'bell',
  );

  @override
  List<Object?> get props => [key];

  @override
  String toString() => 'DSNotificationDestination($key)';
}

class DSNotification extends Equatable {
  final String id;

  final String title;

  final String body;

  final String? imageUrl;

  final IconData? icon;

  final int? unreadCount;

  const DSNotification({
    required this.id,
    required this.title,
    required this.body,
    this.imageUrl,
    this.icon,
    this.unreadCount,
  });

  factory DSNotification.fromJson(Map<String, dynamic> json) => DSNotification(
    id: json['id'] as String? ?? '',
    title: json['title'] as String? ?? '',
    body: json['body'] as String? ?? '',
    imageUrl: json['imageUrl'] as String?,
    unreadCount: json['unreadCount'] as int?,
  );

  Map<String, dynamic> toJson() => {
    'id': id,
    'title': title,
    'body': body,
    if (imageUrl != null) 'imageUrl': imageUrl,
    if (unreadCount != null) 'unreadCount': unreadCount,
  };

  @override
  List<Object?> get props => [id, title, body, imageUrl, icon, unreadCount];
}
