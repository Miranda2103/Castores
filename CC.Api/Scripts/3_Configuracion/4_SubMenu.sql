USE [CASTORES]
GO

INSERT INTO [dbo].[SubMenu]
           ([IdMenu]
           ,[SubMenu]
           ,[Ruta]
           ,[Icono]
           ,[Orden]
           ,[IdUsuarioInserta])
VALUES
	(1,'Entrada','/main/products-entry','vertical_split',1,1)
	,(1,'Salida','/main/products-output','vertical_split',2,1)
	,(1,'Historial','/main/products-history','bar_chart',3,1)
	,(2,'Rol','/main/rol','subject',1,1)
	,(2,'Roles','/main/rol-menu','recent_actors',2,1)
	,(2,'Usuarios','/main/user','people',3,1)
GO


