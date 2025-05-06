USE [CASTORES]
GO

/****** Object:  View [dbo].[vwProductoEntrada]    Script Date: 05/05/2025 11:21:25 p. m. ******/
IF EXISTS(select * FROM sys.views where name = 'vwProductoEntrada')
	BEGIN
		DROP VIEW [dbo].[vwProductoEntrada]
	END
GO

/****** Object:  View [dbo].[vwProductoEntrada]    Script Date: 05/05/2025 11:21:25 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





















CREATE VIEW [dbo].[vwProductoEntrada]
AS

	select
		[IdProducto] = Id
		,Producto
		,Cantidad
		,convert(varchar(10),FechaInserta,103) AS Fecha
		,Activo
	from		[dbo].[ProductoEntrada]

GO


