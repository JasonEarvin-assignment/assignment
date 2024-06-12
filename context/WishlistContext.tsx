import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore/lite';
import { firestore } from '../firebase/config';

interface Movie {
  title: string;
  year: string;
  poster: string;
}

interface WishlistContextProps {
  wishlist: Movie[];
  addToWishlist: (movie: Movie) => void;
  removeFromWishlist: (title: string) => void;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

export const useWishlist = (): WishlistContextProps => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const wishlistCollection = collection(firestore, 'wishlist');
      const wishlistSnapshot = await getDocs(wishlistCollection);
      const wishlistData = wishlistSnapshot.docs.map(doc => doc.data() as Movie);
      setWishlist(wishlistData);
    };

    fetchWishlist();
  }, []);

  const addToWishlist = async (movie: Movie) => {
    const movieDoc = doc(firestore, 'wishlist', movie.title);
    await setDoc(movieDoc, movie);
    setWishlist(prevWishlist => [...prevWishlist, movie]);
  };

  const removeFromWishlist = async (title: string) => {
    const movieDoc = doc(firestore, 'wishlist', title);
    await deleteDoc(movieDoc);
    setWishlist(prevWishlist => prevWishlist.filter(movie => movie.title !== title));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
