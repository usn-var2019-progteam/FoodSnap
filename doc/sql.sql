SQL endringer

alter table Bilde drop Bildenavn;
alter table Bilde add Bilde mediumblob;

drop table if exists Bilde;
create table Bilde (
BildeId INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
BrukerId INTEGER,
OpprettetDato DATETIME,
Bilde mediumblob
);

drop table if exists Innhold;
create table Innhold (
    InnholdId integer not null auto_increment primary key,
    Innhold varchar(100),
    BildeId integer,
    Kcal double,
    Karb double,
    Prot double,
    Fett double,
    Gram double
);




