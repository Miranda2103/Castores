USE [CASTORES]
GO

/****** Object:  View [dbo].[vwSubMenu]    Script Date: 05/05/2025 10:21:59 p. m. ******/
IF EXISTS(select * FROM sys.views where name = 'vwSubMenu')
	BEGIN
		DROP VIEW [dbo].[vwSubMenu]
	END
GO

/****** Object:  View [dbo].[vwSubMenu]    Script Date: 05/05/2025 10:21:59 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO























CREATE VIEW [dbo].[vwSubMenu]
AS
	
	SELECT
		sm.IdMenu
		,m.Menu
		,sm.Id AS IdSubMenu
		,sm.SubMenu
		,sm.Ruta
		,sm.Icono
		,sm.Orden
		,CONVERT(BIT,0) AS Estatus
		,CONVERT(VARCHAR(10),sm.FechaInserta,103) AS Fecha
		,sm.Activo
	FROM		[dbo].[SubMenu] sm
	INNER JOIN	[dbo].[Menu] m ON m.Id = sm.IdMenu
	WHERE
		sm.Activo = 1

GO


