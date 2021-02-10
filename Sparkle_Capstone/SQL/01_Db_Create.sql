USE [master]
GO
IF db_id('Sparkle') IS NULL
  CREATE DATABASE [Sparkle]
GO

USE [Sparkle]
GO


ALTER TABLE [Review] DROP CONSTRAINT [FK_Review_Category];
ALTER TABLE [Review] DROP CONSTRAINT [FK_Review_UserProfile];
GO

DROP TABLE IF EXISTS [Review];
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [UserProfile];
GO

CREATE TABLE [UserProfile]
(
  [Id] INTEGER PRIMARY KEY IDENTITY,
  [FirebaseUserId] nvarchar(255) NOT NULL,
  [DisplayName] nvarchar(50) NOT NULL,
  [Email] nvarchar(50) NOT NULL,

  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId),
  CONSTRAINT UQ_Email UNIQUE(Email)
)
GO

CREATE TABLE [Category]
(
  [Id] INTEGER PRIMARY KEY IDENTITY,
  [Name] nvarchar(255)
)
GO

CREATE TABLE [Review]
(
  [Id] INTEGER PRIMARY KEY IDENTITY,
  [NameOfProduct] nvarchar(255),
  [Content] text,
  [ImageLocation] nvarchar(255),
  [PurchaseLocation] nvarchar(255),
  [PublishDateTime] datetime,
  [CategoryId] int,
  [UserProfileId] int,

  CONSTRAINT [FK_Review_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id]),
  CONSTRAINT [FK_Review_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])

)
GO




