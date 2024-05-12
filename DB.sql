USE[DBVeröld]
GO

IF OBJECT_ID ('dbo.Event') IS NOT NULL
   DROP TABLE dbo.Event;
GO
CREATE TABLE [Event] (
    Id INT PRIMARY KEY IDENTITY,
	BuildingId INT NULL,
	ClientId INT NULL,
	EventTypeId INT NOT NULL,
	ServiceId INT NULL,
	StatusId INT NOT NULL,
	UserId UNIQUEIDENTIFIER NULL,
    EventName NVARCHAR(400),
	EventCost NUMERIC(38, 6),
	EventAttendees INT NULL,
	EventUnits INT NULL,
	Description TEXT,
	CustomerName NVARCHAR(200),
	CustomerTitle NVARCHAR(150),
	CustomerEmail NVARCHAR(50),
	CustomerMobile NVARCHAR(50),
	CustomerPhone NVARCHAR(50),
	Comments TEXT,
	Notes TEXT,
	StartDate	DATETIME NOT NULL,
    EndDate	DATETIME NOT NULL,
	ContractDate DATETIME NULL,
	Requirements NVARCHAR(MAX),
	CreatedDate DATETIME NOT NULL,
    UpdatedDate DATETIME NULL,
    ModifiedBy UNIQUEIDENTIFIER NOT NULL,
	ShowOnApp BIT NOT NULL,
    Active BIT NOT NULL
);

IF OBJECT_ID ('dbo.Client') IS NOT NULL
   DROP TABLE dbo.Client;
GO
CREATE TABLE [Client] (
    Id INT PRIMARY KEY IDENTITY,
	CorporationId INT NULL,
    ClientName NVARCHAR(150),
	Code NVARCHAR(250),
    Description NVARCHAR(MAX),
	Title VARCHAR(150),
    Email VARCHAR(50),
    Phone VARCHAR(50),
    Address VARCHAR(MAX),
    ZipCode INT NULL,
    Category VARCHAR(50),
	Notes TEXT,
	PhotoUrl NVARCHAR(MAX),
    CreatedDate DATETIME NOT NULL,
    UpdatedDate DATETIME NULL,
    ModifiedBy UNIQUEIDENTIFIER NOT NULL,
    Active BIT NOT NULL
);

IF OBJECT_ID ('dbo.Building') IS NOT NULL
   DROP TABLE dbo.Building;
GO
CREATE TABLE [Building] (
    Id INT PRIMARY KEY IDENTITY,
    LocationId INT NOT NULL,
    Property NVARCHAR(250),
    Description NVARCHAR(MAX),
    CreatedDate DATETIME NOT NULL,
    UpdatedDate DATETIME NULL,
    ModifiedBy UNIQUEIDENTIFIER NOT NULL,
    Active BIT NOT NULL
);

IF OBJECT_ID ('dbo.Location') IS NOT NULL
   DROP TABLE dbo.Location;
GO
CREATE TABLE [Location] (
    Id INT PRIMARY KEY IDENTITY,
    Address NVARCHAR(500),
    Description NVARCHAR(MAX),
    CreatedDate DATETIME NOT NULL,
    UpdatedDate DATETIME NULL,
    ModifiedBy UNIQUEIDENTIFIER NOT NULL,
    Active BIT NOT NULL
);

IF OBJECT_ID ('dbo.Corporation') IS NOT NULL
   DROP TABLE dbo.Corporation;
GO
CREATE TABLE [Corporation] (
    Id INT PRIMARY KEY IDENTITY,
    CorporationName NVARCHAR(250),
	Code NVARCHAR(150),
	Category NVARCHAR(150),
	Description NVARCHAR(MAX),
	InBetaMode BIT NOT NULL,
    CreatedDate DATETIME NOT NULL,
    UpdatedDate DATETIME NULL,
    ModifiedBy UNIQUEIDENTIFIER NOT NULL,
    Active BIT NOT NULL
);

IF OBJECT_ID ('dbo.Status') IS NOT NULL
   DROP TABLE dbo.Status;
GO
CREATE TABLE [Status] (
    Id INT PRIMARY KEY IDENTITY,
    StatusName NVARCHAR(50),
    Description NVARCHAR(MAX),
    CreatedDate DATETIME NOT NULL,
    UpdatedDate DATETIME NULL,
    ModifiedBy UNIQUEIDENTIFIER NOT NULL,
    Active BIT NOT NULL
);

IF OBJECT_ID ('dbo.EventType') IS NOT NULL
   DROP TABLE dbo.EventType;
