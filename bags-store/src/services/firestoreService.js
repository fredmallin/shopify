import {
  collection, addDoc, getDocs, getDoc, doc,
  updateDoc, deleteDoc, query, where, orderBy, serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const PRODUCTS_COL = "products";

export const addProduct = async (data) => {
  return await addDoc(collection(db, PRODUCTS_COL), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const getAllProducts = async () => {
  const q = query(collection(db, PRODUCTS_COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const getProductById = async (id) => {
  const ref = doc(db, PRODUCTS_COL, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error("Product not found");
  return { id: snap.id, ...snap.data() };
};

export const getProductsByCategory = async (category) => {
  const q = query(
    collection(db, PRODUCTS_COL),
    where("category", "==", category),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const updateProduct = async (id, data) => {
  const ref = doc(db, PRODUCTS_COL, id);
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
};

export const deleteProduct = async (id) => {
  await deleteDoc(doc(db, PRODUCTS_COL, id));
};

export const searchProducts = async (searchTerm) => {
  const all = await getAllProducts();
  const term = searchTerm.toLowerCase();
  return all.filter(
    (p) =>
      p.name?.toLowerCase().includes(term) ||
      p.category?.toLowerCase().includes(term) ||
      p.description?.toLowerCase().includes(term)
  );
};