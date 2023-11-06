-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2023 at 03:57 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task_management_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `category_task`
--

CREATE TABLE `category_task` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category_task`
--

INSERT INTO `category_task` (`id`, `name`) VALUES
(1, '27c9e2e2d036cf0d265d7829cfea456c'),
(2, '8f99d92a04d81ec0eb6e4c9bd4c0bbcd303ccca3acba38576d15f06dcfab8e14'),
(3, '182ac61c0ce6fa85802cf2ff519c862587a2baa6cd84424f8ab1474ecab3833b'),
(4, 'b1a1503b98cef9858e40bbda5d67d507');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `name`) VALUES
(1, 'b11563dddc682052857ff342264d712d299d8b76ab89a9143727da4c008299d4bb1b0a309ed036dd6391e4ecedbc97e0'),
(2, '9947f7c2b7971b0d464bc0fdc5fa1c22be57d9c6c0fa0765225dfc5d3dcf0351c61606e3904f8ee56cff010df474e42fb78e3a829d261534445ad4d29c2436a8'),
(3, '90ccb0d48bc22943af65d793b93c6ee72590f98c17635fd7a43384d1201b9124');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `startDay` date DEFAULT NULL,
  `startHour` time DEFAULT NULL,
  `endDay` date DEFAULT NULL,
  `endHour` time DEFAULT NULL,
  `category_task_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `name`, `startDay`, `startHour`, `endDay`, `endHour`, `category_task_id`) VALUES
(6, '947ae807fec2901e2203d63cce183944', '2023-11-12', '11:11:00', '2023-11-19', '11:11:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `login_count` int(11) NOT NULL DEFAULT 0,
  `login_date` datetime DEFAULT NULL,
  `forgot_name_count` int(11) NOT NULL DEFAULT 0,
  `forgot_name_date` datetime DEFAULT NULL,
  `forgot_email_count` int(11) NOT NULL DEFAULT 0,
  `forgot_email_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `email`, `firstname`, `lastname`, `login_count`, `login_date`, `forgot_name_count`, `forgot_name_date`, `forgot_email_count`, `forgot_email_date`) VALUES
('d7a380ab47266cd66f09e72f71965ffb', '$2b$10$2BU4YnMH9CX2baLx4ge9quo02w.2alvafL7Ip0FRoqOyrYuFRcX.K', 'd7a380ab47266cd66f09e72f71965ffb', 'd7a380ab47266cd66f09e72f71965ffb', 'd7a380ab47266cd66f09e72f71965ffb', 0, NULL, 0, NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_task`
--

CREATE TABLE `user_task` (
  `id` int(11) NOT NULL,
  `user_username` varchar(255) DEFAULT NULL,
  `task_id` int(11) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_task`
--

INSERT INTO `user_task` (`id`, `user_username`, `task_id`, `status_id`) VALUES
(6, 'd7a380ab47266cd66f09e72f71965ffb', 6, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category_task`
--
ALTER TABLE `category_task`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_task_id` (`category_task_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `user_task`
--
ALTER TABLE `user_task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_username`,`task_id`,`status_id`),
  ADD KEY `task_id` (`task_id`),
  ADD KEY `status_id` (`status_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category_task`
--
ALTER TABLE `category_task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user_task`
--
ALTER TABLE `user_task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`category_task_id`) REFERENCES `category_task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_task`
--
ALTER TABLE `user_task`
  ADD CONSTRAINT `user_task_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_task_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_task_ibfk_4` FOREIGN KEY (`user_username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
