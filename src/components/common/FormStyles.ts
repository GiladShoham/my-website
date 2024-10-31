import { twMerge } from 'tailwind-merge';

export const formClasses = {
  container: "max-w-2xl mx-auto p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700",
  formTitle: "text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center",
  inputWrapper: "mb-6 relative group",
  label: "block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 transition-transform group-focus-within:-translate-y-1",
  input: `w-full px-4 py-3 
    bg-white dark:bg-gray-800 
    text-gray-900 dark:text-gray-100
    border-2 border-gray-200 dark:border-gray-600 
    rounded-xl 
    focus:border-blue-500 dark:focus:border-blue-400 
    focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 
    outline-none transition-all duration-200
    placeholder-gray-400 dark:placeholder-gray-500`,
  textarea: `w-full px-4 py-3 
    bg-white dark:bg-gray-800 
    text-gray-900 dark:text-gray-100
    border-2 border-gray-200 dark:border-gray-600 
    rounded-xl 
    focus:border-blue-500 dark:focus:border-blue-400 
    focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 
    outline-none transition-all duration-200 
    min-h-[120px] resize-y
    placeholder-gray-400 dark:placeholder-gray-500`,
  select: `w-full px-4 py-3 
    bg-white dark:bg-gray-800 
    text-gray-900 dark:text-gray-100
    border-2 border-gray-200 dark:border-gray-600 
    rounded-xl 
    focus:border-blue-500 dark:focus:border-blue-400 
    focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 
    outline-none transition-all duration-200`,
  button: `w-full bg-gradient-to-r from-blue-500 to-purple-500 
    hover:from-blue-600 hover:to-purple-600 
    text-white font-medium py-3 px-6 
    rounded-xl shadow-lg hover:shadow-xl 
    transform hover:-translate-y-0.5 
    transition-all duration-200`,
  requiredStar: "text-red-500 ml-1",
  errorText: "text-sm text-red-500 mt-1",
  checkbox: {
    wrapper: "flex items-center mb-6",
    input: `w-5 h-5 rounded 
      bg-white dark:bg-gray-800
      text-gray-900 dark:text-gray-100
      border-2 border-gray-200 dark:border-gray-600 
      text-blue-500 
      focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 
      transition-all duration-200`,
    label: "ml-3 text-sm font-medium text-gray-700 dark:text-gray-300"
  }
};

export const getInputClassName = (baseClass: string, error?: boolean) => {
  return twMerge(
    baseClass,
    error && "border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-800"
  );
}; 