GO
CREATE TABLE [EventType] (
    Id INT PRIMARY KEY IDENTITY,
    EventTypeName NVARCHAR(50),
    Description NVARCHAR(MAX),
    CreatedDate DATETIME NOT NULL,
    UpdatedDate DATETIME NULL,
    ModifiedBy UNIQUEIDENTIFIER NOT NULL,
    Active BIT NOT NULL
);

IF OBJECT_ID ('dbo.Service') IS NOT NULL
   DROP TABLE dbo.Service;
GO
CREATE TABLE [Service] (
    Id INT PRIMARY KEY IDENTITY,
    ServiceName NVARCHAR(150),
    Description NVARCHAR(MAX),
    CreatedDate DATETIME NOT NULL,
    UpdatedDate DATETIME NULL,
    ModifiedBy UNIQUEIDENTIFIER NOT NULL,
    Active BIT NOT NULL
);

IF OBJECT_ID ('dbo.User') IS NOT NULL
   DROP TABLE [User];
GO
CREATE TABLE [User] (
    Id UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
    CityId INT NULL,
    FirstName VARCHAR(250) NOT NULL,
    LastName VARCHAR(250),
    AlsoKnownAs VARCHAR(100),
    Title VARCHAR(100),
    Email VARCHAR(100),
    Phone VARCHAR(25),
    Address VARCHAR(MAX),
    ZipCode INT NULL,
    Gender VARCHAR(1) NOT NULL,
    UserPW BINARY(64) NOT NULL,
    Notes NVARCHAR(MAX),
    BirthDate DATE NULL,
    PhotoUrl NVARCHAR(MAX),
    Points INT NULL DEFAULT 0,
    Description NVARCHAR(MAX),
    CreatedDate DATETIME NOT NULL,
    UpdatedDate DATETIME NULL,
    ModifiedBy UNIQUEIDENTIFIER NOT NULL,
    Active BIT NOT NULL
);

ALTER TABLE [Building] ADD FOREIGN KEY (LocationId) REFERENCES Location(Id)
GO
ALTER TABLE [Building] ADD FOREIGN KEY (ModifiedBy) REFERENCES [User](Id)
GO

ALTER TABLE [Location] ADD FOREIGN KEY (ModifiedBy) REFERENCES [User](Id)
GO

ALTER TABLE [Corporation] ADD FOREIGN KEY (ModifiedBy) REFERENCES [User](Id)
GO

ALTER TABLE [Status] ADD FOREIGN KEY (ModifiedBy) REFERENCES [User](Id)
GO

ALTER TABLE [Client] ADD FOREIGN KEY (ModifiedBy) REFERENCES [User](Id)
GO
ALTER TABLE [Client] ADD FOREIGN KEY (CorporationId) REFERENCES [Corporation](Id)
GO

ALTER TABLE [EventType] ADD FOREIGN KEY (ModifiedBy) REFERENCES [User](Id)
GO

ALTER TABLE [Service] ADD FOREIGN KEY (ModifiedBy) REFERENCES [User](Id)
GO

ALTER TABLE [Event] ADD FOREIGN KEY (ModifiedBy) REFERENCES [User](Id)
GO
ALTER TABLE [Event] ADD FOREIGN KEY (BuildingId) REFERENCES [Building](Id)
GO
ALTER TABLE [Event] ADD FOREIGN KEY (EventTypeId) REFERENCES [EventType](Id)
GO
ALTER TABLE [Event] ADD FOREIGN KEY (ServiceId) REFERENCES [Service](Id)
GO
ALTER TABLE [Event] ADD FOREIGN KEY (StatusId) REFERENCES [Status](Id)
GO
ALTER TABLE [Event] ADD FOREIGN KEY (UserId) REFERENCES [User](Id)
GO


DECLARE @PhotoUrl AS NVARCHAR(MAX) = 'https://scontent.frkv3-1.fna.fbcdn.net/v/t1.6435-9/71045854_2281719772139788_7435503277539590144_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=-xe2ctDsipYQ7kNvgHt1lyW&_nc_ht=scontent.frkv3-1.fna&oh=00_AYBTzu2U9O5ebqm3Qw6x0Lhslm47VOp30N422qN_7yR2bw&oe=66661688';
DECLARE @PhotoUrl2 AS NVARCHAR(MAX) = 'https://media.licdn.com/dms/image/C4D03AQGoJLkhLuD4rQ/profile-displayphoto-shrink_800_800/0/1631633794843?e=1720656000&v=beta&t=U7bOjLDgwly0g0cXBP_RM8GDyKyutPzsI1H9xpqExgI';
INSERT INTO [User]--password: HASHBYTES('SHA2_512', 'password') OR CONVERT(BINARY(64),'password')
SELECT NEWID(), NULL,'Hector','Jasso', 'Creative Artist', 'Full-stack developer', 'jasso.hektor@gmail.com', 
'713-2569','Kópavogur, Iceland', 201,'M', HASHBYTES('SHA2_512', 'password'), NULL, GETDATE(), @PhotoUrl,1987,'', GETDATE(), NULL, NEWID(), 1
UNION
SELECT NEWID(), NULL,'Ania','Frąckiewicz', 'HR Specialist', 'Senior Talent Consultant', 'anna@geko.is', 
'713-0851','Reykjavík, Iceland', 218,'F', HASHBYTES('SHA2_512', 'password'), NULL, GETDATE(), @PhotoUrl2,1992,'', GETDATE(), NULL, NEWID(), 1
GO

