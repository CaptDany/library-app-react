# Library Management App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

The Library Management App is a web application built with React and Express that allows readers to search for books, reserve books, and manage their borrowings. The staff can validate book borrowings and returns and manage users. This project demonstrates a basic implementation of a library management system with frontend and backend components.

## Features

- Book search by author, title, and editor
- Book reservation for readers
- Book borrowing and returning validation for staff
- User management for staff
- Intuitive navigation

## Technologies Used

- Frontend: React, React Router, Axios
- Backend: Node.js, Express, MongoDB

## Getting Started

To run the project locally, follow the instructions below:

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB server running locally on the default port (27017) or a custom port (if you have configured MongoDB to use a different port)

### Frontend Installation

1. Clone the repository:

```
git clone https://github.com/your-username/library-management-app.git
cd library-management-app
```

2. Install dependencies for the frontend:

```
npm install
```

### Frontend Running

1. Start the frontend:

```
npm start
```

The frontend development server will run at `http://localhost:3000`.

3. Open your web browser and navigate to `http://localhost:3000` to access the app.

### Backend Installation

1. Navigate to the backend directory:

```
cd \library-app-react\api
```

2. Install the required dependencies:

```
npm install
```

### Backend Configuration

1. Open the `app.js` file located in the `api` directory.

2. In the `app.js` file, locate the following line and replace `YOUR_LOCAL_MONGODB_CONNECTION_STRING` with your actual MongoDB connection string:

```javascript
const mongoURI = "YOUR_LOCAL_MONGODB_CONNECTION_STRING";
```

3. If your MongoDB server is running on a custom port (not the default 27017), make sure to include the port number in the connection string.

### Backend Running

Once you have completed the installation and configuration steps, you can start the backend server:

```
npm start
```

The backend server will run at `http://localhost:5000`.

**Note:** Make sure that your MongoDB server is running and accessible using the provided connection string.

## Deployment

To deploy the app to a production server, follow the deployment process for both the frontend and backend components. Ensure that you set appropriate environment variables for production settings.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or raise issues for bug fixes, new features, or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- This project was inspired by the idea of building a basic library management system.
- This project was developed by [Barucq](https://github.com/Barucq/) and [Captain Dany](https://github.com/CaptDany/).
