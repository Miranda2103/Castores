USE [CASTORES]
GO

/****** Object:  View [dbo].[vwUsuario]    Script Date: 05/05/2025 10:25:05 p. m. ******/
IF EXISTS(select * FROM sys.views where name = 'vwUsuario')
	BEGIN
		DROP VIEW [dbo].[vwUsuario]
	END
GO

/****** Object:  View [dbo].[vwUsuario]    Script Date: 05/05/2025 10:25:05 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

























CREATE VIEW [dbo].[vwUsuario]
AS
	
	select
		u.Id as IdUsuario
		,u.Usuario
		,u.Contrasena
		,u.Nombre
		,u.ApellidoPaterno
		,u.ApellidoMaterno
		,u.NombreCompleto
		,u.CambiaContrasena
		,u.IdRol
		,r.Rol
		,convert(varchar(10),u.FechaInserta,103) as Fecha
		,u.Activo
	from		[dbo].[Usuario] u
	inner join	[dbo].[Rol] r on r.Id = u.IdRol

GO


