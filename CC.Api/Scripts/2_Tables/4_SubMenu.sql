USE [CASTORES]
GO

/****** Object:  Table [dbo].[SubMenu]    Script Date: 05/05/2025 10:00:36 p. m. ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SubMenu]') AND type in (N'U'))
DROP TABLE [dbo].[SubMenu]
GO

/****** Object:  Table [dbo].[SubMenu]    Script Date: 05/05/2025 10:00:36 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[SubMenu](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdMenu] [bigint] NOT NULL,
	[SubMenu] [varchar](50) NOT NULL,
	[Ruta] [varchar](50) NOT NULL,
	[Icono] [varchar](50) NOT NULL,
	[Orden] [int] NOT NULL,
	[IdUsuarioInserta] [bigint] NOT NULL,
	[FechaInserta] [datetime] NOT NULL,
	[IdUsuarioActualiza] [bigint] NOT NULL,
	[FechaActualiza] [datetime] NOT NULL,
	[Activo] [bit] NOT NULL,
 CONSTRAINT [PK_SubMenu] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[SubMenu] ADD  CONSTRAINT [DF_SubMenu_Fecha]  DEFAULT (getdate()) FOR [FechaInserta]
GO

ALTER TABLE [dbo].[SubMenu] ADD  CONSTRAINT [DF_SubMenu_IdUsuarioActualiza]  DEFAULT ((0)) FOR [IdUsuarioActualiza]
GO

ALTER TABLE [dbo].[SubMenu] ADD  CONSTRAINT [DF_SubMenu_FechaActualiza]  DEFAULT ('') FOR [FechaActualiza]
GO

ALTER TABLE [dbo].[SubMenu] ADD  CONSTRAINT [DF_SubMenu_Activo]  DEFAULT ((1)) FOR [Activo]
GO

ALTER TABLE [dbo].[SubMenu]  WITH CHECK ADD  CONSTRAINT [FK_SubMenu_Menu] FOREIGN KEY([IdMenu])
REFERENCES [dbo].[Menu] ([Id])
GO

ALTER TABLE [dbo].[SubMenu] CHECK CONSTRAINT [FK_SubMenu_Menu]
GO

ALTER TABLE [dbo].[SubMenu]  WITH CHECK ADD  CONSTRAINT [FK_SubMenu_Usuario] FOREIGN KEY([IdUsuarioInserta])
REFERENCES [dbo].[Usuario] ([Id])
GO

ALTER TABLE [dbo].[SubMenu] CHECK CONSTRAINT [FK_SubMenu_Usuario]
GO


