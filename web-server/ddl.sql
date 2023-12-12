-- tables --
CREATE TABLE ricerca(
    dataRicerca    TIMESTAMP,
    user           VARCHAR(100),
    ragioneSociale VARCHAR(50),
    partitaIVA     VARCHAR(13),
    targa          CHAR(7),
    costo          SMALLINT,
    trovato        CHAR(2),
    codiceErrore   INT,
    socio          VARCHAR(60),
    partner        VARCHAR(60),
    marca          VARCHAR(30),
    modello        VARCHAR(70),
    versione       VARCHAR(70),
    codInfocar     VARCHAR(14),
    kw             FLOAT,
    alimentazione  CHAR(2),
    FOREIGN KEY (partitaIVA) REFERENCES officina(partitaIVA)
);

CREATE TABLE officina(
    partitaIVA VARCHAR(13) PRIMARY KEY,
    nome       VARCHAR(100),
    crmID      VARCHAR(7), -- TARGA GO
    provincia  CHAR(2),
    regione    VARCHAR(15),
    citta      VARCHAR(100),
    socio      VARCHAR(100)
);

-- import of the csv --
LOAD DATA INFILE '/var/lib/mysql-files/processed.csv'
IGNORE INTO TABLE ricerca 
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n';

-- views --
CREATE OR REPLACE VIEW modello_per_regione AS
SELECT o.regione, m.modello, COUNT(m.modello) as count FROM
ricerca m JOIN officina o ON m.partitaIVA = o.partitaIVA
GROUP BY o.regione, m.modello;

CREATE OR REPLACE VIEW modello_per_provincia AS
SELECT o.regione, o.provincia, m.marca, m.modello, COUNT(m.modello) as count FROM
ricerca m JOIN officina o ON m.partitaIVA = o.partitaIVA    
GROUP BY o.regione, o.provincia, m.marca, m.modello;
