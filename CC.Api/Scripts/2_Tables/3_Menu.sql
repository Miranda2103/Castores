USE [CASTORES]
GO

/****** Object:  Table [dbo].[Menu]    Script Date: 05/05/2025 09:59:24 p. m. ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Menu]') AND type in (N'U'))
DROP TABLE [dbo].[Menu]
GO

/****** Object:  Table [dbo].[Menu]    Script Date: 05/05/2025 09:59:24 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Menu](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Menu] [varchar](50) NOT NULL,
	[Ruta] [varchar](50) NOT NULL,
	[Icono] [varchar](50) NOT NULL,
	[Orden] [int] NOT NULL,
	[IdUsuarioInserta] [bigint] NOT NULL,
	[FechaInserta] [datetime] NOT NULL,
	[IdUsuarioActualiza] [bigint] NOT NULL,
	[FechaActualiza] [datetime] NOT NULL,
	[Activo] [bit] NOT NULL,
 CONSTRAINT [PK_Menu] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Menu] ADD  CONSTRAINT [DF_Menu_Fecha]  DEFAULT (getdate()) FOR [FechaInserta]
GO

ALTER TABLE [dbo].[Menu] ADD  CONSTRAINT [DF_Menu_IdUsuarioActualiza]  DEFAULT ((0)) FOR [IdUsuarioActualiza]
GO

ALTER TABLE [dbo].[Menu] ADD  CONSTRAINT [DF_Menu_FechaActualiza]  DEFAULT ('') FOR [FechaActualiza]
GO

ALTER TABLE [dbo].[Menu] ADD  CONSTRAINT [DF_Menu_Activo]  DEFAULT ((1)) FOR [Activo]
GO

ALTER TABLE [dbo].[Menu]  WITH CHECK ADD  CONSTRAINT [FK_Menu_Usuario] FOREIGN KEY([IdUsuarioInserta])
REFERENCES [dbo].[Usuario] ([Id])
GO

ALTER TABLE [dbo].[Menu] CHECK CONSTRAINT [FK_Menu_Usuario]
GO


