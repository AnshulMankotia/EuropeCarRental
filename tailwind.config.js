import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
          colors: {
            background: "var(--background)",
            foreground: "var(--foreground)",
            darkGray: '#202020',
            lightGray: '#F5F5F5',
            mediumGray: '#666666',
            metalgun : '#7C7A7A',
            white: '#FFFFFF',
            red: '#EA3C3C',
            green: '#009900',
          },
          backgroundImage: {
            'hero-background-image': "url('/images/heroImage.png')",
            'login-background-image': "url('/images/loginbg.png')",
          },
          boxShadow: {
            'custom': '0px 4px 10px 0px rgba(0, 0, 0, 0.05)',
          },
          spacing: {
           'spacing' : '4rem',
          },
        },
      },
      plugins: [],
    };
