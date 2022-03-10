-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Värd: localhost:8889
-- Tid vid skapande: 10 mars 2022 kl 10:09
-- Serverversion: 5.7.34
-- PHP-version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `photoalbum`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `Album`
--

CREATE TABLE `Album` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `Album`
--

INSERT INTO `Album` (`id`, `user_id`, `title`) VALUES
(1, 2, 'Confetti Album'),
(2, 4, 'Happy Album'),
(3, 3, 'Another Album'),
(4, 9, 'My First Album'),
(5, 9, 'Confetti Album now has this name'),
(6, 10, 'Julias Album'),
(7, 10, 'Julias andra Album'),
(8, 10, 'Julias third Album');

-- --------------------------------------------------------

--
-- Tabellstruktur `Album_Photos`
--

CREATE TABLE `Album_Photos` (
  `id` int(11) NOT NULL,
  `photo_id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumpning av Data i tabell `Album_Photos`
--

INSERT INTO `Album_Photos` (`id`, `photo_id`, `album_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 4, 2);

-- --------------------------------------------------------

--
-- Tabellstruktur `Photos`
--

CREATE TABLE `Photos` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `comment` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `Photos`
--

INSERT INTO `Photos` (`id`, `user_id`, `title`, `url`, `comment`) VALUES
(1, 2, 'Confetti Photo #1', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Confetti'),
(2, 4, 'Confetti Photo #2', 'https://images.unsplash.com/photo-1481162854517-d9e353af153d', 'Confetti #2'),
(3, 3, 'Confetti Photo #3', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819', 'Confetti #3'),
(4, 9, 'Happy Photo', 'https://images.unsplash.com/photo-1454486837617-ce8e1ba5ebfe', 'So happy'),
(14, 10, 'corgivalp', 'https://h24-original.s3.amazonaws.com/40341/18615393-4554x.jpg', 'en liten corgi'),
(15, 10, 'corgivalp 2', 'https://h24-original.s3.amazonaws.com/40341/18615354-SuP9Y.jpg', 'en söt corgi');

-- --------------------------------------------------------

--
-- Tabellstruktur `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `Users`
--

INSERT INTO `Users` (`id`, `email`, `password`, `first_name`, `last_name`) VALUES
(2, 'photo@photos.com', 'say-cheese', 'Julia', 'Nemell'),
(3, 'seb@camera.se', 'camera', 'Sebastian', 'Kameraman'),
(4, 'nick@model.org', 'nicky', 'Nick', 'Nicknick'),
(6, 't@t.se', '$2b$10$EsvAbIi4h9xEXXQtHpiqqu0NNkCGRv.G0hWJKca3YrljyMQbM0omS', 'tt', 'tt'),
(9, 'test@test.se', '$2b$10$jpk8p9TgkW3gGEtfo6p54Ofh8ILdlpYDDbdHwA1gTMKb4zDNdpXuC', 'Trakigare', 'Trakigast'),
(10, 'julia@julia.com', '$2b$10$waYOHsPmgXYC16NkOXybOeA0TnmJp9c1c3YSVDivwnunFpbUKXkg.', 'julia', 'nemell');

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `Album`
--
ALTER TABLE `Album`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`user_id`);

--
-- Index för tabell `Album_Photos`
--
ALTER TABLE `Album_Photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `photos` (`photo_id`),
  ADD KEY `album` (`album_id`);

--
-- Index för tabell `Photos`
--
ALTER TABLE `Photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`user_id`);

--
-- Index för tabell `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `Album`
--
ALTER TABLE `Album`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT för tabell `Album_Photos`
--
ALTER TABLE `Album_Photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT för tabell `Photos`
--
ALTER TABLE `Photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT för tabell `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restriktioner för dumpade tabeller
--

--
-- Restriktioner för tabell `Album`
--
ALTER TABLE `Album`
  ADD CONSTRAINT `album_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Restriktioner för tabell `Album_Photos`
--
ALTER TABLE `Album_Photos`
  ADD CONSTRAINT `album_photos_ibfk_1` FOREIGN KEY (`photo_id`) REFERENCES `Photos` (`id`),
  ADD CONSTRAINT `album_photos_ibfk_2` FOREIGN KEY (`album_id`) REFERENCES `Album` (`id`);

--
-- Restriktioner för tabell `Photos`
--
ALTER TABLE `Photos`
  ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
