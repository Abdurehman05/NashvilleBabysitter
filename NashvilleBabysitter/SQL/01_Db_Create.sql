USE MASTER
GO

IF NOT EXISTS (
    SELECT [name]
    FROM sys.databases
    WHERE [name] = N'Babysitter'
)
CREATE DATABASE Babysitter
GO

USE Babysitter
GO


DROP TABLE IF EXISTS [Child];
DROP TABLE IF EXISTS [Babysit];
DROP TABLE IF EXISTS [BabysitStatus];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [UserType];
DROP TABLE IF EXISTS [Neighborhood];
GO



CREATE TABLE [UserType] (
  [Id] INTEGER PRIMARY KEY IDENTITY,
  [Name] VARCHAR(50) NOT NULL
)

CREATE TABLE [Neighborhood] (
  [Id] INTEGER PRIMARY KEY IDENTITY,
  [Name] VARCHAR(60) NOT NULL
)
CREATE TABLE [UserProfile] (
  [Id] INTEGER PRIMARY KEY IDENTITY,
  [FirebaseUserId] VARCHAR(30) NOT NULL,
  [DisplayName] VARCHAR(60) NOT NULL,
  [FullName] VARCHAR(60) NOT NULL,
  [Address] VARCHAR(200) NOT NULL,
  [NeighborhoodId] INTEGER NOT NULL,
  [Email] VARCHAR(55) NOT NULL,
  [Phone] VARCHAR(55) NOT NULL,
  [CreateDateTime] datetime NOT NULL,
  [ImageUrl] VARCHAR(500),
  [UserTypeId] INTEGER NOT NULL,

  CONSTRAINT [FK_UserProfile_UserType] FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id]),
  CONSTRAINT [FK_UserProfile_Neighborhood] FOREIGN KEY ([NeighborhoodId]) REFERENCES [Neighborhood] ([Id]),
  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId),
  CONSTRAINT UQ_Email UNIQUE(Email)
)

CREATE TABLE [Child] (
  [Id] INTEGER PRIMARY KEY IDENTITY,
  [Name] VARCHAR(55) NOT NULL,
  [UserProfileId] INTEGER NOT NULL,
  [ImageUrl] VARCHAR(500),
  [Age] INTEGER NOT NULL,
  [Notes] VARCHAR(255),

  CONSTRAINT [FK_Child_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile](Id) ON DELETE CASCADE
)

CREATE TABLE [BabysitStatus] (
  [Id] INTEGER PRIMARY KEY IDENTITY,
  [Status] VARCHAR(40) NOT NULL
)

CREATE TABLE [Babysit] (
  [Id] INTEGER PRIMARY KEY IDENTITY,
  [UserProfileId] INTEGER NOT NULL,
  [Date] datetime NOT NULL,
  [Duration] INTEGER,
  [ChildId] INTEGER NOT NULL,
  [BabysitStatusId] INTEGER NOT NULL,

  CONSTRAINT [FK_Babysit_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile](Id) ON DELETE CASCADE,
  CONSTRAINT [FK_Babysit_Child] FOREIGN KEY ([ChildId]) REFERENCES [Child](Id),
  CONSTRAINT [FK_Babysit_BabysitStatus] FOREIGN KEY ([BabysitStatusId]) REFERENCES [BabysitStatus](Id)
)


GO


