import pool from './index.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

async function seed() {
  try {
    // Hash the admin password
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Insert admin user
    await pool.query(`
      INSERT INTO users (username, password, name, email, is_admin)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (username) DO NOTHING
    `, ['admin', hashedPassword, 'Admin User', 'admin@millikit.com', true]);
    
    // Get the admin user ID
    const adminResult = await pool.query('SELECT id FROM users WHERE username = $1', ['admin']);
    const adminId = adminResult.rows[0]?.id;
    
    // Insert sample products
    const products = [
      {
        name: 'Foxtail Millet',
        slug: 'foxtail-millet',
        description: 'Foxtail millet is a nutritious grain that is rich in fiber, protein, and minerals. It is a good source of iron, calcium, and magnesium.',
        shortDescription: 'Nutritious grain rich in fiber and protein',
        price: 99.99,
        comparePrice: 129.99,
        badge: 'Best Seller',
        category: 'Millets',
        imageUrl: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        imageGallery: [
          'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        ],
        inStock: true,
        stockQuantity: 100,
        featured: true,
        nutritionFacts: 'Calories: 330, Protein: 8.5g, Fat: 2.2g, Carbohydrates: 65g, Fiber: 8g',
        cookingInstructions: 'Rinse the millet thoroughly. Add 1 part millet to 2 parts water. Bring to a boil, then reduce heat and simmer for 20-25 minutes until water is absorbed.',
        rating: 4.5,
        reviewCount: 12,
        weightOptions: ['500g', '1kg', '2kg']
      },
      {
        name: 'Pearl Millet',
        slug: 'pearl-millet',
        description: 'Pearl millet is a highly nutritious grain that is rich in protein, fiber, and minerals. It is a good source of iron, calcium, and magnesium.',
        shortDescription: 'Highly nutritious grain rich in protein and minerals',
        price: 89.99,
        comparePrice: 119.99,
        badge: 'Popular',
        category: 'Millets',
        imageUrl: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        imageGallery: [
          'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        ],
        inStock: true,
        stockQuantity: 150,
        featured: true,
        nutritionFacts: 'Calories: 320, Protein: 9g, Fat: 2.5g, Carbohydrates: 63g, Fiber: 7.5g',
        cookingInstructions: 'Rinse the millet thoroughly. Add 1 part millet to 2 parts water. Bring to a boil, then reduce heat and simmer for 20-25 minutes until water is absorbed.',
        rating: 4.3,
        reviewCount: 8,
        weightOptions: ['500g', '1kg', '2kg']
      },
      {
        name: 'Finger Millet',
        slug: 'finger-millet',
        description: 'Finger millet is a nutritious grain that is rich in calcium, iron, and fiber. It is a good source of protein and minerals.',
        shortDescription: 'Nutritious grain rich in calcium and iron',
        price: 79.99,
        comparePrice: 109.99,
        category: 'Millets',
        imageUrl: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        imageGallery: [
          'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        ],
        inStock: true,
        stockQuantity: 80,
        featured: false,
        nutritionFacts: 'Calories: 310, Protein: 7.5g, Fat: 2g, Carbohydrates: 64g, Fiber: 8.5g',
        cookingInstructions: 'Rinse the millet thoroughly. Add 1 part millet to 2 parts water. Bring to a boil, then reduce heat and simmer for 20-25 minutes until water is absorbed.',
        rating: 4.0,
        reviewCount: 5,
        weightOptions: ['500g', '1kg', '2kg']
      },
      {
        name: 'Proso Millet',
        slug: 'proso-millet',
        description: 'Proso millet is a nutritious grain that is rich in protein, fiber, and minerals. It is a good source of iron, calcium, and magnesium.',
        shortDescription: 'Nutritious grain rich in protein and minerals',
        price: 69.99,
        comparePrice: 99.99,
        category: 'Millets',
        imageUrl: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        imageGallery: [
          'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        ],
        inStock: true,
        stockQuantity: 120,
        featured: false,
        nutritionFacts: 'Calories: 300, Protein: 8g, Fat: 2.2g, Carbohydrates: 62g, Fiber: 7g',
        cookingInstructions: 'Rinse the millet thoroughly. Add 1 part millet to 2 parts water. Bring to a boil, then reduce heat and simmer for 20-25 minutes until water is absorbed.',
        rating: 4.2,
        reviewCount: 6,
        weightOptions: ['500g', '1kg', '2kg']
      },
      {
        name: 'Little Millet',
        slug: 'little-millet',
        description: 'Little millet is a nutritious grain that is rich in fiber, protein, and minerals. It is a good source of iron, calcium, and magnesium.',
        shortDescription: 'Nutritious grain rich in fiber and protein',
        price: 59.99,
        comparePrice: 89.99,
        category: 'Millets',
        imageUrl: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        imageGallery: [
          'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        ],
        inStock: true,
        stockQuantity: 90,
        featured: false,
        nutritionFacts: 'Calories: 290, Protein: 7g, Fat: 2g, Carbohydrates: 61g, Fiber: 8g',
        cookingInstructions: 'Rinse the millet thoroughly. Add 1 part millet to 2 parts water. Bring to a boil, then reduce heat and simmer for 20-25 minutes until water is absorbed.',
        rating: 4.1,
        reviewCount: 4,
        weightOptions: ['500g', '1kg', '2kg']
      }
    ];
    
    for (const product of products) {
      await pool.query(`
        INSERT INTO products (
          name, slug, description, short_description, price, compare_price, 
          badge, category, image_url, image_gallery, in_stock, stock_quantity, 
          featured, nutrition_facts, cooking_instructions, rating, review_count, 
          weight_options
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
        ON CONFLICT (slug) DO NOTHING
      `, [
        product.name, product.slug, product.description, product.shortDescription, 
        product.price, product.comparePrice, product.badge, product.category, 
        product.imageUrl, product.imageGallery, product.inStock, product.stockQuantity, 
        product.featured, product.nutritionFacts, product.cookingInstructions, 
        product.rating, product.reviewCount, product.weightOptions
      ]);
    }
    
    // Get product IDs for reviews
    const productResult = await pool.query('SELECT id FROM products WHERE slug = $1', ['foxtail-millet']);
    const productId = productResult.rows[0]?.id;
    
    // Insert sample reviews
    if (productId) {
      const reviews = [
        {
          id: uuidv4(),
          productId,
          userId: adminId,
          name: 'John Doe',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          date: new Date(),
          rating: 5,
          comment: 'Great product! Very nutritious and tasty.',
          helpfulCount: 3
        },
        {
          id: uuidv4(),
          productId,
          name: 'Jane Smith',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          date: new Date(),
          rating: 4,
          comment: 'Good quality millet. Would recommend.',
          helpfulCount: 1
        }
      ];
      
      for (const review of reviews) {
        await pool.query(`
          INSERT INTO product_reviews (
            id, product_id, user_id, name, avatar, date, rating, comment, helpful_count
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          ON CONFLICT (id) DO NOTHING
        `, [
          review.id, review.productId, review.userId, review.name, review.avatar, 
          review.date, review.rating, review.comment, review.helpfulCount
        ]);
      }
    }
    
    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error during database seeding:', error);
  } finally {
    // Close the pool
    await pool.end();
  }
}

// Run the seeding
seed(); 