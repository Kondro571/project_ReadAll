CREATE TABLE IF NOT EXISTS `User` (
	`id` int AUTO_INCREMENT NOT NULL,
	`password` varchar(255) NOT NULL,
	`email_address` varchar(30) NOT NULL,
	`role` varchar(50) NOT NULL,
	`status` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Product` (
	`id` int AUTO_INCREMENT NOT NULL,
	`image` varchar(255) NOT NULL,
	`name` varchar(50) NOT NULL,
	`description` varchar(255) NOT NULL,
	`price` float NOT NULL,
	`author` varchar(50) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Category` (
	`id` int AUTO_INCREMENT NOT NULL,
	`description` varchar(255) NOT NULL,
	`name` varchar(50) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Transaction` (
	`transaction_id` varchar(255) NOT NULL UNIQUE,
	`response` varchar(255) NOT NULL,
	`status` boolean NOT NULL,
	`date_time` datetime NOT NULL,
	`amount` float NOT NULL,
	`order_id` int NOT NULL
);

CREATE TABLE IF NOT EXISTS `product_category` (
	`id` int NOT NULL,
	`product_id` int NOT NULL,
	`category_id` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Order` (
	`id` int AUTO_INCREMENT NOT NULL,
	`total_amount` float NOT NULL,
	`date_time` datetime NOT NULL,
	`status` varchar(255) NOT NULL,
	`customer_id` int NOT NULL,
	`addres` varchar(50) NOT NULL,
	`service` varchar(50) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `order_product` (
	`id` int NOT NULL,
	`order_id` int NOT NULL,
	`product_id` int NOT NULL,
	`quantity` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Basket` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`customer_id` int NOT NULL,
	`product_id` int NOT NULL,
	`quantity` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `user_info` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`user_id` int NOT NULL,
	`name` varchar(50) NOT NULL,
	`surname` varchar(50) NOT NULL,
	`mobile_number` varchar(255) NOT NULL,
	`addres` varchar(50) NOT NULL,
	PRIMARY KEY (`id`)
);




ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_fk5` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`);
ALTER TABLE `product_category` ADD CONSTRAINT `product_category_fk1` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`);

ALTER TABLE `product_category` ADD CONSTRAINT `product_category_fk2` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`);
ALTER TABLE `Order` ADD CONSTRAINT `Order_fk4` FOREIGN KEY (`customer_id`) REFERENCES `User`(`id`);
ALTER TABLE `order_product` ADD CONSTRAINT `order_product_fk1` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`);

ALTER TABLE `order_product` ADD CONSTRAINT `order_product_fk2` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`);
ALTER TABLE `Basket` ADD CONSTRAINT `Basket_fk1` FOREIGN KEY (`customer_id`) REFERENCES `User`(`id`);

ALTER TABLE `Basket` ADD CONSTRAINT `Basket_fk2` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`);
ALTER TABLE `user_info` ADD CONSTRAINT `user_info_fk1` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`);