DECLARE @UserId UNIQUEIDENTIFIER
SET @UserId = (SELECT TOP 1[Id]FROM [User])


IF NOT EXISTS(SELECT x.* FROM dbo.Location x WHERE x.ModifiedBy = @UserId)
BEGIN
	INSERT INTO dbo.Location
	SELECT 'Kópavogur, Iceland', 'North Atlantic Ocean',GETDATE(), NULL, @UserId, 1 UNION
	SELECT 'Cancun, Mexico', 'Caribbean',           GETDATE(), NULL, @UserId, 1 UNION
	SELECT 'Miami, United States', 'North Atlantic',GETDATE(), NULL, @UserId, 1 UNION
	SELECT 'Los Cabos, Mexico', 'Pacific Ocean',    GETDATE(), NULL, @UserId, 1 UNION
	SELECT 'Hawai, United States', 'Pacific Ocean', GETDATE(), NULL, @UserId, 1 UNION
	SELECT 'Mollarca, España', 'Europe',            GETDATE(), NULL, @UserId, 1 UNION
	SELECT 'Okinawa, Japan', 'Main Islands',        GETDATE(), NULL, @UserId, 1
END


IF NOT EXISTS(SELECT x.* FROM dbo.Building x WHERE x.ModifiedBy = @UserId)
BEGIN
INSERT INTO dbo.Building
	SELECT 1,'Kronan', 'Super Market', DATEADD(DAY,-20,GETDATE()), NULL, @UserId, 1 UNION
	SELECT 2,'Farbel Castle', 'Colors', DATEADD(DAY,-100,GETDATE()), NULL, @UserId, 1 UNION
	SELECT 3,'Apple', 'Devices', DATEADD(DAY,-3,GETDATE()), NULL, @UserId, 1 UNION
	SELECT 4,'Google', 'Code', DATEADD(DAY,-1,GETDATE()), NULL, @UserId, 1 UNION
	SELECT 5,'Linux', 'Unix Open Source', DATEADD(DAY,-18,GETDATE()), NULL, @UserId, 1 UNION
	SELECT 6,'Abaco', 'Maths', DATEADD(DAY,-13,GETDATE()), NULL, @UserId, 1 UNION
	SELECT 2,'Microsoft', 'Software', DATEADD(DAY,-9,GETDATE()), NULL, @UserId, 1 UNION
	SELECT 6,'Miniso', 'Stuff', DATEADD(DAY,-5,GETDATE()), NULL, @UserId, 1
END


INSERT INTO [Corporation] (CorporationName, Code, Category, Description, InBetaMode, CreatedDate, UpdatedDate, ModifiedBy, Active)
SELECT NULL, NULL, NULL, NULL, 0, GETDATE(), NULL, @UserId, 1 UNION
SELECT 'Geko', 'GKA4210861514', 'Tech Industry','Specialists in Innovation Talent', 0, GETDATE(), NULL, @UserId, 1

INSERT INTO [Status] (StatusName, Description, CreatedDate, UpdatedDate, ModifiedBy, Active)
SELECT 'New Request', 'New event added', GETDATE(), NULL, @UserId, 1 UNION
SELECT 'On Hold', 'Pending event', GETDATE(), NULL, @UserId, 1 UNION
SELECT 'Contracted', 'Contract signed', GETDATE(), NULL, @UserId, 1 UNION
SELECT 'Consumed', 'Event has been completed', GETDATE(), NULL, @UserId, 1 UNION
SELECT 'Cancelled', 'Event cancelled', GETDATE(), NULL, @UserId, 1 UNION
SELECT 'Not Approved', 'Unauthorized event', GETDATE(), NULL, @UserId, 1 UNION
SELECT 'Delete', 'Event deleted', GETDATE(), NULL, @UserId, 1 UNION
SELECT 'Closed', 'End of the event', GETDATE(), NULL, @UserId, 1

