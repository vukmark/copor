-- Creates 4 more users identical in role/permissions to `super.admin`
-- (auth_user + user rows only, reusing the existing SUPER_ADMIN role).
-- Password for all of them is `a` (same MD5 hash used by the seed data;
-- it auto-upgrades to bcrypt on first successful login).

SET @role_id = 'db323f62-ee78-4590-b031-33249dfd12dd'; -- existing SUPER_ADMIN role
SET @pwd_md5 = '5bd19e69ea39518aaf39e5f38aeddd65';       -- md5('a')

-- monika.lang
SET @auth_id = UUID();
SET @user_id = UUID();
INSERT INTO `auth_user` (`id`, `user_name`, `password`, `email`, `created_by`, `modified_by`, `created_at`, `modified_at`)
VALUES (@auth_id, 'monika.lang', @pwd_md5, 'superadmin2@example.com', @user_id, @user_id, NOW(), NOW());
INSERT INTO `user` (`id`, `created_by`, `modified_by`, `created_at`, `modified_at`, `is_active`, `is_default_role`, `auth_user_id`, `role_id`, `profile_image_id`)
VALUES (@user_id, @user_id, @user_id, NOW(), NOW(), 1, 1, @auth_id, @role_id, NULL);

-- sven.busch
SET @auth_id = UUID();
SET @user_id = UUID();
INSERT INTO `auth_user` (`id`, `user_name`, `password`, `email`, `created_by`, `modified_by`, `created_at`, `modified_at`)
VALUES (@auth_id, 'sven.busch', @pwd_md5, 'superadmin3@example.com', @user_id, @user_id, NOW(), NOW());
INSERT INTO `user` (`id`, `created_by`, `modified_by`, `created_at`, `modified_at`, `is_active`, `is_default_role`, `auth_user_id`, `role_id`, `profile_image_id`)
VALUES (@user_id, @user_id, @user_id, NOW(), NOW(), 1, 1, @auth_id, @role_id, NULL);

-- friedhelm.jennessen
SET @auth_id = UUID();
SET @user_id = UUID();
INSERT INTO `auth_user` (`id`, `user_name`, `password`, `email`, `created_by`, `modified_by`, `created_at`, `modified_at`)
VALUES (@auth_id, 'friedhelm.jennessen', @pwd_md5, 'superadmin4@example.com', @user_id, @user_id, NOW(), NOW());
INSERT INTO `user` (`id`, `created_by`, `modified_by`, `created_at`, `modified_at`, `is_active`, `is_default_role`, `auth_user_id`, `role_id`, `profile_image_id`)
VALUES (@user_id, @user_id, @user_id, NOW(), NOW(), 1, 1, @auth_id, @role_id, NULL);
