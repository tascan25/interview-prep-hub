import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AppContextType {
  user: User | null;
  bookmarks: string[];
  readingHistory: string[];
  addBookmark: (blogId: string) => void;
  removeBookmark: (blogId: string) => void;
  isBookmarked: (blogId: string) => boolean;
  addToHistory: (blogId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const BOOKMARKS_KEY = 'interview-prep-bookmarks';
const HISTORY_KEY = 'interview-prep-history';

export function AppProvider({ children }: { children: ReactNode }) {
  const [user] = useState<User | null>({
    id: '1',
    name: 'John Developer',
    email: 'john@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem(BOOKMARKS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [readingHistory, setReadingHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(readingHistory));
  }, [readingHistory]);

  const addBookmark = (blogId: string) => {
    setBookmarks(prev => [...new Set([...prev, blogId])]);
  };

  const removeBookmark = (blogId: string) => {
    setBookmarks(prev => prev.filter(id => id !== blogId));
  };

  const isBookmarked = (blogId: string) => {
    return bookmarks.includes(blogId);
  };

  const addToHistory = (blogId: string) => {
    setReadingHistory(prev => {
      const filtered = prev.filter(id => id !== blogId);
      return [blogId, ...filtered].slice(0, 50);
    });
  };

  return (
    <AppContext.Provider value={{
      user,
      bookmarks,
      readingHistory,
      addBookmark,
      removeBookmark,
      isBookmarked,
      addToHistory,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
