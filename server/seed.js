const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/productModel");

dotenv.config({ path: "server/config/config.env" });

const seedUserId = new mongoose.Types.ObjectId();

const seedProducts = [
  {
    name: "Modern Villa with Pool",
    description: "Modern villa in Beverly Hills with pool, smart home features, and solar panels.",
    highlights: ["Pool", "Smart Home", "Solar Panels"],
    specifications: [
      { title: "Location", description: "Beverly Hills, CA" },
      { title: "ROI", description: "7.2%" },
      { title: "Min Investment", description: "$10" },
      { title: "Monthly Income", description: "$520" },
      { title: "Appreciation", description: "4.5%" },
      { title: "Funded", description: "89%" },
      { title: "Total Investors", description: "142" },
      { title: "Available Tokens", description: "9350" },
      { title: "Token Price", description: "$10" }
    ],
    price: 850000,
    cuttedPrice: 900000,
    images: [
      {
        public_id: "seed/modern-villa-with-pool",
        url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
      }
    ],
    brand: {
      name: "BestCity",
      logo: {
        public_id: "seed/bestcity-logo",
        url: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=400&q=80"
      }
    },
    category: "villa",
    stock: 85000,
    warranty: 1,
    ratings: 0,
    numOfReviews: 0,
    reviews: [],
    user: seedUserId
  },
  {
    name: "Luxury Penthouse",
    description: "Luxury penthouse in Manhattan with doorman access, gym, and terrace views.",
    highlights: ["Doorman", "Gym", "Terrace"],
    specifications: [
      { title: "Location", description: "Manhattan, NY" },
      { title: "ROI", description: "6.8%" },
      { title: "Min Investment", description: "$10" },
      { title: "Monthly Income", description: "$680" },
      { title: "Appreciation", description: "5.2%" },
      { title: "Funded", description: "95%" },
      { title: "Total Investors", description: "203" },
      { title: "Available Tokens", description: "6000" },
      { title: "Token Price", description: "$10" }
    ],
    price: 1200000,
    cuttedPrice: 1280000,
    images: [
      {
        public_id: "seed/luxury-penthouse",
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
      }
    ],
    brand: {
      name: "BestCity",
      logo: {
        public_id: "seed/bestcity-logo",
        url: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=400&q=80"
      }
    },
    category: "apartment",
    stock: 120000,
    warranty: 1,
    ratings: 0,
    numOfReviews: 0,
    reviews: [],
    user: seedUserId
  },
  {
    name: "Waterfront Estate",
    description: "Waterfront estate in Miami Beach with dock and wine cellar amenities.",
    highlights: ["Waterfront", "Dock", "Wine Cellar"],
    specifications: [
      { title: "Location", description: "Miami Beach, FL" },
      { title: "ROI", description: "7.5%" },
      { title: "Min Investment", description: "$10" },
      { title: "Monthly Income", description: "$1200" },
      { title: "Appreciation", description: "6.1%" },
      { title: "Funded", description: "45%" },
      { title: "Total Investors", description: "89" },
      { title: "Available Tokens", description: "115500" },
      { title: "Token Price", description: "$10" }
    ],
    price: 2100000,
    cuttedPrice: 2200000,
    images: [
      {
        public_id: "seed/waterfront-estate",
        url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
      }
    ],
    brand: {
      name: "BestCity",
      logo: {
        public_id: "seed/bestcity-logo",
        url: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=400&q=80"
      }
    },
    category: "house",
    stock: 210000,
    warranty: 1,
    ratings: 0,
    numOfReviews: 0,
    reviews: [],
    user: seedUserId
  }
];

const runSeed = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not set");
    }

    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany();
    await Product.insertMany(seedProducts);
    console.log(`Seeded ${seedProducts.length} products`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runSeed();
