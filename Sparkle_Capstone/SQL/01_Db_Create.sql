USE [master]
GO
IF db_id('Sparkle') IS NULL
  CREATE DATABASE [Sparkle]
GO

USE [Sparkle]
GO

ALTER TABLE [Likes] DROP CONSTRAINT [FK_Likes_Review];
ALTER TABLE [Review] DROP CONSTRAINT [FK_Review_Category];
ALTER TABLE [Likes] DROP CONSTRAINT [FK_Likes_UserProfile];
ALTER TABLE [Review] DROP CONSTRAINT [FK_Review_UserProfile];
ALTER TABLE [Viewed] DROP CONSTRAINT [FK_Viewed_Review];
ALTER TABLE [Viewed] DROP CONSTRAINT [FK_Viewed_UserProfile];
GO

DROP TABLE IF EXISTS [Review];
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Viewed];
DROP TABLE IF EXISTS [Likes];
GO

CREATE TABLE [UserProfile] (
  [Id] INTEGER PRIMARY KEY IDENTITY,
  [FirebaseUserId] nvarchar(255) NOT NULL,
  [DisplayName] nvarchar(50) NOT NULL,
  [Email] nvarchar(50) NOT NULL,

  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId),
  CONSTRAINT UQ_Email UNIQUE(Email)
)
GO

CREATE TABLE [Category] (
  [Id] INTEGER PRIMARY KEY IDENTITY,
  [Name] nvarchar(255)
)
GO

CREATE TABLE [Review] (
  [Id] INTEGER PRIMARY KEY IDENTITY,
  [NameOfProduct] nvarchar(255),
  [Content] text,
  [ImageLocation] nvarchar(255),
  [PurchaseLocation] nvarchar(255),
  [PublishDateTime] datetime,
  [Rating] int,
  [Likes] int,
  [Views] int,
  [CategoryId] int,
  [UserProfileId] int,

   CONSTRAINT [FK_Review_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id]),
   CONSTRAINT [FK_Review_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])

)
GO

CREATE TABLE [Likes] (
  [Id] INTEGER PRIMARY KEY IDENTITY,
  [ReviewId] int,
  [UserProfileId] int,

  CONSTRAINT [FK_Likes_Review] FOREIGN KEY ([ReviewId]) REFERENCES [Review] ([Id]),
  CONSTRAINT [FK_Likes_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
)
GO

CREATE TABLE [Viewed] (
  [Id] INTEGER PRIMARY KEY IDENTITY,
  [ReviewId] int,
  [UserProfileId] int,

  CONSTRAINT [FK_Viewed_Review] FOREIGN KEY ([ReviewId]) REFERENCES [Review] ([Id]),
  CONSTRAINT [FK_Viewed_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
)
GO




