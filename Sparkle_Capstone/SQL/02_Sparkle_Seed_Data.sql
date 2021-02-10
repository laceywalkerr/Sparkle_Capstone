SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile]
  ([Id], [FirebaseUserId], [DisplayName], [Email])
VALUES
  (1, 'firebaseid1', 'LindaBelcher', 'lindab@gmail.com'),
  (2, 'firebaseid2', 'TinaBelcher', 'tina@gmail.com'),
  (3, 'firebaseid3', 'BobBelcher', 'bob@gmail.com');

SET IDENTITY_INSERT [UserProfile] OFF

SET IDENTITY_INSERT [Category] ON
INSERT INTO [Category]
  ([Id], [Name])
VALUES
  (1, 'Mascara'),
  (2, 'Lipstick'),
  (3, 'Eyeshadow'),
  (4, 'Eyeliner'),
  (5, 'Lipgloss'),
  (6, 'Highlighter'),
  (7, 'Concealer'),
  (8, 'Bronzer'),
  (9, 'Setting spray'),
  (10, 'Setting Powder'),
  (11, 'Primer'),
  (12, 'BB Cream'),
  (13, 'Foundation'),
  (14, 'Blush'),
  (15, 'Eyebrow Pencil'),
  (16, 'Eyebrow Gel'),
  (17, 'Lip Liner');
SET IDENTITY_INSERT [Category] OFF


SET IDENTITY_INSERT [Review] ON
INSERT INTO [Review]
  ([Id], [NameOfProduct], [Content], [ImageLocation], [PurchaseLocation], [PublishDateTime], [Rating], [CategoryId], [UserProfileId])
VALUES
  (1, 'eyeshaddow', 'cool makeup', null, 'Claires', '01-28-2021', '4', 3, 1),
  (2, 'Glossier LipGloss', 'SOOOOO STICKY! Totally not worth it!', null, 'Ulta', '01-23-2021', '1', 5, 1),
  (3, 'ELF BB CREAM SPF 20', 'amazing! totally works, its been awesome so far!', null, 'Walmart', '01-02-2021', '5', 12, 1),
  (4, 'lil ray of sunshine Colourpop Eyeshaddow Pallette', 'Cheerful colors and great pigmentation, but a lot of fall out.', null, 'Colourpop.com', '01-13-2021', '4', 3, 2),
  (5, 'wet n wild felt tip eyeliner - black', 'Honestly it works great and very budget friendly! Cruelty free product too!!', null, 'CVS', '01-05-2021', '5', 4, 2);
SET IDENTITY_INSERT [Review] OFF