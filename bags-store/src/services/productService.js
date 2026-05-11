import {
  addProduct, getAllProducts, getProductById,
  getProductsByCategory, updateProduct, deleteProduct, searchProducts
} from "./firestoreService";
import { uploadImage, uploadVideo } from "./cloudinaryService";

export const createProduct = async ({ name, price, category, description, sizes, colors, imageFiles, videoFile }, onProgress) => {
  const imageUrls = [];

  for (let i = 0; i < imageFiles.length; i++) {
    const url = await uploadImage(imageFiles[i], (p) => onProgress?.(`image-${i}`, p));
    imageUrls.push(url);
  }

  let videoUrl = null;
  if (videoFile) {
    videoUrl = await uploadVideo(videoFile, (p) => onProgress?.("video", p));
  }

  return await addProduct({
    name,
    price: Number(price),
    category,
    description,
    sizes: sizes || [],
    colors: colors || [],
    images: imageUrls,
    video: videoUrl,
    code: generateProductCode(),
    inStock: true,
  });
};

export const fetchAllProducts = getAllProducts;
export const fetchProductById = getProductById;
export const fetchByCategory = getProductsByCategory;
export const editProduct = updateProduct;
export const removeProduct = deleteProduct;
export const findProducts = searchProducts;

const generateProductCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return "LB-" + Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};