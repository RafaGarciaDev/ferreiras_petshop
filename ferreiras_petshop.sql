-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 25-Mar-2025 às 21:12
-- Versão do servidor: 8.0.31
-- versão do PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `ferreiras_petshop`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `cliente`
--

DROP TABLE IF EXISTS `cliente`;
CREATE TABLE IF NOT EXISTS `cliente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `endereco` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cpf` (`cpf`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estrutura da tabela `produtos`
--

DROP TABLE IF EXISTS `produtos`;
CREATE TABLE IF NOT EXISTS `produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `produto_id` int NOT NULL,
  `nome` varchar(255) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `estoque` int NOT NULL DEFAULT '0',
  `categoria` varchar(100) DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `produtos`
--

INSERT INTO `produtos` (`id`, `produto_id`, `nome`, `preco`, `estoque`, `categoria`, `ativo`, `created_at`, `updated_at`) VALUES
(1, 1, 'Hysteril Desinfetante e Eliminador de Odores Agener ou Ultra Desinfetante Procão Citronela 1 Lt', '80.99', 20, 'cachorro', 1, '2025-03-25 20:29:08', '2025-03-25 20:29:08'),
(2, 2, 'Gourmet-Caes-Adultos-Medio-e-Grande 15 kg ou Golden-Formula-Frango-e-Arroz 15 kg', '215.60', 10, 'cachorro', 1, '2025-03-25 20:29:08', '2025-03-25 20:29:08'),
(3, 3, 'Ração para Peixe Botton Fish ou Alcon Basic Alimento completo em flocos para peixes ornamentais', '8.50', 30, 'passaro', 1, '2025-03-25 20:29:08', '2025-03-25 20:29:08'),
(4, 4, 'Racao-Premier-Formula-Caes-Adultos 15 kg ou Ração Premier raças grandes e gigantes 15 kg', '255.00', 15, 'cachorro', 1, '2025-03-25 20:29:08', '2025-03-25 20:29:08'),
(5, 5, 'Sache-Caes-Keldog-Carneiro ou Sache-Caes-keldog-Carne', '37.50', 25, 'cachorro', 1, '2025-03-25 20:29:08', '2025-03-25 20:29:08'),
(6, 6, 'Comedouro Alum.medio ou Comedouro Alum.grande', '22.00', 50, 'cachorro', 1, '2025-03-25 20:29:08', '2025-03-25 20:29:08'),
(7, 7, 'Sistema de Terapia Trauma para Cães e Gatos ou Sistema de Terapia Displasia para Cães e Gatos', '105.99', 10, 'cachorro', 1, '2025-03-25 20:29:08', '2025-03-25 20:29:08'),
(8, 8, 'Ração Úmida Pet Delícia Frango ou Ração Úmida Pet Delícia Carne', '40.00', 40, 'cachorro', 1, '2025-03-25 20:29:08', '2025-03-25 20:29:08'),
(9, 9, 'Sanol Shampoo Dog Neutro ou Sanol Condicionador Dog Neutro', '7.50', 60, 'cachorro', 1, '2025-03-25 20:29:08', '2025-03-25 20:29:08'),
(10, 10, 'Shampoo HYDRA PRO Neutro ou Condicionador HYDRA PRO Brilho e Desembaraço', '315.00', 5, 'cachorro', 1, '2025-03-25 20:29:08', '2025-03-25 20:29:08'),
(11, 11, 'Shampoo Dog Neutro Sanol ou Shampoo Anti Pulgas Sanol', '15.00', 20, 'cachorro', 1, '2025-03-25 20:29:08', '2025-03-25 20:29:08'),
(12, 12, 'Shampoo Anti Pulgas para Cães', '27.00', 15, 'cachorro', 1, '2025-03-25 20:29:08', '2025-03-25 20:29:08'),
(13, 13, 'Hysteril Desinfetante e Eliminador de Odores Agener ou Ultra Desinfetante Procão Citronela 1 Lt', '80.99', 20, 'cachorro', 1, '2025-03-25 20:29:08', '2025-03-25 20:29:08'),
(14, 14, 'Gourmet-Caes-Adultos-Medio-e-Grande 15 kg ou Golden-Formula-Frango-e-Arroz 15 kg', '215.60', 10, 'cachorro', 1, '2025-03-25 20:29:08', '2025-03-25 20:29:08'),
(15, 15, 'Ração para Peixe Botton Fish ou Alcon Basic Alimento completo em flocos para peixes ornamentais', '8.50', 30, 'passaro', 1, '2025-03-25 20:29:08', '2025-03-25 20:29:08'),
(16, 16, 'Racao-Premier-Formula-Caes-Adultos 15 kg ou Ração Premier raças grandes e gigantes 15 kg', '255.00', 15, 'cachorro', 1, '2025-03-25 20:29:08', '2025-03-25 20:29:08'),
(17, 17, 'Sache-Caes-Keldog-Carneiro ou Sache-Caes-keldog-Carne', '37.50', 25, 'cachorro', 1, '2025-03-25 20:29:08', '2025-03-25 20:29:08'),
(18, 18, 'Comedouro Alum.medio ou Comedouro Alum.grande', '22.00', 50, 'cachorro', 1, '2025-03-25 20:29:08', '2025-03-25 20:29:08'),
(19, 19, 'Sistema de Terapia Trauma para Cães e Gatos ou Sistema de Terapia Displasia para Cães e Gatos', '105.99', 10, 'cachorro', 1, '2025-03-25 20:29:08', '2025-03-25 20:29:08'),
(20, 20, 'Ração Úmida Pet Delícia Frango ou Ração Úmida Pet Delícia Carne', '40.00', 40, 'cachorro', 1, '2025-03-25 20:29:08', '2025-03-25 20:29:08'),
(21, 21, 'Sanol Shampoo Dog Neutro ou Sanol Condicionador Dog Neutro', '7.50', 60, 'cachorro', 1, '2025-03-25 20:29:08', '2025-03-25 20:29:08'),
(22, 22, 'Shampoo HYDRA PRO Neutro ou Condicionador HYDRA PRO Brilho e Desembaraço', '315.00', 5, 'cachorro', 1, '2025-03-25 20:29:08', '2025-03-25 20:29:08'),
(23, 23, 'Shampoo Hydra Groomers Pro Neutro para Cães e Gatos', '120.00', 10, 'cachorro', 1, '2025-03-25 20:29:08', '2025-03-25 20:29:08'),
(24, 24, 'Condicionador Hydra Groomers Pro Brilho', '85.00', 20, 'cachorro', 1, '2025-03-25 20:29:08', '2025-03-25 20:29:08');

-- --------------------------------------------------------

--
-- Estrutura da tabela `vendas`
--

DROP TABLE IF EXISTS `vendas`;
CREATE TABLE IF NOT EXISTS `vendas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data_venda` datetime DEFAULT CURRENT_TIMESTAMP,
  `total` decimal(10,2) NOT NULL,
  `status` enum('pendente','pago','cancelado','confirmado') NOT NULL DEFAULT 'pendente',
  `cliente_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `cliente_id` (`cliente_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `vendas`
--

INSERT INTO `vendas` (`id`, `data_venda`, `total`, `status`, `cliente_id`, `created_at`, `updated_at`) VALUES
(4, '2025-03-25 17:29:29', '350.00', 'confirmado', NULL, '2025-03-25 20:29:29', '2025-03-25 20:29:29'),
(5, '2025-03-25 17:33:30', '2222.48', 'confirmado', NULL, '2025-03-25 20:33:30', '2025-03-25 20:33:30');

-- --------------------------------------------------------

--
-- Estrutura da tabela `venda_itens`
--

DROP TABLE IF EXISTS `venda_itens`;
CREATE TABLE IF NOT EXISTS `venda_itens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `venda_id` int NOT NULL,
  `produto_id` int NOT NULL,
  `produto_nome` varchar(191) NOT NULL,
  `preco_unitario` decimal(10,2) NOT NULL,
  `quantidade` int NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `venda_id` (`venda_id`),
  KEY `produto_id` (`produto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `venda_itens`
--

INSERT INTO `venda_itens` (`id`, `venda_id`, `produto_id`, `produto_nome`, `preco_unitario`, `quantidade`, `subtotal`, `created_at`) VALUES
(4, 4, 11, 'Comedouro-pequeno-n-03-furacao-pet', '35.00', 10, '350.00', '2025-03-25 20:29:29'),
(5, 5, 2, 'Mistura Balanceada Zootekna de Sementes Papagaio', '7.50', 1, '7.50', '2025-03-25 20:33:30'),
(6, 5, 6, 'Ração para Peixe Botton Fish', '8.50', 2, '17.00', '2025-03-25 20:33:30'),
(7, 5, 3, 'Antipulgas-e-carrapatos-bravecto 4 a 10 kg', '122.50', 1, '122.50', '2025-03-25 20:33:30'),
(8, 5, 7, 'Bebedouro-vida-mansa-azul', '215.00', 1, '215.00', '2025-03-25 20:33:30'),
(9, 5, 8, 'Caixa De Transp Luxo Furacaopet N2 Vermelha', '255.00', 1, '255.00', '2025-03-25 20:33:30'),
(10, 5, 10, 'Comedouro-alum-suporte-regulavel-n-03', '127.00', 1, '127.00', '2025-03-25 20:33:30'),
(11, 5, 9, 'Cama-fascinio-plush-marinho', '365.50', 1, '365.50', '2025-03-25 20:33:30'),
(12, 5, 14, 'Gourmet-Caes-Adultos-Medio-e-Grande 15 kg', '215.60', 1, '215.60', '2025-03-25 20:33:30'),
(13, 5, 13, 'Hysteril Desinfetante e Eliminador de Odores Agener', '80.99', 1, '80.99', '2025-03-25 20:33:30'),
(14, 5, 15, 'Ração para Peixe Botton Fish', '8.50', 1, '8.50', '2025-03-25 20:33:30'),
(15, 5, 16, 'Racao-Premier-Formula-Caes-Adultos 15 kg', '255.00', 1, '255.00', '2025-03-25 20:33:30'),
(16, 5, 19, 'Sistema de Terapia Trauma  para Cães e Gatos', '105.99', 1, '105.99', '2025-03-25 20:33:30'),
(17, 5, 18, 'Comedouro Alum.medio', '22.00', 1, '22.00', '2025-03-25 20:33:30'),
(18, 5, 17, 'Sache-Caes-Keldog-Carneiro', '37.50', 1, '37.50', '2025-03-25 20:33:30'),
(19, 5, 20, 'Ração Úmida Pet Delícia Frango', '40.00', 1, '40.00', '2025-03-25 20:33:30'),
(20, 5, 24, 'Sache-Caes-Adultos-Racas-Pequenas-Cordeiro-ao-Molho', '9.90', 1, '9.90', '2025-03-25 20:33:30'),
(21, 5, 23, 'Shampoo-2-em-1-catdog', '15.00', 1, '15.00', '2025-03-25 20:33:30'),
(22, 5, 22, 'Shampoo HYDRA PRO Neutro', '315.00', 1, '315.00', '2025-03-25 20:33:30'),
(23, 5, 21, 'Sanol Shampoo Dog Neutro ou Sanol Condicionador Dog Neutro', '7.50', 1, '7.50', '2025-03-25 20:33:30');

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `vendas`
--
ALTER TABLE `vendas`
  ADD CONSTRAINT `vendas_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`) ON DELETE SET NULL;

--
-- Limitadores para a tabela `venda_itens`
--
ALTER TABLE `venda_itens`
  ADD CONSTRAINT `venda_itens_ibfk_1` FOREIGN KEY (`venda_id`) REFERENCES `vendas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `venda_itens_ibfk_2` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
