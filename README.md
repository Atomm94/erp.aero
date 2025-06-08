# Authentication and File Upload Service

A RESTful authentication service built with Node.js, Express, and JWT for secure user authentication and session
management.

## Features

- User registration and login
- JWT-based authentication
- Refresh token mechanism
- Session management with device tracking
- Swagger API documentation
- File upload with Multer
## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Atomm94/erp.aero.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
    - Copy `.env.sample` to `.env`
    - Update the values in `.env` with your configuration
   ```bash
   cp .env.sample .env
   ```

4. Create and setup the database:
    - Create a MySQL database
    - Update DB_ variables in .env with your database credentials

## Running the Application

Start the development server:
