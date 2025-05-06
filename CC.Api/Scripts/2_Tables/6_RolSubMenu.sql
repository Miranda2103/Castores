USE [CASTORES]
GO

/****** Object:  Table [dbo].[RolSubMenu]    Script Date: 05/05/2025 10:00:31 p. m. ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[RolSubMenu]') AND type in (N'U'))
DROP TABLE [dbo].[RolSubMenu]
GO

/****** Object:  Table [dbo].[RolSubMenu]    Script Date: 05/05/2025 10:00:31 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[RolSubMenu](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdRol] [bigint] NOT NULL,
	[IdMenu] [bigint] NOT NULL,
	[IdSubMenu] [bigint] NOT NULL,
	[IdUsuarioInserta] [bigint] NOT NULL,
	[FechaInserta] [datetime] NOT NULL,
	[IdUsuarioActualiza] [bigint] NOT NULL,
	[FechaActualiza] [datetime] NOT NULL,
	[Activo] [bit] NOT NULL,
 CONSTRAINT [PK_RolSubMenu] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[RolSubMenu] ADD  CONSTRAINT [DF_RolSubMenu_FechaInserta]  DEFAULT (getdate()) FOR [FechaInserta]
GO

ALTER TABLE [dbo].[RolSubMenu] ADD  CONSTRAINT [DF_RolSubMenu_IdUsuarioActualiza]  DEFAULT ((0)) FOR [IdUsuarioActualiza]
GO

ALTER TABLE [dbo].[RolSubMenu] ADD  CONSTRAINT [DF_RolSubMenu_FechaActualiza]  DEFAULT ('') FOR [FechaActualiza]
GO

ALTER TABLE [dbo].[RolSubMenu] ADD  CONSTRAINT [DF_RolSubMenu_Activo]  DEFAULT ((1)) FOR [Activo]
GO

ALTER TABLE [dbo].[RolSubMenu]  WITH CHECK ADD  CONSTRAINT [FK_RolSubMenu_Menu] FOREIGN KEY([IdMenu])
REFERENCES [dbo].[Menu] ([Id])
GO

ALTER TABLE [dbo].[RolSubMenu] CHECK CONSTRAINT [FK_RolSubMenu_Menu]
GO

ALTER TABLE [dbo].[RolSubMenu]  WITH CHECK ADD  CONSTRAINT [FK_RolSubMenu_Rol] FOREIGN KEY([IdRol])
REFERENCES [dbo].[Rol] ([Id])
GO

ALTER TABLE [dbo].[RolSubMenu] CHECK CONSTRAINT [FK_RolSubMenu_Rol]
GO

ALTER TABLE [dbo].[RolSubMenu]  WITH CHECK ADD  CONSTRAINT [FK_RolSubMenu_SubMenu] FOREIGN KEY([IdSubMenu])
REFERENCES [dbo].[SubMenu] ([Id])
GO

ALTER TABLE [dbo].[RolSubMenu] CHECK CONSTRAINT [FK_RolSubMenu_SubMenu]
GO

ALTER TABLE [dbo].[RolSubMenu]  WITH CHECK ADD  CONSTRAINT [FK_RolSubMenu_Usuario] FOREIGN KEY([IdUsuarioInserta])
REFERENCES [dbo].[Usuario] ([Id])
GO

ALTER TABLE [dbo].[RolSubMenu] CHECK CONSTRAINT [FK_RolSubMenu_Usuario]
GO


