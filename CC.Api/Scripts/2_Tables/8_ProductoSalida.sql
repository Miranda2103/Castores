USE [CASTORES]
GO

/****** Object:  Table [dbo].[ProductoSalida]    Script Date: 05/05/2025 10:00:08 p. m. ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ProductoSalida]') AND type in (N'U'))
DROP TABLE [dbo].[ProductoSalida]
GO

/****** Object:  Table [dbo].[ProductoSalida]    Script Date: 05/05/2025 10:00:08 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ProductoSalida](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdProducto] [bigint] NOT NULL,
	[Cantidad] [int] NOT NULL,
	[IdUsuarioInserta] [bigint] NOT NULL,
	[FechaInserta] [datetime] NOT NULL,
	[IdUsuarioActualiza] [bigint] NOT NULL,
	[FechaActualiza] [datetime] NOT NULL,
	[Activo] [bit] NOT NULL,
 CONSTRAINT [PK_ProductoSalida] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ProductoSalida] ADD  CONSTRAINT [DF_ProductoSalida_Cantidad]  DEFAULT ((0)) FOR [Cantidad]
GO

ALTER TABLE [dbo].[ProductoSalida] ADD  CONSTRAINT [DF_ProductoSalida_FechaInserta]  DEFAULT (getdate()) FOR [FechaInserta]
GO

ALTER TABLE [dbo].[ProductoSalida] ADD  CONSTRAINT [DF_ProductoSalida_IdUsuarioActualiza]  DEFAULT ((0)) FOR [IdUsuarioActualiza]
GO

ALTER TABLE [dbo].[ProductoSalida] ADD  CONSTRAINT [DF_ProductoSalida_FechaActualiza]  DEFAULT ('') FOR [FechaActualiza]
GO

ALTER TABLE [dbo].[ProductoSalida] ADD  CONSTRAINT [DF_ProductoSalida_Activo]  DEFAULT ((1)) FOR [Activo]
GO

ALTER TABLE [dbo].[ProductoSalida]  WITH CHECK ADD  CONSTRAINT [FK_ProductoSalida_ProductoEntrada] FOREIGN KEY([IdProducto])
REFERENCES [dbo].[ProductoEntrada] ([Id])
GO

ALTER TABLE [dbo].[ProductoSalida] CHECK CONSTRAINT [FK_ProductoSalida_ProductoEntrada]
GO

ALTER TABLE [dbo].[ProductoSalida]  WITH CHECK ADD  CONSTRAINT [FK_ProductoSalida_Usuario] FOREIGN KEY([IdUsuarioInserta])
REFERENCES [dbo].[Usuario] ([Id])
GO

ALTER TABLE [dbo].[ProductoSalida] CHECK CONSTRAINT [FK_ProductoSalida_Usuario]
GO


