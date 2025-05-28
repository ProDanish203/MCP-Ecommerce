import mongoose from "mongoose";
import { Product } from "../models/product.model";
import { Category } from "./../types/type";
import { connectDb } from "./db";
import dotenv from "dotenv";

dotenv.config();

const imageUrls = [
  "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg",
  "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/9992332/pexels-photo-9992332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/2115221/pexels-photo-2115221.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/16355819/pexels-photo-16355819/free-photo-of-camera-lens-on-white-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/6102824/pexels-photo-6102824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/6370373/pexels-photo-6370373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

const cameraProducts = [
  {
    name: "Canon EOS R5 Mirrorless Camera",
    description:
      "Professional full-frame mirrorless camera with 45MP sensor, 8K video recording, and advanced autofocus system. Perfect for professional photographers and videographers.",
    price: 3899.99,
    stock: 15,
  },
  {
    name: "Sony Alpha a7 IV Full Frame Camera",
    description:
      "Versatile full-frame camera with 33MP sensor, 4K video, and exceptional low-light performance. Ideal for both photography and videography.",
    price: 2498.0,
    stock: 22,
  },
  {
    name: "Nikon D850 DSLR Camera",
    description:
      "High-resolution DSLR with 45.7MP sensor, excellent dynamic range, and robust build quality. Perfect for landscape and portrait photography.",
    price: 2796.95,
    stock: 18,
  },
  {
    name: "Fujifilm X-T5 Mirrorless Camera",
    description:
      "Compact mirrorless camera with 40.2MP X-Trans sensor, film simulation modes, and weather-resistant body. Great for travel photography.",
    price: 1699.95,
    stock: 28,
  },
  {
    name: "Canon EOS 90D DSLR Camera",
    description:
      "Mid-range DSLR with 32.5MP APS-C sensor, dual pixel autofocus, and 4K video capabilities. Perfect for enthusiast photographers.",
    price: 1199.0,
    stock: 35,
  },
  {
    name: "Sony Alpha a6700 APS-C Camera",
    description:
      "Compact APS-C mirrorless camera with 26MP sensor, advanced AI autofocus, and excellent video features for content creators.",
    price: 1398.0,
    stock: 24,
  },
  {
    name: "Nikon Z6 II Full Frame Camera",
    description:
      "Full-frame mirrorless camera with 24.5MP sensor, dual card slots, and impressive low-light performance for versatile shooting.",
    price: 1996.95,
    stock: 20,
  },
  {
    name: "Canon RF 24-70mm f/2.8L IS USM Lens",
    description:
      "Professional standard zoom lens with image stabilization, weather sealing, and exceptional optical quality for Canon RF mount.",
    price: 2299.0,
    stock: 12,
  },
  {
    name: "Sony FE 85mm f/1.4 GM Portrait Lens",
    description:
      "Premium portrait lens with beautiful bokeh, fast f/1.4 aperture, and G Master optical performance for stunning portraits.",
    price: 1798.0,
    stock: 16,
  },
  {
    name: "Nikon NIKKOR Z 24-200mm f/4-6.3 VR",
    description:
      "Versatile all-in-one zoom lens with vibration reduction, perfect for travel and everyday photography with excellent reach.",
    price: 896.95,
    stock: 30,
  },
  {
    name: "Fujifilm XF 56mm f/1.2 R WR Lens",
    description:
      "Weather-resistant portrait lens with fast f/1.2 aperture, delivering exceptional bokeh and sharpness for X-series cameras.",
    price: 999.95,
    stock: 14,
  },
  {
    name: "Canon EOS M50 Mark II Mirrorless",
    description:
      "Entry-level mirrorless camera with 24.1MP APS-C sensor, vari-angle touchscreen, and built-in Wi-Fi for easy sharing.",
    price: 599.99,
    stock: 42,
  },
  {
    name: "Sony Alpha a7R V Full Frame Camera",
    description:
      "Ultra-high resolution camera with 61MP sensor, advanced image stabilization, and professional-grade video features.",
    price: 3898.0,
    stock: 8,
  },
  {
    name: "Nikon D780 DSLR Camera",
    description:
      "Hybrid DSLR combining traditional optical viewfinder with mirrorless-style live view and excellent video capabilities.",
    price: 2296.95,
    stock: 19,
  },
  {
    name: "Fujifilm X-H2S Mirrorless Camera",
    description:
      "High-speed mirrorless camera with 26.1MP X-Trans sensor, 40fps burst shooting, and professional video features.",
    price: 2499.95,
    stock: 11,
  },
  {
    name: "Canon EOS R6 Mark II Camera",
    description:
      "Full-frame mirrorless camera with 24.2MP sensor, advanced subject detection, and excellent low-light performance.",
    price: 2499.0,
    stock: 17,
  },
  {
    name: "Sony FE 70-200mm f/2.8 GM OSS II",
    description:
      "Professional telephoto zoom lens with constant f/2.8 aperture, optical stabilization, and flagship G Master quality.",
    price: 2798.0,
    stock: 9,
  },
  {
    name: "Nikon Z9 Professional Camera",
    description:
      "Flagship mirrorless camera with 45.7MP sensor, 8K video, and professional durability for demanding applications.",
    price: 5496.95,
    stock: 6,
  },
  {
    name: "Fujifilm GFX 100S Medium Format",
    description:
      "Medium format mirrorless camera with 102MP sensor, exceptional image quality, and compact design for studio work.",
    price: 5999.95,
    stock: 4,
  },
  {
    name: "Canon RF 16-35mm f/2.8L IS USM",
    description:
      "Ultra-wide zoom lens with image stabilization, weather sealing, and professional optical performance for landscapes.",
    price: 2299.0,
    stock: 13,
  },
  {
    name: "Sony Alpha a7C Compact Camera",
    description:
      "Compact full-frame camera with 24.2MP sensor, 5-axis stabilization, and smallest full-frame body for travel.",
    price: 1798.0,
    stock: 26,
  },
  {
    name: "Nikon NIKKOR Z 50mm f/1.2 S Lens",
    description:
      "Premium standard lens with ultra-fast f/1.2 aperture, exceptional bokeh, and flagship S-line optical quality.",
    price: 2096.95,
    stock: 10,
  },
  {
    name: "Fujifilm X-T4 Mirrorless Camera",
    description:
      "Advanced mirrorless camera with 26.1MP X-Trans sensor, in-body stabilization, and professional video features.",
    price: 1699.95,
    stock: 21,
  },
  {
    name: "Canon EOS R10 APS-C Camera",
    description:
      "Entry-level mirrorless camera with 24.2MP APS-C sensor, fast autofocus, and compact design for beginners.",
    price: 979.0,
    stock: 38,
  },
  {
    name: "Sony FE 24-105mm f/4 G OSS Lens",
    description:
      "Versatile standard zoom lens with constant f/4 aperture, optical stabilization, and G-series optical quality.",
    price: 1298.0,
    stock: 18,
  },
  {
    name: "Nikon D7500 DSLR Camera",
    description:
      "Enthusiast DSLR with 20.9MP DX sensor, 4K video recording, and weather-sealed body for outdoor photography.",
    price: 1246.95,
    stock: 25,
  },
  {
    name: "Fujifilm XF 16-80mm f/4 R OIS WR",
    description:
      "Weather-resistant standard zoom lens with optical stabilization, perfect for everyday photography and travel.",
    price: 799.95,
    stock: 22,
  },
  {
    name: "Canon RF 85mm f/1.2L USM DS Lens",
    description:
      "Premium portrait lens with unique Defocus Smoothing technology, delivering exceptional bokeh quality.",
    price: 2999.0,
    stock: 7,
  },
  {
    name: "Sony Alpha a6400 APS-C Camera",
    description:
      "Compact mirrorless camera with 24.2MP sensor, real-time eye autofocus, and flip-up screen for content creation.",
    price: 898.0,
    stock: 33,
  },
  {
    name: "Nikon NIKKOR Z 14-30mm f/4 S",
    description:
      "Ultra-wide zoom lens with S-line optical quality, perfect for landscapes and architecture photography.",
    price: 1296.95,
    stock: 15,
  },
  {
    name: "Fujifilm X-Pro3 Rangefinder Camera",
    description:
      "Unique rangefinder-style camera with 26.1MP X-Trans sensor, hybrid viewfinder, and classic design aesthetic.",
    price: 1799.95,
    stock: 12,
  },
  {
    name: "Canon EOS R50 Mirrorless Camera",
    description:
      "Beginner-friendly mirrorless camera with 24.2MP APS-C sensor, guided interface, and social media connectivity.",
    price: 679.99,
    stock: 45,
  },
  {
    name: "Sony FE 35mm f/1.4 GM Lens",
    description:
      "Premium wide-angle lens with fast f/1.4 aperture, G Master optical quality, and excellent low-light performance.",
    price: 1398.0,
    stock: 14,
  },
  {
    name: "Nikon Z5 Full Frame Camera",
    description:
      "Affordable full-frame mirrorless camera with 24.3MP sensor, dual card slots, and excellent value proposition.",
    price: 1396.95,
    stock: 29,
  },
  {
    name: "Fujifilm XF 23mm f/1.4 R LM WR",
    description:
      "Weather-resistant wide-angle lens with fast f/1.4 aperture, linear motor autofocus, and exceptional sharpness.",
    price: 899.95,
    stock: 17,
  },
  {
    name: "Canon RF 100-400mm f/5.6-8 IS USM",
    description:
      "Compact telephoto zoom lens with excellent reach, image stabilization, and affordable pricing for wildlife.",
    price: 649.0,
    stock: 20,
  },
  {
    name: "Sony Alpha a7S III Video Camera",
    description:
      "Specialized video camera with 12.1MP full-frame sensor, exceptional low-light performance, and professional video features.",
    price: 3498.0,
    stock: 8,
  },
  {
    name: "Nikon NIKKOR Z 85mm f/1.8 S Lens",
    description:
      "Compact portrait lens with fast f/1.8 aperture, S-line optical quality, and smooth bokeh rendering.",
    price: 796.95,
    stock: 23,
  },
  {
    name: "Fujifilm X-E4 Compact Camera",
    description:
      "Ultra-compact rangefinder-style camera with 26.1MP X-Trans sensor, tilting LCD, and classic design.",
    price: 849.95,
    stock: 19,
  },
  {
    name: "Canon RF 50mm f/1.8 STM Lens",
    description:
      "Affordable standard lens with fast f/1.8 aperture, smooth autofocus, and compact design for everyday photography.",
    price: 199.0,
    stock: 55,
  },
  {
    name: "Sony FE 20mm f/1.8 G Ultra-Wide Lens",
    description:
      "Ultra-wide angle lens with fast f/1.8 aperture, G-series optical quality, perfect for astrophotography and landscapes.",
    price: 898.0,
    stock: 16,
  },
  {
    name: "Nikon Z fc Retro Camera",
    description:
      "Retro-styled APS-C mirrorless camera with 20.9MP sensor, classic controls, and modern technology in vintage design.",
    price: 956.95,
    stock: 27,
  },
  {
    name: "Fujifilm XF 18-55mm f/2.8-4 R LM OIS",
    description:
      "Standard zoom lens with optical stabilization, weather resistance, and constant bright aperture throughout zoom range.",
    price: 699.95,
    stock: 31,
  },
  {
    name: "Canon EOS R8 Full Frame Camera",
    description:
      "Compact full-frame camera with 24.2MP sensor, advanced autofocus, and professional features in a lightweight body.",
    price: 1499.0,
    stock: 24,
  },
  {
    name: "Sony Alpha a9 III Professional Camera",
    description:
      "Professional sports camera with global shutter technology, 24.6MP sensor, and industry-leading autofocus performance.",
    price: 5998.0,
    stock: 5,
  },
  {
    name: "Nikon NIKKOR Z 70-200mm f/2.8 VR S",
    description:
      "Professional telephoto zoom lens with constant f/2.8 aperture, vibration reduction, and S-line optical excellence.",
    price: 2596.95,
    stock: 9,
  },
  {
    name: "Fujifilm X100VI Compact Camera",
    description:
      "Premium compact camera with 40.2MP X-Trans sensor, built-in lens, and iconic design for street photography.",
    price: 1599.95,
    stock: 13,
  },
  {
    name: "Canon RF 35mm f/1.8 Macro IS STM",
    description:
      "Versatile wide-angle macro lens with image stabilization, 1:2 magnification ratio, and smooth autofocus.",
    price: 529.0,
    stock: 28,
  },
  {
    name: "Sony FE 90mm f/2.8 Macro G OSS",
    description:
      "Professional macro lens with 1:1 magnification, optical stabilization, and G-series optical quality for close-up work.",
    price: 1098.0,
    stock: 11,
  },
  {
    name: "Nikon Z30 Content Creator Camera",
    description:
      "Vlogging-focused camera with 20.9MP APS-C sensor, flip-out screen, and features designed for content creators.",
    price: 706.95,
    stock: 36,
  },
  {
    name: "Fujifilm XF 10-24mm f/4 R OIS WR",
    description:
      "Ultra-wide zoom lens with optical stabilization, weather resistance, and consistent f/4 aperture for landscapes.",
    price: 999.95,
    stock: 15,
  },
];

const getRandomImageUrl = (): string => {
  return imageUrls[Math.floor(Math.random() * imageUrls.length)];
};

const seedDatabase = async (): Promise<void> => {
  try {
    await connectDb();

    console.log("Clearing existing camera products...");
    await Product.deleteMany({ category: Category.Electronics });

    const productsToInsert = cameraProducts.map((product) => ({
      ...product,
      imageUrl: getRandomImageUrl(),
      category: Category.Electronics,
    }));

    console.log("Inserting camera products...");
    const insertedProducts = await Product.insertMany(productsToInsert);

    console.log(
      `✅ Successfully seeded ${insertedProducts.length} camera products!`
    );

    const totalStock = insertedProducts.reduce(
      (sum, product) => sum + product.stock,
      0
    );
    const avgPrice =
      insertedProducts.reduce((sum, product) => sum + product.price, 0) /
      insertedProducts.length;

    console.log(`📊 Total stock: ${totalStock} items`);
    console.log(`💰 Average price: $${avgPrice.toFixed(2)}`);
    console.log(
      `🏷️  Price range: $${Math.min(
        ...insertedProducts.map((p) => p.price)
      )} - $${Math.max(...insertedProducts.map((p) => p.price))}`
    );
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
};

seedDatabase()
  .then(() => {
    console.log("🎉 Seeding completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Seeding failed:", error);
    process.exit(1);
  });
