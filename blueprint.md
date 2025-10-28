# Project Blueprint

## Overview

This is a simple library application that allows users to create, read, update, and delete books. The application is built using React, TypeScript, and Firebase. It uses Material-UI for styling and react-router-dom for routing.

## Features

*   User authentication (login/logout)
*   Create, read, update, and delete books
*   Each book is associated with the user who created it
*   Users can only edit books they have created

## Current Task: Associate Books with Users

### Plan

1.  **Modify `AddBookPage.tsx`:**
    *   Get the current user's ID using `getAuth`.
    *   When saving a new book, include the `userId` in the book data.

2.  **Modify `BookList.tsx`:**
    *   Conditionally render the "Edit" button based on the `userId` of the book and the ID of the currently logged-in user.
