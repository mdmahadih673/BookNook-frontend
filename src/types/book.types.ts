export type BookCategory = 'Fiction' | 'Science' | 'History' | 'Kids' | 'Others';

export interface IBook {
  _id: string;
  title: string;
  author: string;
  category: BookCategory;
  image: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  userName: string;
  userEmail: string;
  addedDate: string;
}
