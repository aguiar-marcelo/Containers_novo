show databases;

create database db_container;
use db_container;

 create table container (
 id int not null auto_increment,
 nome char(11) not null,
 cliente varchar(100) not null,
 tipo enum ('20','40') not null,
 `status` enum ('Cheio','Vazio') not null,
 categoria enum ('Importação','Exportação') not null,

 primary key(id)
 )default charset = utf8;
 
 create table movimentacao (
	id int not null auto_increment,
    id_container int not null,
    tipo enum ('Embarque', 'Descarga', 'Gate-In','Gate-Out', 'Reposicionamento', 'Pesagem', 'Scanner'),
    inicio datetime,
    fim datetime,

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

select * from movimentacao where id_container = '4';

update container set cliente='fff', tipo='40' where id='ABCD3333333';

INSERT INTO container (nome, cliente, tipo, status, categoria) VALUES 
('ABCD1234565', 'ExemploCorp', '20', 'vazio', 'importacao');

INSERT INTO movimentacao (id_container, tipo, inicio, fim) VALUES 
('4', 'Descarga', '2022-12-05 11:59:30', '2022-12-06 11:59:30');


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
select count(*) from movimentacao;


select c.cliente, count(*) as total_mov, m.tipo
from movimentacao m join container c
on m.id_conteiner = c.id
group by c.cliente, m.tipo;