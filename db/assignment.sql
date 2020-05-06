-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 06, 2020 at 05:03 PM
-- Server version: 5.7.29-0ubuntu0.18.04.1
-- PHP Version: 5.6.40-24+ubuntu18.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `assignment`
--

-- --------------------------------------------------------

--
-- Table structure for table `accountManagers`
--

CREATE TABLE `accountManagers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `isDeleted` enum('0','1') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accountManagers`
--

INSERT INTO `accountManagers` (`id`, `name`, `isDeleted`) VALUES
(1, 'Manager1', '0'),
(2, 'Manager2', '0'),
(3, 'Manager3', '0'),
(4, 'Manager4', '0'),
(5, 'Manager5', '0'),
(6, 'Manager6', '0');

-- --------------------------------------------------------

--
-- Table structure for table `aclpermissions`
--

CREATE TABLE `aclpermissions` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `aclResourceId` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `aclpermissions`
--

INSERT INTO `aclpermissions` (`id`, `userId`, `aclResourceId`) VALUES
(1, 1, 'ALL'),
(2, 2, '1,2'),
(3, 3, '3,4'),
(4, 4, '5,1');

-- --------------------------------------------------------

--
-- Table structure for table `aclresources`
--

CREATE TABLE `aclresources` (
  `id` int(11) NOT NULL,
  `module_name` varchar(255) NOT NULL,
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `aclresources`
--

INSERT INTO `aclresources` (`id`, `module_name`, `status`) VALUES
(1, 'Lineup', 'Active'),
(2, 'Customers', 'Active'),
(3, 'Services & Prices', 'Active'),
(4, 'Configration', 'Active'),
(5, 'Organizations', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `assigncontactlists`
--

CREATE TABLE `assigncontactlists` (
  `id` int(11) NOT NULL,
  `jobId` int(11) NOT NULL,
  `personId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `assigncontactlists`
--

INSERT INTO `assigncontactlists` (`id`, `jobId`, `personId`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 2, 1),
(8, 2, 2),
(9, 2, 3),
(10, 2, 4),
(11, 2, 5),
(12, 2, 6),
(13, 3, 1),
(14, 3, 2),
(15, 3, 3),
(16, 3, 4),
(17, 3, 5),
(18, 3, 6),
(19, 4, 1),
(20, 4, 2),
(21, 4, 3),
(22, 4, 4),
(23, 4, 5),
(24, 4, 6),
(25, 5, 1),
(26, 5, 2),
(27, 5, 3),
(28, 5, 4),
(29, 5, 5),
(30, 5, 6),
(31, 6, 1),
(32, 6, 2),
(33, 6, 3),
(34, 6, 4),
(35, 6, 1),
(36, 6, 2),
(37, 6, 3),
(38, 6, 4),
(39, 6, 5),
(40, 6, 6),
(41, 7, 1),
(42, 7, 2),
(43, 7, 3),
(44, 7, 4),
(45, 7, 5),
(46, 7, 6),
(47, 8, 1),
(48, 8, 2),
(49, 8, 3),
(50, 8, 4),
(51, 8, 5),
(52, 8, 6);

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `Commodity` varchar(255) NOT NULL,
  `accountManager` varchar(255) NOT NULL,
  `filestatus` enum('Confirmed','Pending') NOT NULL,
  `fileNo` varchar(255) NOT NULL,
  `isDeleted` enum('0','1') NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `name`, `quantity`, `Commodity`, `accountManager`, `filestatus`, `fileNo`, `isDeleted`) VALUES
(1, 'Client One', '5000 MT', 'Apples', '1,2', 'Pending', '10001', '0'),
(2, 'Client TWO', '15000 MT', 'Mangoes', '3,4', 'Confirmed', '10003', '0'),
(3, 'Client Three', '18000 MT', 'Bananas', '4,1', 'Pending', '10005', '0'),
(4, 'Client Four', '12000 MT', 'Oranges', '1,5', 'Confirmed', '10007', '0'),
(5, 'Client Five', '1020 MT', 'Rices', '4,2', 'Confirmed', '10009', '0'),
(6, 'Client Six', '1020 MT', 'Potatos', '5,3', 'Pending', '10011', '0');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `jobType` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `locationID` int(11) NOT NULL,
  `ETA` datetime NOT NULL,
  `ETC` datetime NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isDeleted` enum('0','1') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `jobType`, `name`, `locationID`, `ETA`, `ETC`, `quantity`, `createdAt`, `updatedAt`, `isDeleted`) VALUES
(1, 'Vessel', 'Mumbai Ship', 4, '2020-05-26 14:37:38', '2020-05-20 14:37:38', '10000 MT', '2020-05-04 14:37:38', '2020-05-04 14:37:38', '0'),
(2, 'AngularJs', 'Angular Developer', 4, '2020-05-26 14:37:38', '2020-05-20 14:37:38', '20000 MT', '2020-05-04 14:37:38', '2020-05-04 14:37:38', '0'),
(3, 'NodeJs', 'NodeJs Developer', 4, '2020-05-26 14:37:38', '2020-05-20 14:37:38', '30000 MT', '2020-05-04 14:37:38', '2020-05-04 14:37:38', '0'),
(4, 'PHP', 'PHP Developer', 3, '2020-05-26 14:37:38', '2020-05-20 14:37:38', '15000 MT', '2020-05-04 14:37:38', '2020-05-04 14:37:38', '0'),
(5, 'Java', 'Java Developer', 2, '2020-05-26 14:37:38', '2020-05-20 14:37:38', '25000 MT', '2020-05-04 14:37:38', '2020-05-04 14:37:38', '0'),
(6, 'IOS', 'IOS Developer', 5, '2020-05-26 14:37:38', '2020-05-20 14:37:38', '5000 MT', '2020-05-04 14:37:38', '2020-05-04 14:37:38', '0'),
(7, 'Finance', 'Finance Jobs', 4, '2020-05-26 14:37:38', '2020-05-20 14:37:38', '3000 MT', '2020-05-04 14:37:38', '2020-05-04 14:37:38', '0'),
(8, 'SAP', 'SAP Developer', 4, '2020-05-26 14:37:38', '2020-05-20 14:37:38', '3500 MT', '2020-05-04 14:37:38', '2020-05-04 14:37:38', '0');

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `isDeleted` enum('0','1') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `name`, `isDeleted`) VALUES
(1, 'Delhi', '0'),
(2, 'Pune', '0'),
(3, 'Banglore', '0'),
(4, 'Chennai', '0'),
(5, 'Mumbai', '0'),
(6, 'Noida', '0');

-- --------------------------------------------------------

--
-- Table structure for table `personlists`
--

CREATE TABLE `personlists` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contactNumber` varchar(50) NOT NULL,
  `company` varchar(255) NOT NULL,
  `isDeleted` enum('0','1') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `personlists`
--

INSERT INTO `personlists` (`id`, `name`, `address`, `email`, `contactNumber`, `company`, `isDeleted`) VALUES
(1, 'Person1', 'Flat no 101', 'Person1@gmail.com', '1234567890', 'Company1', '0'),
(2, 'Person2', 'Flat no 202', 'Person2@gmail.com', '9087654321', 'Company2', '0'),
(3, 'Person3', 'Flat no 303', 'Person3@gmail.com', '9345321787', 'Company3', '0'),
(4, 'Person4', 'Flat no 404', 'Person4@gmail.com', '8912345786', 'Company4', '0'),
(5, 'Person5', 'Flat no 505', 'Person5@gmail.com', '8912345784', 'Company5', '0'),
(6, 'Person6', 'Flat no 606', 'Person6@gmail.com', '8912345784', 'Company6', '0');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `locationID` int(11) NOT NULL,
  `userName` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `dob` date NOT NULL,
  `Address` varchar(255) NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `locationID`, `userName`, `email`, `password`, `gender`, `mobile`, `dob`, `Address`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 4, 'Sachin Motla', 'msachin0190@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 'Male', '4444444444', '2020-05-01', 'flat no 303 noida', '0', '2020-04-30 00:00:00', '2020-05-01 12:43:13'),
(2, 3, 'Pankaj kumar', 'pankaj.kumar@gmail.com', '202cb962ac59075b964b07152d234b70', 'Male', '4444444444', '2020-05-01', 'flat no 101 noida', '0', '2020-04-30 00:00:00', '2020-05-01 12:43:13'),
(3, 2, 'Pramod kumar', 'pramod.kumar@gmail.com', '202cb962ac59075b964b07152d234b70', 'Male', '4444444444', '2020-05-01', 'flat no 404 noida', '0', '2020-04-30 00:00:00', '2020-05-01 12:43:13'),
(4, 5, 'Pooja Singh', 'pooja.kumari@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 'Female', '4444444444', '2020-05-01', 'flat no 505 noida', '0', '2020-04-30 00:00:00', '2020-05-01 12:43:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accountManagers`
--
ALTER TABLE `accountManagers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `aclpermissions`
--
ALTER TABLE `aclpermissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `aclresources`
--
ALTER TABLE `aclresources`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `assigncontactlists`
--
ALTER TABLE `assigncontactlists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `fileNo` (`fileNo`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personlists`
--
ALTER TABLE `personlists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accountManagers`
--
ALTER TABLE `accountManagers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `aclpermissions`
--
ALTER TABLE `aclpermissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `aclresources`
--
ALTER TABLE `aclresources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `assigncontactlists`
--
ALTER TABLE `assigncontactlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `personlists`
--
ALTER TABLE `personlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
