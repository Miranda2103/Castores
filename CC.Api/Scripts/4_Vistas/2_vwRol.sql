USE [CASTORES]
GO

/****** Object:  View [dbo].[vwRol]    Script Date: 05/05/2025 10:23:03 p. m. ******/
IF EXISTS(select * FROM sys.views where name = 'vwRol')
	BEGIN
		DROP VIEW [dbo].[vwRol]
	END
GO

/****** Object:  View [dbo].[vwRol]    Script Date: 05/05/2025 10:23:03 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



















CREATE VIEW [dbo].[vwRol]
AS

	SELECT
		r.Id AS IdRol
		,r.Rol
		,CONVERT(VARCHAR(10),r.FechaInserta,103) AS Fecha
		,r.Activo
	FROM		[dbo].[Rol] r
	WHERE
		r.Activo = 1

GO


