/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './node_modules/preline/preline.js',
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#1B1F3B",
                secondary: {
                    DEFAULT:"#FFEBFE",
                    lite: "#FDEAFC",
                },
            }
        },
    },
    plugins: [
        require('preline/plugin'),
        require('@tailwindcss/forms'),
    ],
}