CREATE TABLE TipoAnimal (
    Codigo INT PRIMARY KEY IDENTITY(1,1),
    Nome VARCHAR(100)
);

CREATE TABLE Anuncio (
    Codigo INT PRIMARY KEY IDENTITY(1,1),
    Titulo VARCHAR(100) NOT NULL,
    Descritivo VARCHAR(500) NOT NULL,
    IdCliente INT NOT NULL,
    IdTipoAnimal INT NOT NULL,
    IdIdade INT NOT NULL,
    IdPorte INT NOT NULL,
    IdTemperamento INT NOT NULL,
    FlagAtivo BIT,
    Imagem VARBINARY(MAX),
    FOREIGN KEY (IdCliente) REFERENCES Cliente(Codigo),
    FOREIGN KEY (idTipoAnimal) REFERENCES TipoAnimal(Codigo),
    FOREIGN KEY (idIdade) REFERENCES Idade(Codigo),
    FOREIGN KEY (IdTemperamento) REFERENCES Temperamento(IdTemperamento),
    FOREIGN KEY (IdPorte) REFERENCES Porte(IdPorte)
);

CREATE TABLE Idade (
    Codigo INT PRIMARY KEY IDENTITY(1,1),
    Idade VARCHAR (50)
);

CREATE TABLE Role (
    Codigo INT PRIMARY KEY IDENTITY(1,1),
    Nome VARCHAR(100) UNIQUE,
    Descricao VARCHAR(100)
)

CREATE TABLE Cliente (
    Codigo INT PRIMARY KEY IDENTITY(1,1),
    Nome VARCHAR(100),
    Email VARCHAR(100),
    Senha VARCHAR(100),
    Documento VARCHAR(100),
    Logradouro VARCHAR(100),
    Complemento VARCHAR(100),
    Cidade VARCHAR(100),
    IdEstado INT NOT NULL,
    Bairro VARCHAR(100),
    Cep VARCHAR(8),
    Telefone VARCHAR(100),
    Status BIT,
    IdRole INT NOT NULL,
	FOREIGN KEY (IdEstado) REFERENCES Estado(Codigo),
	FOREIGN KEY (IdRole) REFERENCES Role(Codigo)
);

CREATE TABLE Estado (
    Codigo INT PRIMARY KEY IDENTITY(1,1),
    Nome VARCHAR(25)
);

CREATE TABLE Temperamento (
    IdTemperamento INT PRIMARY KEY IDENTITY(1,1),
    Nome VARCHAR(100) NOT NULL
);

CREATE TABLE Porte (
    IdPorte INT PRIMARY KEY IDENTITY(1,1),
    Nome VARCHAR(50) NOT NULL
);

CREATE TABLE Chat (
	Codigo INT PRIMARY KEY IDENTITY(1,1),
	CodigoCliente INT NOT NULL,
	CodigoAnuncio INT NOT NULL,
	Status BIT,
	FOREIGN KEY (CodigoAnuncio) REFERENCES Anuncio(Codigo),
	FOREIGN KEY (CodigoCliente) REFERENCES Cliente(Codigo)
);

CREATE TABLE Mensagem (
	Codigo INT PRIMARY KEY IDENTITY(1,1),
	CodigoChat INT NOT NULL,
	CodigoCliente INT NOT NULL,
	CodigoAnuncio INT NOT NULL,
	Descricao VARCHAR(500) NOT NULL,
	DataHora DATETIME NOT NULL DEFAULT GETDATE(),
	FOREIGN KEY (CodigoAnuncio) REFERENCES Anuncio(Codigo),
	FOREIGN KEY (CodigoChat) REFERENCES Chat(Codigo),
	FOREIGN KEY (CodigoCliente) REFERENCES Cliente(Codigo)
);

CREATE TABLE Favorito(
    Codigo INT PRIMARY KEY IDENTITY(1,1),
    CodigoCliente INT NOT NULL,
    CodigoAnuncio INT NOT NULL,
    FOREIGN KEY (CodigoCliente) REFERENCES Cliente(Codigo),
    FOREIGN KEY (CodigoAnuncio) REFERENCES Anuncio(Codigo)
);