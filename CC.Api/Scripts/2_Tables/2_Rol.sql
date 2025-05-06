USE [CASTORES]
GO

/****** Object:  Table [dbo].[Rol]    Script Date: 05/05/2025 10:00:15 p. m. ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Rol]') AND type in (N'U'))
DROP TABLE [dbo].[Rol]
GO

/****** Object:  Table [dbo].[Rol]    Script Date: 05/05/2025 10:00:15 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Rol](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Rol] [varchar](50) NOT NULL,
	[IdUsuarioInserta] [bigint] NOT NULL,
	[FechaInserta] [datetime] NOT NULL,
	[IdUsuarioActualiza] [bigint] NOT NULL,
	[FechaActualiza] [datetime] NOT NULL,
	[Activo] [bit] NOT NULL,
 CONSTRAINT [PK_Rol] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Rol] ADD  CONSTRAINT [DF_Rol_fecha]  DEFAULT (getdate()) FOR [FechaInserta]
GO

ALTER TABLE [dbo].[Rol] ADD  CONSTRAINT [DF_Rol_IdUsuarioActualiza]  DEFAULT ((0)) FOR [IdUsuarioActualiza]
GO

ALTER TABLE [dbo].[Rol] ADD  CONSTRAINT [DF_Rol_FechaActualiza]  DEFAULT ('') FOR [FechaActualiza]
GO

ALTER TABLE [dbo].[Rol] ADD  CONSTRAINT [DF_Rol_Activo]  DEFAULT ((1)) FOR [Activo]
GO

ALTER TABLE [dbo].[Rol]  WITH CHECK ADD  CONSTRAINT [FK_Rol_Usuario] FOREIGN KEY([IdUsuarioInserta])
REFERENCES [dbo].[Usuario] ([Id])
GO

ALTER TABLE [dbo].[Rol] CHECK CONSTRAINT [FK_Rol_Usuario]
GO


