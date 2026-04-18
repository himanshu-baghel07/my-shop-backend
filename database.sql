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

  CREATE TABLE products (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    "isDeleted" BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMP DEFAULT NOW()
  );

  INSERT INTO products (id,name,description) VALUES (
  gen_random_uuid(),
  'iPhone 15',
  'Apple smartphone with A16 chip'
) RETURNING id;

  CREATE TABLE product_variant(
    id UUID PRIMARY KEY,
    "productId" UUID REFERENCES products(id) ON DELETE CASCADE,
    color VARCHAR(50),
    ram VARCHAR(20),
     storage VARCHAR(20),
  price DECIMAL NOT NULL,
  stock INT NOT NULL
  );

INSERT INTO product_variant (id, "productId", color, ram, storage, price, stock)
VALUES
  (gen_random_uuid(), '84bc7c1b-7d75-4af4-b250-38e06cebfd8d', 'Black', '8GB', '128GB', 80000, 5),
  (gen_random_uuid(), '84bc7c1b-7d75-4af4-b250-38e06cebfd8d', 'Black', '8GB', '256GB', 90000, 3),
  (gen_random_uuid(), '84bc7c1b-7d75-4af4-b250-38e06cebfd8d', 'White', '12GB', '256GB', 95000, 2);

CREATE TABLE product_images (
  id UUID PRIMARY KEY,
    "productId" UUID REFERENCES products(id) ON DELETE CASCADE,
  "imageUrl" TEXT NOT NULL
);

INSERT INTO product_images (id, "productId", "imageUrl")
VALUES
  (gen_random_uuid(), '84bc7c1b-7d75-4af4-b250-38e06cebfd8d', 'https://inspireonline.in/cdn/shop/files/iPhone_15_Pink_PDP_Image_Position-1__en-IN.jpg?v=1694605206&width=1920'),
  (gen_random_uuid(), '84bc7c1b-7d75-4af4-b250-38e06cebfd8d', 'https://iplanet.one/cdn/shop/files/iPhone_15_Green_PDP_Image_Position-1__en-IN_f64078c4-ca4a-4ca2-8e29-f9b24fe7ccab.jpg?v=1695428708');

CREATE TABLE product_ratings (
  id UUID PRIMARY KEY,
  "productId" UUID REFERENCES products(id) ON DELETE CASCADE,
  "userId" UUID,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  review TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

INSERT INTO product_ratings (id, "productId", "userId", rating, review)
VALUES
  (gen_random_uuid(), '84bc7c1b-7d75-4af4-b250-38e06cebfd8d', gen_random_uuid(), 5, 'Excellent phone'),
  (gen_random_uuid(), '84bc7c1b-7d75-4af4-b250-38e06cebfd8d', gen_random_uuid(), 4, 'Very good performance');

SELECT 
  p.id,
  p.name,
  pv.color,
  pv.ram,
  pv.storage,
  pv.price,
  pv.stock,
  MIN(pi."imageUrl") AS image,
  COALESCE(AVG(pr.rating), 0) AS avg_rating
FROM products p
LEFT JOIN product_variant pv ON p.id = pv."productId"
LEFT JOIN product_images pi ON p.id = pv."productId"
LEFT JOIN product_ratings pr ON p.id =pv."productId"
WHERE p."isDeleted" = false
GROUP BY p.id, pv.id;