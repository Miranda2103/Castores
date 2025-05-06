USE [CASTORES]
GO

/****** Object:  Table [dbo].[ProductoEntrada]    Script Date: 05/05/2025 10:00:03 p. m. ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ProductoEntrada]') AND type in (N'U'))
DROP TABLE [dbo].[ProductoEntrada]
GO

/****** Object:  Table [dbo].[ProductoEntrada]    Script Date: 05/05/2025 10:00:03 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ProductoEntrada](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Producto] [varchar](50) NOT NULL,
	[Cantidad] [int] NOT NULL,
	[IdUsuarioInserta] [bigint] NOT NULL,
	[FechaInserta] [datetime] NOT NULL,
	[IdUsuarioActualiza] [bigint] NOT NULL,
	[FechaActualiza] [datetime] NOT NULL,
	[Activo] [bit] NOT NULL,
 CONSTRAINT [PK_Producto] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ProductoEntrada] ADD  CONSTRAINT [DF_ProductoEntrada_Cantidad]  DEFAULT ((0)) FOR [Cantidad]
GO

ALTER TABLE [dbo].[ProductoEntrada] ADD  CONSTRAINT [DF_ProductoEntrada_fecha]  DEFAULT (getdate()) FOR [FechaInserta]
GO

ALTER TABLE [dbo].[ProductoEntrada] ADD  CONSTRAINT [DF_ProductoEntrada_IdUsuarioActualiza]  DEFAULT ((0)) FOR [IdUsuarioActualiza]
GO

ALTER TABLE [dbo].[ProductoEntrada] ADD  CONSTRAINT [DF_ProductoEntrada_FechaActualiza]  DEFAULT ('') FOR [FechaActualiza]
GO

ALTER TABLE [dbo].[ProductoEntrada] ADD  CONSTRAINT [DF_ProductoEntrada_Activo]  DEFAULT ((1)) FOR [Activo]
GO

ALTER TABLE [dbo].[ProductoEntrada]  WITH CHECK ADD  CONSTRAINT [FK_ProductoEntrada_Usuario] FOREIGN KEY([IdUsuarioInserta])
REFERENCES [dbo].[Usuario] ([Id])
GO

ALTER TABLE [dbo].[ProductoEntrada] CHECK CONSTRAINT [FK_ProductoEntrada_Usuario]
GO


