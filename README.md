🚗 MachanixHub

🔧 A Full-Stack Real-Time Mechanic & Vehicle Owner Platform
MachanixHub is a smart service platform that connects vehicle owners with nearby mechanics in real-time. It offers private chat, user authentication, service history tracking, and even future integration for AR-based garage previews.

📸 Screenshots

![1](https://github.com/user-attachments/assets/5c28f2f7-7b2f-4d4c-ad48-bc3fe5a44462)

![5](https://github.com/user-attachments/assets/0e459361-77aa-46bc-af04-68f7e6f89ebf)   ![6](https://github.com/user-attachments/assets/200e008e-2e94-4f29-a0af-27fb2c97bbaf)

![15](https://github.com/user-attachments/assets/9598cb7c-eaa6-41da-9a9c-45741b9e80bc)  ![12](https://github.com/user-attachments/assets/bada1e09-0dd6-4569-a6a2-4bf40b8e9cd4)

![22](https://github.com/user-attachments/assets/0e267f0a-3842-447f-a492-b2cb3bcc0faa)  ![17](https://github.com/user-attachments/assets/1389f63f-6710-47c5-a709-1c90fabd30df)


✨ Features
🔐 JWT-based Authentication for both Mechanics and Vehicle Owners

📱 Real-time Chat using WebSockets (Socket.IO)

📍 Mechanic Location & Profile View

🛠️ Mechanic Dashboard for Service Updates

🧾 Booking and Service Request Management

💬 Notification system for messages and service updates

📊 Future scope: AR Visualization for garage selection

🛠️ Tech Stack

Frontend	Backend	Database	Real-time	Others

React Native	Node.js (Express.js)	MongoDB Atlas	Socket.IO	JWT, bcrypt, dotenv, Mongoose

🚀 Getting Started
🔄 Clone the Repository
bash
Copy
Edit
git clone https://github.com/VivekSathwara/Machanixhub/

cd machanixhub

⚙️ Backend Setup (/server)

1.Install dependencies:

cd server
npm install

2.Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

3.Start the server:

npm start

📱 Frontend Setup (/client or /app)

1.Install dependencies:

cd ../client  # or wherever your frontend is
npm install

2.Run the app (if using Expo):

npm start

📁 Project Structure

machanixhub/

├── client/         # React Native frontend

├── server/         # Node.js backend

├── README.md

└── .env.example    # Sample environment variables


👨‍💻 Contributing
Contributions are welcome!
Please fork the repository and submit a pull request.

🛡️ Security Note
Do not upload your .env file.
Use .env.example to show the required environment variables.

📩 Contact
Developer: Vivek suvan

LinkedIn : https://www.linkedin.com/in/vivek-python-developer/

Email: vivekbsuvan123@gmail.com
