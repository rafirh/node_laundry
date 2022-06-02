-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 06, 2022 at 03:45 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_laundry`
--

-- --------------------------------------------------------

--
-- Table structure for table `detail_transaksi`
--

CREATE TABLE `detail_transaksi` (
  `id_detail` int(11) NOT NULL,
  `id_transaksi` int(11) NOT NULL,
  `id_paket` int(11) NOT NULL,
  `qty` double NOT NULL,
  `total_harga` double NOT NULL,
  `keterangan` text NOT NULL,
  `total_bayar` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `detail_transaksi`
--

INSERT INTO `detail_transaksi` (`id_detail`, `id_transaksi`, `id_paket`, `qty`, `total_harga`, `keterangan`, `total_bayar`) VALUES
(16, 36, 20, 20, 44000, '', 500000),
(17, 37, 20, 50, 110000, '', 200000),
(18, 39, 21, 15, 21000, '', 25000),
(19, 40, 20, 10, 22000, '', 10000000),
(20, 41, 20, 10, 22000, '', 50000),
(21, 42, 23, 1000, 2500000, '', 2500000),
(23, 44, 20, 5, 11000, '', 11000),
(24, 45, 25, 10, 50000, '', 55000),
(25, 46, 27, 3, 9000, '', 10000),
(26, 47, 21, 5, 7000, '', 10000),
(27, 48, 21, 10, 14000, '', 14000),
(28, 49, 21, 5, 7000, '', 0),
(29, 50, 21, 10, 14000, '', 14000),
(33, 55, 20, 5, 11000, '', 0),
(34, 56, 20, 5, 11000, '', 0),
(35, 57, 20, 5, 11000, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `outlet`
--

CREATE TABLE `outlet` (
  `id_outlet` int(11) NOT NULL,
  `nama_outlet` varchar(228) CHARACTER SET utf8mb4 DEFAULT NULL,
  `alamat_outlet` text CHARACTER SET utf8mb4 DEFAULT NULL,
  `telp_outlet` varchar(15) CHARACTER SET utf8mb4 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `outlet`
--

INSERT INTO `outlet` (`id_outlet`, `nama_outlet`, `alamat_outlet`, `telp_outlet`) VALUES
(9, 'Outlet Kuning', 'Surabaya', '08555555555'),
(10, 'Outlet Putih', 'Jakarta', '081222222222'),
(11, 'Outlet Biru', 'Batu', '081223446312'),
(12, 'Outlet Merah', 'Yogyakarta', '0826377453886'),
(15, 'Outlet Hijau', 'Malang', '08885477865'),
(16, 'Outlet Hitam', 'Malang', '08776354792');

-- --------------------------------------------------------

--
-- Table structure for table `paket_cuci`
--

CREATE TABLE `paket_cuci` (
  `id_paket` int(11) NOT NULL,
  `jenis_paket` enum('kiloan','selimut','bedcover','kaos','lain') NOT NULL,
  `nama_paket` varchar(228) NOT NULL,
  `harga` int(11) NOT NULL,
  `outlet_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `paket_cuci`
--

INSERT INTO `paket_cuci` (`id_paket`, `jenis_paket`, `nama_paket`, `harga`, `outlet_id`) VALUES
(20, 'kiloan', 'Paket Wangi Tahan Lama', 2200, 9),
(21, 'kaos', 'Paket Cepat Kering', 1400, 10),
(23, 'kiloan', 'Paket Kering Wangi', 2500, 9),
(25, 'kiloan', 'Cuci Karpet', 5000, 12),
(26, 'kiloan', 'Cuci Kering', 2000, 12),
(27, 'kiloan', 'Cuci Kering Setrika', 3000, 12);

-- --------------------------------------------------------

--
-- Table structure for table `pelanggan`
--

