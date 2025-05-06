USE [CASTORES]
GO

/****** Object:  View [dbo].[vwMenu]    Script Date: 05/05/2025 10:20:13 p. m. ******/
IF EXISTS(select * FROM sys.views where name = 'vwMenu')
	BEGIN
		DROP VIEW [dbo].[vwMenu]
	END
GO

/****** Object:  View [dbo].[vwMenu]    Script Date: 05/05/2025 10:20:13 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




















CREATE VIEW [dbo].[vwMenu]
AS
	
	SELECT
		m.Id AS IdMenu
		,m.Menu
		,m.Ruta
		,m.Icono
		,m.Orden
		,CONVERT(BIT,0) AS Estatus
		,CONVERT(VARCHAR(10),m.FechaInserta,103) AS Fecha
		,m.Activo
	FROM		[dbo].[Menu] m
	WHERE
		m.Activo = 1

GO


