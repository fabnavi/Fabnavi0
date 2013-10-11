DROP TABLE IF EXISTS `projects`;
DROP TABLE IF EXISTS `processes`;

CREATE TABLE `projects` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(128),
  `tags` VARCHAR(128),
  `created` DATETIME NOT NULL,
  `updated` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`created`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE `processes` (
  `file` VARCHAR(128) NOT NULL,
  `projects_id` INT UNSIGNED NOT NULL,
  `tags` VARCHAR(128),
  `created` DATETIME NOT NULL,
  UNIQUE KEY (`file`, `projects_id`),
  FOREIGN KEY (`projects_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
