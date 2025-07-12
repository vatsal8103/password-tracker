🔐 PassTrac - React Password Manager
PassTrac is a simple yet powerful password manager built using React. It allows users to securely manage their website credentials, offering real-time feedback, clipboard interactions, and an interactive UI with visual icons and effects.

✨ Features
🔐 Add Passwords: Save website, username, and password with validation.

👁️ Toggle Visibility: Show or hide passwords using an eye icon toggle.

📋 Copy to Clipboard: Instantly copy any site, username, or password with a click.

✏️ Edit Entries: Modify any saved entry directly.

🗑️ Delete Entries: Remove credentials from the list and database.

🌐 Live API Sync: Integrates with a backend API (http://localhost:3000/) to fetch, store, and delete passwords.

🛎️ Toast Notifications: User-friendly feedback using react-toastify.

🎨 Animated Icons: Uses Lordicon for engaging visuals.

🧠 How It Works
Password entries are stored with a unique ID (uuidv4).

Inputs are validated before saving (minimum 3 characters each).

Data is sent to and retrieved from the backend via fetch API.

Password visibility is toggled using useRef.

Toast notifications alert users of actions like saving, copying, deleting.

Lordicon animations are used for buttons like copy, edit, and delete.

🧩 Component Overview
React Hooks:

useState – manages form input and password list.

useEffect – fetches passwords on component mount.

useRef – controls password field and toggle icons.

Functions:

getpasswords – fetch all saved credentials.

savepassword – validate and save a new credential.

editpassword – load data into form for editing.

deletepassword – remove a credential from list and backend.

copyText – copy field content to clipboard with toast.

showpassword – toggle input field between text and password.

💡 Notes
Backend is expected to expose routes for GET, POST, and DELETE requests at http://localhost:3000/.

Passwords are currently visible in plain text; consider encrypting or hashing for production use.

UI built with responsiveness and usability in mind using Tailwind CSS.

📸 Example UI Elements
Inputs: Site URL, Username, Password

Buttons: Save, Copy, Edit, Delete

Icons: Eye toggle, copy symbol, Lordicon animations

Tables: Password list displayed in a responsive table with actions per row

🧑‍🎓 Author
Made with 💚 by Vatsal Chauhan


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
