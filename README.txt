Poll & Voting App

Features

User Features:
- Register and login securely.
- View all open polls.
- Vote only once per poll.
- View results once the poll is closed.

Admin Features:
- Create, edit, and delete polls.
- Add a question, multiple options (minimum 2), and a closing date/time.
- Close polls manually or automatically based on the closing time.
- View final results with total votes per option.

Functional Highlights

- Role-based authentication (User / Admin).
- Automatic poll status update (Open / Closed).
- Prevents duplicate voting.

Technology Stack

Frontend: React.js + Tailwind CSS  
Reason: Fast, responsive, and modern UI components.  

Backend: Node.js + Express.js  
Reason: Easy REST API creation with MVC structure.  

Database: MongoDB (Mongoose)  
Reason: Flexible NoSQL schema for users and polls.  

Authentication: JWT + bcrypt.js  
Reason: Secure login and role-based authorization.  


Folder Structure

Poll-Voting-App/
│
├── backend/
│   ├── config/ - database and environment setup
│   ├── controllers/ - business logic
│   ├── models/ - mongoose schemas
│   ├── routes/ - express routes
│   ├── middlewares/ - authentication and validation
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/ - reusable UI components
│   │   ├── pages/ - login, register, polls, admin pages
│   │   ├── utils/ - API and helper functions
│   │   └── App.js
│   └── package.json
│
├── .env
├── README.txt
└── package.json

API Endpoints

Authentication Routes:
POST /api/auth/register - Register new user  
POST /api/auth/login - Login and get JWT token  

Admin Routes:
POST /api/polls - Create new poll  
PUT /api/polls/:id - Edit existing poll  
DELETE /api/polls/:id - Delete poll  
GET /api/polls - View all polls  
PATCH /api/polls/:id/close - Close poll manually  

User Routes:
GET /api/polls/open - Get list of open polls  
POST /api/polls/:id/vote - Submit vote  
GET /api/polls/:id/results - View poll results  


Database Structure (ER Diagram in Text)


User Table:
- userId (Primary Key)
- username
- email
- password
- role (Admin/User)

Poll Table:
- pollId (Primary Key)
- question
- options[] (Array of strings)
- closingDateTime
- status (Open/Closed)
- createdBy (Foreign Key → User)

Vote Table:
- voteId (Primary Key)
- userId (Foreign Key → User)
- pollId (Foreign Key → Poll)
- selectedOption
- createdAt

Setup and Installation

1. Clone the repository  
   git clone https://github.com/your-username/poll-voting-app.git

2. Install backend dependencies  
   cd backend  
   npm install

3. Install frontend dependencies  
   cd frontend  
   npm install

4. Create a .env file and add your environment variables:  
   MONGO_URI = your_mongodb_connection_string  
   JWT_SECRET = your_secret_key  
   PORT = 8050  

5. Start backend server  
   cd backend  
   npm start

6. Start frontend server  
   cd frontend  
   npm start

7. Open your browser and visit  
   http://localhost:5173

