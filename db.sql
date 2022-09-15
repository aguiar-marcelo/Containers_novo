create database db_container;
use db_container;

create table container (
	id int not null auto_increment,
    nome char(11),
    cliente varchar(100),
    tipo enum ('20','40'),
    `status` enum ('Cheio', 'Vazio'),
    categoria enum ('Importação','Exportação'),
    
    primary key (id)
)default charset = utf8;

desc container;

create table movimentacao (
	id int not null auto_increment,
    id_container int not null,
    tipo enum('Embarque','Descarga','Gate-In','Gate-Out','Reposicionamento','Pesagem','Scanner'),
    inicio varchar(30),
    fim varchar(30),
    
    primary key(id),
    foreign key(id_container) references container(id)
    
    on delete cascade
    on update cascade
)default charset = utf8;

desc movimentacao;

select * from container;
select * from movimentacao;


insert into container (nome, cliente, tipo, status, categoria) values
('ABCD1234567','Empresa1','20','Vazio','Importação');

insert into movimentacao (id_container, tipo, inicio, fim) values
('1','Embarque','17/04/2002 12:00','18/04/2002 13:00');


/*----------------------------Relatorios--------------------------------*/

select distinct
       c.cliente,
       ( select count(tipo) from movimentacao m2 where m2.tipo = 'Embarque' and m2.id_container = c.id group by tipo) as Embarque,
       ( select count(tipo) from movimentacao m2 where m2.tipo = 'Descarga' and m2.id_container = c.id group by tipo) as Descarga,
       ( select count(tipo) from movimentacao m2 where m2.tipo = 'Gate-In' and m2.id_container = c.id group by tipo) as GateIn,
       ( select count(tipo) from movimentacao m2 where m2.tipo = 'Gate-Out' and m2.id_container = c.id group by tipo) as GateOut,
       ( select count(tipo) from movimentacao m2 where m2.tipo = 'Reposicionamento' and m2.id_container = c.id group by tipo) as Reposicionamento,
       ( select count(tipo) from movimentacao m2 where m2.tipo = 'Pesagem' and m2.id_container = c.id group by tipo) as Pesagem,
       ( select count(tipo) from movimentacao m2 where m2.tipo = 'Scanner' and m2.id_container = c.id group by tipo) as Scanner
  from movimentacao m join container c
    on m.id_container = c.id
group by c.cliente, m.tipo;


SELECT count(categoria) AS quantidade FROM container GROUP BY categoria;
