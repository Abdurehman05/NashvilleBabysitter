SET IDENTITY_INSERT [UserType] ON
INSERT INTO [UserType] ([Id], [Name]) VALUES (1, 'Parent'), (2, 'Babysitter');
SET IDENTITY_INSERT [UserType] OFF


SET IDENTITY_INSERT [Neighborhood] ON
INSERT INTO [Neighborhood] ([Id], [Name]) VALUES (1, 'Antioch'), (2, 'Belmont-Hillsboro'), (3, 'East Nashville'), (4, 'Berry Hill'), (5, 'Germantown'),
 		(6, 'The Gulch'),(7, 'Downtown'), (8, 'Music Row'), (9, 'Hermitage'), (10, 'Madison'), (11, 'Green Hills'), (12, 'Midtown'), (13, 'Donelson'),
		(14, 'West Nashville'), (15, 'North Nashville'), (16, 'Madison'), (17, 'Bellevue'), (18, 'Wedgewood-Houston'), (19, 'Sylvan Park'), (20, 'Whites Creek');
SET IDENTITY_INSERT [Neighborhood] OFF



SET IDENTITY_INSERT [UserProfile] ON

insert into [UserProfile] ([Id], [DisplayName], [FullName], [Address], [NeighborhoodId], [Email], [Phone], [CreateDateTime], [ImageUrl], [UserTypeId], [FirebaseUserId]) values (1, 'trenfield0', 'Teddy Renfield', '77808 Union Court', 1, 'trenfield0@histats.com', '944-652-5715', '2020-05-11 05:14:58', 'https://robohash.org/consequaturconsequaturitaque.bmp?size=50x50&set=set1', 1, 'jpuhyzaicsokywncxveknzowfpdu');
insert into [UserProfile] ([Id], [DisplayName], [FullName], [Address], [NeighborhoodId], [Email], [Phone], [CreateDateTime], [ImageUrl], [UserTypeId], [FirebaseUserId]) values (2, 'bseel1', 'Beverlie Seel', '1650 Melody Alley', 1, 'bseel1@uol.com.br', '350-162-3151', '2020-11-03 21:59:42', 'https://robohash.org/numquammollitiavitae.jpg?size=50x50&set=set1', 1, 'vhbgqyeqelhgkohutnoglbdohssl');
insert into [UserProfile] ([Id], [DisplayName], [FullName], [Address], [NeighborhoodId], [Email], [Phone], [CreateDateTime], [ImageUrl], [UserTypeId], [FirebaseUserId]) values (3, 'zrackham2', 'Zita Rackham', '8 Prentice Junction', 1, 'zrackham2@apple.com', '707-468-7323', '2020-12-06 06:45:07', 'https://robohash.org/etconsequaturdebitis.png?size=50x50&set=set1', 2, 'wqhvgdjxjqkqecuridpvjtwpoacc');
insert into [UserProfile] ([Id], [DisplayName], [FullName], [Address], [NeighborhoodId], [Email], [Phone], [CreateDateTime], [ImageUrl], [UserTypeId], [FirebaseUserId]) values (4, 'smcquaker3', 'Shanie McQuaker', '3650 Reindahl Avenue', 1, 'smcquaker3@chicagotribune.com', '300-351-0605', '2020-05-26 22:11:48', 'https://robohash.org/consecteturullamad.png?size=50x50&set=set1', 2, 'exsjcqvnhydjofznqmtvecekcgno');

SET IDENTITY_INSERT [UserProfile] OFF


SET IDENTITY_INSERT [Child] ON

insert into [Child] ([Id], [Name], [Age], [Notes], [ImageUrl], [UserProfileId]) values (1, 'bneles0', 1, 'Goose, cape barren', 'https://robohash.org/etnobisnecessitatibus.bmp?size=50x50&set=set1', 1);
insert into [Child] ([Id], [Name], [Age], [Notes], [ImageUrl], [UserProfileId]) values (2, 'mdobney1', 2, 'Ground monitor (unidentified)', 'https://robohash.org/eosestut.jpg?size=50x50&set=set1', 1);
insert into [Child] ([Id], [Name], [Age], [Notes], [ImageUrl], [UserProfileId]) values (3, 'adutchburn2', 3, 'Gull, pacific', 'https://robohash.org/hicdoloremperspiciatis.bmp?size=50x50&set=set1', 2);
insert into [Child] ([Id], [Name], [Age], [Notes], [ImageUrl], [UserProfileId]) values (4, 'lfeek3', 4, 'Black-cheeked waxbill', 'https://robohash.org/occaecatiatqueipsum.png?size=50x50&set=set1', 2);

SET IDENTITY_INSERT [Child] OFF



SET IDENTITY_INSERT [BabysitStatus] ON

INSERT INTO [BabysitStatus] ([Id],[Status]) VALUES (1,'Pending');
INSERT INTO [BabysitStatus] ([Id],[Status]) VALUES (2, 'Approved');
INSERT INTO [BabysitStatus] ([Id],[Status]) VALUES (3,'Completed');
INSERT INTO [BabysitStatus] ([Id],[Status]) VALUES (4, 'Denied');

SET IDENTITY_INSERT [BabysitStatus] OFF



SET IDENTITY_INSERT [Babysit] ON

insert into [Babysit] ([Id], [UserProfileId], [Date], [ChildId], [BabysitStatusId]) values (1, 3, '2020-04-18 11:27:42', 1, 1);
insert into [Babysit] ([Id], [UserProfileId], [Date], [ChildId], [BabysitStatusId]) values (2, 3, '2020-11-18 21:29:46', 2, 2);
insert into [Babysit] ([Id], [UserProfileId], [Date], [ChildId], [BabysitStatusId]) values (3, 4, '2020-10-23 09:38:48', 3, 3);
insert into [Babysit] ([Id], [UserProfileId], [Date], [ChildId], [BabysitStatusId]) values (4, 4, '2020-06-22 06:38:38', 4, 4);

SET IDENTITY_INSERT [Babysit] OFF


