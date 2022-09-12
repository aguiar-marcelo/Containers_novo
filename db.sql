show databases;

create database db_container;
use db_container;

 create table container (
 id int not null auto_increment,
 nome char(11),
 cliente varchar(100),
 tipo enum ('20','40'),
 status enum ('Cheio','Vazio'),
 categoria enum ('Importação','Exportação'),

 primary key(id)
 )default charset = utf8;
 
 create table movimentacao (
	id int not null auto_increment,
    id_container int not null,
    tipo enum ('Embarque', 'Descarga', 'Gate-In','Gate-Out', 'Reposicionamento', 'Pesagem', 'Scanner'),
    inicio varchar(30),
    fim varchar(130),

primary key (id),
foreign key (id_container) references container(id)

on delete cascade
on update cascade
 )default charset = utf8;
 
 show tables;

 desc container; 
 desc movimentacao;

select * from container;
select * from movimentacao;

select * from movimentacao where id_container = '3';

update container set cliente='fff', tipo='40' where id='ABCD3333333';

INSERT INTO container (nome, cliente, tipo, status, categoria) VALUES 
('ABCD1234565', 'ExemploCorp', '20', 'vazio', 'importacao');

INSERT INTO movimentacao (id_container, tipo, inicio, fim) VALUES 
('3', 'Descarga', '2022/12/05 11:59:30', '2022/12/06 11:59:30');


DELETE FROM movimentacao where tipo = 'gate-out';

drop table movimentacao;

alter table container
modify nome char(11) not null unique;


/*----------------------------------------------------------------------------------------------------------
Relatório com o total de movimentações agrupadas por cliente e tipo de
movimentação.
3.1. No final do relatório deverá conter um sumário com o total de importação /
exportação.
*/
SELECT c.cliente,  m.tipo,count(*) AS total_mov
FROM movimentacao m JOIN container c
ON m.id_container = c.id
GROUP BY c.cliente, m.tipo;


SELECT count(categoria) AS quantidades FROM container GROUP BY categoria;