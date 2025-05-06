USE [CASTORES]
GO

INSERT INTO [dbo].[Usuario]
           ([Usuario]
           ,[Contrasena]
           ,[Nombre]
           ,[ApellidoPaterno]
           ,[ApellidoMaterno]
           ,[CambiaContrasena]
           ,[IdRol]
           ,[IdUsuarioInserta])
VALUES
	('almacen','40bd001563085fc35165329ea1ff5c5ecbdbbeef','ALMACEN','ALMACEN','ALMACEN',0,1,1)
	,('admin','40bd001563085fc35165329ea1ff5c5ecbdbbeef','ADMIN','ADMIN','ADMIN',0,2,1)
GO


