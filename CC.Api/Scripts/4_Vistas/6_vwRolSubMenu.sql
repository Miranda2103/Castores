USE [CASTORES]
GO

/****** Object:  View [dbo].[vwRolSubMenu]    Script Date: 05/05/2025 10:24:29 p. m. ******/
IF EXISTS(select * FROM sys.views where name = 'vwRolSubMenu')
	BEGIN
		DROP VIEW [dbo].[vwRolSubMenu]
	END
GO

/****** Object:  View [dbo].[vwRolSubMenu]    Script Date: 05/05/2025 10:24:29 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO























CREATE VIEW [dbo].[vwRolSubMenu]
AS
	
	SELECT
		r.Id AS IdRol
		,r.Rol
		,m.Id AS IdMenu
		,m.Menu
		,sm.Id AS IdSubMenu
		,sm.SubMenu
		,sm.SubMenu AS SubMenuR
		,sm.Ruta
		,sm.Icono
		,sm.Orden
		,CONVERT(VARCHAR(10),sm.FechaInserta,103) AS Fecha
		,sm.Activo
	FROM		[dbo].[SubMenu] sm
	INNER JOIN	[dbo].[RolSubMenu] rsm ON rsm.IdSubMenu = sm.Id AnD rsm.Activo = 1
	INNER JOIN	[dbo].[Rol] r ON r.Id = rsm.IdRol AND r.Activo = 1
	INNER JOIN	[dbo].[Menu] m ON m.Id = rsm.IdMenu AND m.Activo = 1
	WHERE
		sm.Activo = 1

GO


