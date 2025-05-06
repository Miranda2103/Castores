USE [CASTORES]
GO

/****** Object:  View [dbo].[vwProductoSalida]    Script Date: 05/05/2025 11:21:34 p. m. ******/
IF EXISTS(select * FROM sys.views where name = 'vwProductoSalida')
	BEGIN
		DROP VIEW [dbo].[vwProductoSalida]
	END
GO

/****** Object:  View [dbo].[vwProductoSalida]    Script Date: 05/05/2025 11:21:34 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO






















CREATE VIEW [dbo].[vwProductoSalida]
AS

	select
		[IdProducto] = pe.Id
		,pe.Producto
		,[CantidadEntrada] = pe.Cantidad
		,[CantidadSalida] = isnull(ps.CantidadSalida,0)
		,[Cantidad] = 0
		,convert(varchar(10),pe.FechaInserta,103) AS Fecha
		,pe.Activo
	from		[dbo].[ProductoEntrada] pe
	left join	(
		
		select 
			idProducto
			,[CantidadSalida] = sum(Cantidad)
		from [dbo].[ProductoSalida]
		where
			Activo = 1
		group by
			idProducto
	
	)ps on ps.IdProducto = pe.Id

GO


