USE real_estate_db;

-- -----------------------------------------------------
-- Table `property_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS property_types (
  id_property_type INT NOT NULL AUTO_INCREMENT,
  property_type_name VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_property_type)
);

-- -----------------------------------------------------
-- Add data to the table `property_types`
-- -----------------------------------------------------

INSERT INTO property_types (property_type_name) VALUES
('Apartamento'),
('Casa'),
('Terreno'),
('Comercial'),
('Sobrado'),
('Chácara'),
('Cobertura'),
('Studio');

-- -----------------------------------------------------
-- Table `properties`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS properties (
  cod_property CHAR(4) NOT NULL,
  property_description VARCHAR(45) NOT NULL,
  property_type_id INT NOT NULL,
  PRIMARY KEY (cod_property),
  CONSTRAINT fk_properties_property_types
    FOREIGN KEY (property_type_id)
    REFERENCES property_types (id_property_type)
    ON DELETE RESTRICT
);

-- -----------------------------------------------------
-- Add data to the table `properties`
-- -----------------------------------------------------
INSERT INTO properties (cod_property, property_description, property_type_id) VALUES
('0001', 'Apartamento 1 Dormitório', 1),
('0002', 'Casa com 3 Quartos', 2),
('0003', 'Terreno para Construção', 3),
('0004', 'Loja Comercial no Centro', 4),
('0005', 'Sobrado com 2 Andares', 5),
('0006', 'Chácara com Lago', 6),
('0007', 'Cobertura com Terraço', 7),
('0008', 'Studio Moderno', 8),
('0009', 'Apartamento 2 Dormitórios', 1),
('0010', 'Casa com 2 Suítes', 2),
('0011', 'Terreno para Construção no Centro', 3),
('0012', 'Loja Comercial no Sul', 4),
('0013', 'Sobrado com 2 Andares e 1 Suíte', 5);

-- -----------------------------------------------------
-- Table `rentals`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS rentals (
  id_rental INT NOT NULL AUTO_INCREMENT,
  rental_start_date DATE NOT NULL,
  rental_end_date DATE NULL,
  monthly_rent DECIMAL(10,2) NOT NULL,
  property_cod CHAR(4) NOT NULL,
  PRIMARY KEY (id_rental),
  CONSTRAINT fk_rentals_properties
    FOREIGN KEY (property_cod)
    REFERENCES properties (cod_property)
    ON DELETE RESTRICT
);

-- -----------------------------------------------------
-- Add data to the table `rentals`
-- -----------------------------------------------------
INSERT INTO rentals (rental_start_date, rental_end_date, monthly_rent, property_cod) VALUES
('2024-01-01', NULL, 1000.00, '0001'),
('2024-01-15', NULL, 1500.00, '0002'),
('2024-02-01', NULL, 1200.00, '0003'),
('2024-02-10', NULL, 1300.00, '0004'),
('2024-03-01', NULL, 1400.00, '0005'),
('2024-03-15', NULL, 1100.00, '0006'),
('2024-04-01', NULL, 1500.00, '0007'),
('2024-04-15', NULL, 1600.00, '0008'),
('2023-05-16', '2023-08-20', 1200.00, '0009'),
('2022-06-17', '2022-09-20', 1300.00, '0010'),
('2021-07-18', '2021-10-20', 1400.00, '0011'),
('2020-08-19', '2020-11-25', 1500.00, '0012'),
('2019-09-20', '2019-12-25', 1600.00, '0013');



-- -----------------------------------------------------
-- Table `payments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS payments (
  id_payment INT NOT NULL AUTO_INCREMENT,
  payment_date DATE NOT NULL,
  payment_amount DECIMAL(10,2) NOT NULL,
  rental_id INT NOT NULL,
  PRIMARY KEY (id_payment),
  CONSTRAINT fk_payments_rentals
    FOREIGN KEY (rental_id)
    REFERENCES rentals (id_rental)
    ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Add data to the table `payments`
-- -----------------------------------------------------
INSERT INTO payments (payment_date, payment_amount, rental_id) VALUES
-- For rent 1
('2024-01-15', 1000.00, 1),
('2024-02-15', 1000.00, 1),
('2024-03-15', 1000.00, 1),
('2024-04-15', 1000.00, 1),
('2024-05-15', 1000.00, 1),

-- For rent 2
('2024-01-20', 1500.00, 2),
('2024-02-20', 1500.00, 2),
('2024-03-20', 1500.00, 2),
('2024-04-20', 1500.00, 2),
('2024-05-20', 1500.00, 2),

-- For rent 3
('2024-02-10', 1200.00, 3),
('2024-03-10', 1200.00, 3),
('2024-04-10', 1200.00, 3),
('2024-05-10', 1200.00, 3),
('2024-06-10', 1200.00, 3),

-- For rent 4
('2024-02-15', 1300.00, 4),
('2024-03-15', 1300.00, 4),
('2024-04-15', 1300.00, 4),
('2024-05-15', 1300.00, 4),
('2024-06-15', 1300.00, 4),

-- For rent 5
('2024-03-05', 1400.00, 5),
('2024-04-05', 1400.00, 5),
('2024-05-05', 1400.00, 5),
('2024-06-05', 1400.00, 5),
('2024-07-05', 1400.00, 5),

-- For rent 6
('2024-03-10', 1100.00, 6),
('2024-04-10', 1100.00, 6),
('2024-05-10', 1100.00, 6),
('2024-06-10', 1100.00, 6),
('2024-07-10', 1100.00, 6),

-- For rent 7
('2024-04-01', 1500.00, 7),
('2024-05-01', 1500.00, 7),
('2024-06-01', 1500.00, 7),

-- For rent 8
('2024-04-20', 1600.00, 8),
('2024-05-20', 1600.00, 8),
('2024-06-20', 1600.00, 8),

-- For rent 9
('2023-05-20', 1200.00, 9),
('2023-06-20', 1200.00, 9),
('2023-07-20', 1200.00, 9),

-- For rent 10
('2022-06-20', 1300.00, 10),
('2022-07-20', 1300.00, 10),
('2022-08-20', 1300.00, 10),

-- For rent 11
('2021-07-20', 1400.00, 11),
('2021-08-20', 1400.00, 11),
('2021-09-20', 1400.00, 11),

-- For rent 12
('2020-08-25', 1500.00, 12),
('2020-09-25', 1500.00, 12),
('2020-10-25', 1500.00, 12),

-- For rent 13
('2019-09-25', 1600.00, 13),
('2019-10-25', 1600.00, 13),
('2019-11-25', 1600.00, 13);


