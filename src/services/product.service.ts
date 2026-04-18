import { pool } from "../config/database.config.js";
import { ProductResponse } from "../types/product.types.js";
import logger from "../utils/logger.js";

export const getProductsService = async (): Promise<ProductResponse[]> => {
  logger.info("getProductsService - Querying database for products");
  const result = await pool.query(`
        SELECT
        p.id,
        p.name,
        p.description,
        pv.color,
        pv.ram,
        pv.storage,
        pv.price,
        pv.stock,
        MIN(pi."imageUrl") AS image,
        COALESCE(AVG(pr.rating), 0) AS avg_rating
    FROM products p
    LEFT JOIN product_variant pv ON p.id = pv."productId"
    LEFT JOIN product_images pi ON p.id = pi."productId"
    LEFT JOIN product_ratings pr ON p.id = pr."productId"
    WHERE p."isDeleted" = false
    GROUP BY p.id, pv.id
        `);

  const rows = result.rows;

  const productsMap: Record<string, ProductResponse> = {};

  rows.forEach((row) => {
    if (!productsMap[row.id]) {
      productsMap[row.id] = {
        id: row.id,
        name: row.name,
        description: row.description,
        image: row.image,
        avg_rating: Number(row.avg_rating),
        variants: [],
      };
    }

    productsMap[row.id].variants.push({
      color: row.color,
      ram: row.ram,
      storage: row.storage,
      price: Number(row.price),
      stock: row.stock,
    });
  });

  const products = Object.values(productsMap);
  logger.info(
    `getProductsService - Query complete, returning ${products.length} products`,
  );
  return products;
};
