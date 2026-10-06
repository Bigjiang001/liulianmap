CREATE TABLE `comments` (
	`id` text PRIMARY KEY NOT NULL,
	`post_id` text NOT NULL,
	`user_id` text NOT NULL,
	`content` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_comments_post` ON `comments` (`post_id`);--> statement-breakpoint
CREATE TABLE `favorites` (
	`user_id` text NOT NULL,
	`place_id` text NOT NULL,
	PRIMARY KEY(`user_id`, `place_id`)
);
--> statement-breakpoint
CREATE TABLE `likes` (
	`user_id` text NOT NULL,
	`post_id` text NOT NULL,
	PRIMARY KEY(`user_id`, `post_id`)
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`place_id` text NOT NULL,
	`rating` integer NOT NULL,
	`content` text NOT NULL,
	`visit_date` text NOT NULL,
	`variety` text DEFAULT '未确认' NOT NULL,
	`texture` text DEFAULT '' NOT NULL,
	`sweetness` text DEFAULT '' NOT NULL,
	`aroma` text DEFAULT '' NOT NULL,
	`price` real,
	`weight` real,
	`basis` text DEFAULT '未记录' NOT NULL,
	`photos` text DEFAULT '[]' NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_posts_status_created` ON `posts` (`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_posts_place_status` ON `posts` (`place_id`,`status`);--> statement-breakpoint
CREATE INDEX `idx_posts_user` ON `posts` (`user_id`);--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`bio` text DEFAULT '' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `reports` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`target` text NOT NULL,
	`reason` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`payload` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_submissions_status` ON `submissions` (`status`);--> statement-breakpoint
CREATE TABLE `uploads` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`content_type` text NOT NULL,
	`created_at` integer NOT NULL
);
