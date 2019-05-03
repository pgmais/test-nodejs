SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Banco de Dados: `projeto`
--
DROP DATABASE `projeto`;
CREATE DATABASE `projeto` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `projeto`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `clients`
--

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `CEP` bigint(20) NOT NULL,
  `CPF` bigint(20) NOT NULL,
  `date_sent` datetime NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Extraindo dados da tabela `clients`
--

INSERT INTO `clients` (`id`, `name`, `CEP`, `CPF`, `date_sent`, `status`) VALUES
(1, 'Teste de primeiro valor', 83010220, 99988877745, '2019-05-03 16:38:36', 'update_info'),
(2, 'Teste', 83010220, 99988877745, '2019-05-03 08:21:06', 'uploaded'),
(3, 'Teste3', 83010220, 99988877745, '2019-05-03 08:21:10', 'uploaded'),
(7, 'Test10', 83010220, 99988877745, '2019-05-03 09:04:19', 'uploaded'),
(18, 'Test10', 83010220, 99988877745, '2019-05-03 16:38:36', 'uploaded');