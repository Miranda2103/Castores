USE [CASTORES]
GO

/****** Object:  View [dbo].[vwRolMenu]    Script Date: 05/05/2025 10:23:42 p. m. ******/
IF EXISTS(select * FROM sys.views where name = 'vwRolMenu')
	BEGIN
		DROP VIEW [dbo].[vwRolMenu]
	END
GO

/****** Object:  View [dbo].[vwRolMenu]    Script Date: 05/05/2025 10:23:42 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




















CREATE VIEW [dbo].[vwRolMenu]
AS
	
	SELECT
		r.Id AS IdRol
		,r.Rol
		,m.Id AS IdMenu
		,m.Menu
		,m.Ruta
		,m.Icono
		,m.Orden
		,CONVERT(VARCHAR(10),m.FechaInserta,103) AS Fecha
		,m.Activo
	FROM		[dbo].[Menu] m
	INNER JOIN	[dbo].[RolMenu] rm ON rm.IdMenu = m.Id AnD rm.Activo = 1
	INNER JOIN	[dbo].[Rol] r ON r.Id = rm.IdRol AND r.Activo = 1
	WHERE
		m.Activo = 1

GO


