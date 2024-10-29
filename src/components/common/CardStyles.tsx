import { twMerge } from 'tailwind-merge';

export const cardClasses = {
  container: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6",
  
  card: "group bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
  
  imageWrapper: "relative overflow-hidden aspect-video",
  
  image: "w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300",
  
  content: "p-6",
  
  title: "text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors",
  
  date: "text-sm text-gray-500 dark:text-gray-400 mb-3",
  
  description: "text-gray-600 dark:text-gray-300 line-clamp-3",
  
  tags: "flex flex-wrap gap-2 mt-4",
  
  tag: "px-3 py-1 text-sm font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300",
  
  link: "mt-4 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300",
  
  stats: "flex items-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400",
  
  statItem: "flex items-center gap-1",
  
  filterSection: "mb-8 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-100 dark:border-gray-700",
  
  searchInput: "w-full px-4 py-2 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 outline-none transition-all duration-200",
  
  filterButton: "px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-300 transition-colors",
  
  activeFilter: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
}; 