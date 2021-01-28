USE [master]
GO
IF db_id('Sparkle') IS NULL
  CREATE DATABASE [Sparkle]
GO

USE [Sparkle]
GO

DROP TABLE IF EXISTS [Review];
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Viewed];
DROP TABLE IF EXISTS [Likes];


CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY,
  [FirebaseUserId] nvarchar(255),
  [DisplayName] nvarchar(255),
  [Email] nvarchar(255)
)
GO

CREATE TABLE [Category] (
  [Id] integer PRIMARY KEY,
  [Name] nvarchar(255)
)
GO

CREATE TABLE [Review] (
  [Id] int PRIMARY KEY,
  [NameOfProduct] nvarchar,
  [Content] text,
  [ImageLocation] nvarchar(255),
  [PurchaseLocation] nvarchar(255),
  [PublishDateTime] datetime,
  [Rating] int,
  [Likes] int,
  [Views] int,
  [CategoryId] int,
  [UserProfileId] int
)
GO

CREATE TABLE [Likes] (
  [Id] int,
  [ReviewId] int,
  [UserProfileId] int
)
GO

CREATE TABLE [Viewed] (
  [Id] int,
  [ReviewId] int,
  [UserProfileId] int
)
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([Id]) REFERENCES [Review] ([UserProfileId])
GO

ALTER TABLE [Review] ADD FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id])
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([Id]) REFERENCES [Viewed] ([UserProfileId])
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([Id]) REFERENCES [Likes] ([UserProfileId])
GO

ALTER TABLE [Review] ADD FOREIGN KEY ([Id]) REFERENCES [Likes] ([ReviewId])
GO

ALTER TABLE [Review] ADD FOREIGN KEY ([Id]) REFERENCES [Viewed] ([ReviewId])
GO