DECLARE @CorpID AS INT = (SELECT Id FROM[Corporation]WHERE CorporationName = 'Geko');
INSERT INTO [Client] (CorporationId, ClientName, Code, Description, Title, Email, Phone, Address, ZipCode, Category, Notes, PhotoUrl, CreatedDate, UpdatedDate, ModifiedBy, Active)
SELECT @CorpID, 'Bonus', '450199-3389','Bónus is an Icelandic no-frills supermarket', NULL, 'contact@bonus.is','527-9000','Skútuvogi 13, Reykjavík',104,'supermarket','owned by Hagar','https://bonus.is/wp-content/uploads/2022/09/Bonus_The_Piglet_fc_RGB-1024x817.png', GETDATE(), NULL, @UserId, 1 UNION
SELECT @CorpID, 'Ölgerðin Grjóthálsi', '420369-7789','Vefverslun Ölgerðarinnar, að versla á síðu sem er sérsniðin að þínum þörfum.', NULL, 'contact@floridana.is','412 8000','Ölgerðin Grjóthálsi 7-11, Reykjavík',110 ,'Industry','Floridana Vítamínsafi','https://static.heimkaup.is/images/products/91/111191/c834c-floridana-goji-1000-ml_2500x2500.jpg', GETDATE(), NULL, @UserId, 1

INSERT INTO [EventType] (EventTypeName, Description, CreatedDate, UpdatedDate, ModifiedBy, Active)
SELECT 'Private', 'VIP private event', GETDATE(), NULL, @UserId, 1 UNION
SELECT 'Public', 'public event', GETDATE(), NULL, @UserId, 1 UNION
SELECT 'Internal', 'Internal company event', GETDATE(), NULL, @UserId, 1 UNION
SELECT 'Virtual', 'Remote event', GETDATE(), NULL, @UserId, 1

INSERT INTO [Service] (ServiceName, Description, CreatedDate, UpdatedDate, ModifiedBy, Active)
SELECT 'Construction', 'General term meaning the art and science of forming objects, systems, or organizations.', GETDATE(), NULL, @UserId, 1 UNION
SELECT 'Education', 'Concept of getting knowledge or skills in various forms.', GETDATE(), NULL, @UserId, 1 UNION
SELECT 'Finance', 'This industry includes banks, financial consulting firms and accounting roles.', GETDATE(), NULL, @UserId, 1 UNION
SELECT 'Health Care', 'Improvement of health via the prevention, diagnosis, treatment or cure of disease.', GETDATE(), NULL, @UserId, 1 UNION
SELECT 'Insurance', 'Protection from financial loss.', GETDATE(), NULL, @UserId, 1 UNION
SELECT 'Personal', 'The services that give different customers a different experience are known as personal services.', GETDATE(), NULL, @UserId, 1 UNION
SELECT 'Real State', 'Property consisting of land and the buildings on it.', GETDATE(), NULL, @UserId, 1 UNION
SELECT 'Security', 'Safety against potential harm.', GETDATE(), NULL, @UserId, 1 UNION
SELECT 'Tourism', 'This industry includes hotels, but it typically tour guides companies.', GETDATE(), NULL, @UserId, 1 UNION
SELECT 'Industry', 'Group of establishments (businesses).', GETDATE(), NULL, @UserId, 1

INSERT INTO [Event](BuildingId, ClientId, EventTypeId, ServiceId, StatusId, UserId, EventName, EventCost, EventAttendees, EventUnits, Description, 
					 CustomerName, CustomerTitle, CustomerEmail, CustomerMobile, CustomerPhone, Comments, Notes, StartDate, EndDate, ContractDate, 
					 Requirements, CreatedDate, UpdatedDate, ModifiedBy, ShowOnApp, Active)
SELECT	(SELECT x.Id FROM dbo.Building x WHERE x.LocationId = 1), 
		(SELECT x.Id FROM dbo.Client x WHERE x.Code = '420369-7789'),
		(SELECT x.Id FROM dbo.EventType x WHERE x.EventTypeName = 'Internal'),
		(SELECT x.Id FROM dbo.Service x WHERE x.ServiceName = 'Industry'),
		(SELECT x.Id FROM dbo.Status x WHERE x.StatusName = 'New Request'),
		@UserId, 'EVT - New product', 0, 150, 2, 'Company is ready to show up a new product to the public',
		'Ásta Björk', 'VP of Marketing', 'austa@olgerdin.is', '713-4532', NULL, 'Target: Strengthen company''''s market position and achieve desired business goals.', NULL, GETDATE(), DATEADD(DAY, 7, GETDATE()), NULL,
		'Napkins, Cookies, Water, Coffee', GETDATE(), NULL, @UserId, 1, 1

SELECT*FROM [User]
SELECT*FROM [Location]
SELECT*FROM [Building]
SELECT*FROM [Corporation]
SELECT*FROM [Client]
SELECT*FROM [Event]