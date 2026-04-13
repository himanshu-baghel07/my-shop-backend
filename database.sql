CREATE DATABASE myshop;

CREATE TABLE users (
    "userId" SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone VARCHAR(15),
    "isVerified" BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role VARCHAR(20) DEFAULT 'customer',
    avatar TEXT
);

CREATE TABLE sellers(
    "sellerId" SERIAL PRIMARY KEY,
    "userId" INT UNIQUE REFERENCES users("userId") ON DELETE CASCADE,
    "businessName" VARCHAR(150) NOT NULL,
    "gstNumber" VARCHAR(50),
    "bankAccount" VARCHAR(50),
    "ifscCode" VARCHAR(20),
    "address" TEXT,
    "isApproved" BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

  