CREATE TABLE `pelanggan` (
  `id_pelanggan` int(11) NOT NULL,
  `nama_pelanggan` varchar(228) NOT NULL,
  `alamat_pelanggan` text NOT NULL,
  `jenis_kelamin` enum('L','P') NOT NULL,
  `telp_pelanggan` varchar(15) NOT NULL,
  `no_ktp` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pelanggan`
--

INSERT INTO `pelanggan` (`id_pelanggan`, `nama_pelanggan`, `alamat_pelanggan`, `jenis_kelamin`, `telp_pelanggan`, `no_ktp`) VALUES
(29, 'Rafi Rahman', 'Malang', 'L', '0757678', '34235'),
(30, 'Habibi', 'Malang', 'L', '32423', '345345'),
(31, 'Bianca', 'Jakarta', 'P', '08873467783', '00834827283423');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` int(11) NOT NULL,
  `outlet_id` int(11) DEFAULT NULL,
  `kode_invoice` varchar(228) CHARACTER SET utf8mb4 DEFAULT NULL,
  `id_pelanggan` int(11) DEFAULT NULL,
  `tgl` datetime DEFAULT NULL,
  `batas_waktu` datetime DEFAULT NULL,
  `tgl_pembayaran` datetime DEFAULT NULL,
  `biaya_tambahan` int(11) DEFAULT NULL,
  `diskon` double DEFAULT NULL,
  `pajak` int(11) DEFAULT NULL,
  `status` enum('baru','proses','selesai','diambil') CHARACTER SET utf8mb4 DEFAULT NULL,
  `status_bayar` enum('dibayar','belum') CHARACTER SET utf8mb4 DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id_transaksi`, `outlet_id`, `kode_invoice`, `id_pelanggan`, `tgl`, `batas_waktu`, `tgl_pembayaran`, `biaya_tambahan`, `diskon`, `pajak`, `status`, `status_bayar`, `id_user`) VALUES
(36, 9, 'CLN202009033737', NULL, '2020-09-03 04:37:43', '2020-09-10 12:00:00', '2020-09-03 04:40:03', 0, 0, 0, 'baru', 'dibayar', 1),
(37, 9, 'CLN202009035702', NULL, '2020-09-03 05:03:37', '2020-09-10 12:00:00', '2020-09-03 05:08:28', 0, 0, 0, 'baru', 'dibayar', 1),
(39, 10, 'CLN202009034317', NULL, '2020-09-03 05:19:12', '2020-09-10 12:00:00', '2020-09-03 05:21:41', 0, 0, 0, 'proses', 'dibayar', 7),
(40, 9, 'CLN202009040521', NULL, '2020-09-04 03:21:09', '2020-09-11 12:00:00', '2022-01-15 03:25:57', 0, 0, 0, 'baru', 'dibayar', 1),
(41, 9, 'CLN202009040528', NULL, '2020-09-04 03:28:21', '2020-09-11 12:00:00', '2020-09-04 03:29:00', 0, 0, 0, 'selesai', 'dibayar', 1),
(42, 9, 'CLN202201151028', NULL, '2022-01-15 03:28:22', '2022-01-22 12:00:00', '2022-01-15 03:29:13', 0, 0, 0, 'baru', 'dibayar', 6),
(43, 9, 'CLN202201151531', NULL, '2022-01-15 03:31:42', '2022-01-22 12:00:00', '2022-01-15 03:32:02', 0, 0, 0, 'baru', 'dibayar', 6),
(44, 9, 'CLN202201182522', 29, '2022-01-18 03:22:34', '2022-01-25 12:00:00', '2022-01-18 03:57:05', 0, 0, 0, 'diambil', 'dibayar', 6),
(45, 12, 'CLN202201194903', 30, '2022-01-19 05:04:45', '2022-01-26 12:00:00', '2022-01-19 05:05:19', 0, 0, 0, 'diambil', 'dibayar', 6),
(46, 12, 'CLN202201195506', 31, '2022-01-19 05:07:18', '2022-01-26 12:00:00', '2022-01-19 05:07:39', 0, 0, 0, 'diambil', 'dibayar', 6),
(47, 10, 'CLN202202195030', 31, '2022-02-19 12:31:29', '2022-02-26 12:00:00', '2022-02-19 12:33:29', 0, 0, 0, 'baru', 'dibayar', 1),
(48, 10, 'CLN202202194337', 31, '2022-02-19 06:37:55', '2022-02-26 12:00:00', '2022-02-19 12:39:13', 0, 0, 0, 'diambil', 'dibayar', 1),
(49, 10, 'CLN202203014045', 31, '2022-03-01 07:46:19', '2022-03-08 12:00:00', NULL, 0, 0, 0, 'baru', 'belum', 1),
(50, 10, 'CLN202203013850', 30, '2022-03-01 03:50:57', '2022-03-08 12:00:00', '2022-03-01 09:52:20', 0, 100, 0, 'diambil', 'dibayar', 1),
(51, 9, 'CLN202203012013', NULL, '2022-03-01 16:13:20', '2022-03-08 16:13:20', NULL, 0, 0, 0, 'baru', 'belum', 1),
(52, 9, 'CLN202203011314', NULL, '2022-03-01 16:14:13', '2022-03-08 16:14:13', NULL, 0, 0, 0, 'baru', 'belum', 1),
(55, 9, 'CLN202203015827', 30, '2022-03-01 16:27:58', '2022-03-08 16:27:58', NULL, 0, 0, 0, 'baru', 'belum', 1),
(56, 9, 'CLN202203015343', 30, '2022-03-01 16:43:53', '2022-03-08 16:43:53', NULL, 0, 0, 0, 'baru', 'belum', 1),
(57, 9, 'CLN202203030743', 29, '2022-03-03 20:43:07', '2022-03-10 20:43:07', NULL, 0, 0, 0, 'baru', 'belum', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `nama_user` varchar(228) CHARACTER SET utf8mb4 DEFAULT NULL,
  `username` varchar(228) CHARACTER SET utf8mb4 DEFAULT NULL,
  `password` varchar(228) CHARACTER SET utf8mb4 DEFAULT NULL,
  `outlet_id` int(11) DEFAULT NULL,
  `role` enum('admin','kasir','owner') CHARACTER SET utf8mb4 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `nama_user`, `username`, `password`, `outlet_id`, `role`) VALUES
(1, 'adminku', 'admin', '21232f297a57a5a743894a0e4a801fc3', 10, 'admin'),
(3, 'ownerku', 'owner', '72122ce96bfec66e2396d2e25225d70a', 10, 'owner'),
(6, 'Kasir Merah', 'kasirmerah', 'cdd9b843e296b9ff6745d122f19809d4', 12, 'kasir'),
(7, 'Kasir Putih', 'kasirputih', '2443e07a602220051698d22bdc6ac718', 10, 'kasir'),
(8, 'Admin Dua', 'admin2', '$2b$10$986GBa/VS8HwWojKEOb.Ce3e1qjeDm6jLu2/ArM0ad6DwdJ3HKO.W', 10, 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD PRIMARY KEY (`id_detail`),
  ADD KEY `id_transaksi` (`id_transaksi`),
  ADD KEY `id_paket` (`id_paket`);

--
-- Indexes for table `outlet`
--
ALTER TABLE `outlet`
  ADD PRIMARY KEY (`id_outlet`);

--
-- Indexes for table `paket_cuci`
--
ALTER TABLE `paket_cuci`
  ADD PRIMARY KEY (`id_paket`),
  ADD KEY `outlet_id` (`outlet_id`);

--
-- Indexes for table `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`id_pelanggan`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_pelanggan` (`id_pelanggan`),
  ADD KEY `outlet_id` (`outlet_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `outlet_id` (`outlet_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  MODIFY `id_detail` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `outlet`
--
ALTER TABLE `outlet`
  MODIFY `id_outlet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `paket_cuci`
--
ALTER TABLE `paket_cuci`
  MODIFY `id_paket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `pelanggan`
--
ALTER TABLE `pelanggan`
  MODIFY `id_pelanggan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD CONSTRAINT `detail_transaksi_ibfk_4` FOREIGN KEY (`id_paket`) REFERENCES `paket_cuci` (`id_paket`) ON UPDATE CASCADE,
  ADD CONSTRAINT `detail_transaksi_ibfk_5` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi` (`id_transaksi`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `paket_cuci`
--
ALTER TABLE `paket_cuci`
  ADD CONSTRAINT `paket_cuci_ibfk_1` FOREIGN KEY (`outlet_id`) REFERENCES `outlet` (`id_outlet`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paket_cuci_ibfk_2` FOREIGN KEY (`outlet_id`) REFERENCES `outlet` (`id_outlet`);

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_4` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transaksi_ibfk_5` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggan` (`id_pelanggan`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transaksi_ibfk_6` FOREIGN KEY (`outlet_id`) REFERENCES `outlet` (`id_outlet`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`outlet_id`) REFERENCES `outlet` (`id_outlet`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
