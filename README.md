📊 Data Visualization Dashboard - MERN Stack

A full-stack web application for uploading, visualizing, and analyzing data from Excel/CSV files with secure user authentication and beautiful interactive charts.

🚀 Features

✨ User Authentication — Secure signup/signin with 🔐 JWT tokens

📤 File Upload — Supports Excel (.xlsx, .xls) & CSV files

📁 Data Management — View, 🔍 search, ↕️ sort, and 📑 paginate uploaded datasets

📊 Interactive Visualizations — Dynamic bar, line, and pie charts 🥧

🔎 Filtering & Search — Real-time search across all columns

📱 Responsive Design — Mobile-friendly UI with TailwindCSS

🛠️ Tech Stack

⚙️ Backend

🟢 Node.js & ⚡ Express.js

🍃 MongoDB with Mongoose

🔐 JWT Authentication

📦 Multer for file uploads

📘 XLSX library for Excel parsing

🧂 Bcrypt for password hashing

💻 Frontend

⚛️ React.js 

🛣️ React Router 

🔗 Axios for API calls

📊 Recharts for data visualization

🎨 TailwindCSS for styling

⚡ Vite for lightning-fast builds

🔧 Installation & Setup

 1. Clone the Repository
 git clone https://github.com/ashish02003/DataVisualization

 cd data-viz-dashboard

 2. Backend Setup
   

  
 cd backend

 npm install

 mkdir uploads

 # Create .env file inside the backend folder

 Add the following to your backend/.env file:

 NODE_ENV=development

 PORT=5000

 MONGO_URI=your_mongo_URI

 JWT_SECRET=your_JWT_SECRET

 FRONTEND_URL=http://localhost:5173

 MAX_FILE_SIZE=10485760

 3. Frontend Setup
   
 cd frontend

 npm install
 # Create .env file
 Add the following to your frontend/.env file:

 VITE_API_URL=http://localhost:5000

 4. Run the Application
    
 Terminal 1 - Backend:

 cd backend

 npm run dev

Server will start at http://localhost:5000

 Terminal 2 - Frontend:
 
 cd frontend

npm run dev

Frontend will start at http://localhost:5173
