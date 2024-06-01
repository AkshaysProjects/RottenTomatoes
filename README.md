# RottenTomatoes Media App

## Overview

This project is a frontend web application inspired by Rotten Tomatoes, tailored for media content management, built with Next.js and TypeScript. It offers a visually appealing and responsive user interface, integrating features like user authentication, media browsing, and shortlisting. The app leverages modern design principles and robust state management to ensure a smooth and user-friendly experience.

## Features

1. **Visually Appealing Interface**: Inspired by Rotten Tomatoes, the frontend interface is designed to be visually appealing, prioritizing user experience.
2. **User Authentication and Shortlist Management**: Seamless user authentication, signup, and shortlist management features ensure smooth interaction and data handling.
3. **Browse Media Without Login/Signup**: Users can browse media content without the need for login/signup, enhancing accessibility and user engagement.
4. **Efficient State Management**: Utilizes Redux Toolkit for efficient state management and data flow, ensuring a seamless browsing experience.
5. **Authentication Redirect**: Redirects users to the login/signup page if they attempt to add an item to the shortlist without being logged in, enhancing security.
6. **Secure Authentication Methods**: Utilizes NextAuth.js (Auth.js) for secure and reliable user authentication, ensuring user data remains protected.
7. **UI/UX Design**: Implements Shadcn/UI along with Tailwind CSS for a visually appealing and intuitive frontend design, enhancing user interaction.
8. **Search Functionality**: Enables users to easily search for media content, improving navigation and user satisfaction.
9. **Infinite Scrolling**: Implements infinite scrolling for a smoother browsing experience, reducing loading times and enhancing user engagement.
10. **Comprehensive Testing**: Ensures all functionalities work as expected through thorough testing, providing a reliable user experience.
11. **Clear Documentation and Deployment**: Provides clear instructions for deploying and accessing the application, ensuring easy setup and usage.

## Screenshots

1. **Home Page**
   ![Home Page](images/home.png)

2. **Search Results**
   ![Search Results](images/search.png)

3. **Filters**
   ![Filters](images/filters.png)

4. **Movies**
   ![Cart Page](images/movies.png)

5. **TV Shows**
   ![Cart Page](images/shows.png)

6. **Shortlist**
   ![Cart Page](images/shortlist.png)

7. **Login Page**
   ![Login Page](images/login-page.png)

8. **Login Popup**
   ![Login Popup](images/login-popup.png)

9. **Media Info Page (Movie)**
   ![Media Info Page (Movie)](images/movie-info.png)

10. **Media Info Page (TV Show)**
    ![Media Info Page (TV Show)](images/show-info.png)

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- tRPC
- MongoDB
- NextAuth.js (Auth.js)
- Shadcn/UI
- React Icons

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/AkshaysProjects/RottenTomatoes.git
   ```
2. Navigate to the project directory:
   ```sh
   cd RottenTomatoes
   ```
3. Install the dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

### Configuration

1. Create a `.env.local` file in the root directory based on the provided `.env.example` for reference.
2. Add necessary environment variables to the `.env.local` file.

#### Environment Variables

Below are the environment variables required for the application:

```plaintext
# Next Auth Secret
# Can be generated using `npx auth secret` or `openssl rand -base64 33`
AUTH_SECRET=YourSecret

# MongoDB URI
MONGODB_URI=mongodb://root:example@localhost:27017/your-database

# MongoDB Credentials for Docker
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=example

# Next Auth Providers
# Google
GOOGLE_CLIENT_ID=ClientID
GOOGLE_CLIENT_SECRET=ClientSecret

# Resend
RESEND_API_KEY=ApiKey
RESEND_FROM=no-reply@example.com
```

If you're using MongoDB with Docker, include `MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_ROOT_PASSWORD`. If you're using MongoDB Atlas or any other deployment, these variables are not needed.

### Running the App

- For development:

  ```sh
  npm run dev
  # or
  yarn dev
  ```

  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- For production:
  ```sh
  npm run build
  npm run start
  # or
  yarn build
  yarn start
  ```

### Deployment

Deploy the application on platforms like Vercel, Netlify, or any other hosting service supporting Next.js applications.

For Docker deployment, use `docker-compose.yml` with appropriate configurations.

## Error Handling

The application includes comprehensive error handling mechanisms, ensuring any issues are logged and reported appropriately. The custom error component provides a user-friendly interface for error notifications.

## Contribution

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
