# Testing Documentation

This document outlines the User Interface (UI) testing and Component Testing conducted for my application. For this project, I used Cypress for UI Testing and Component Testing, as recommended by my instructor.

My testing approach is designed to ensure that the application is intuitive, efficient, and free from bugs for the admin user experience. By focusing on the happy path, I aim to validate the core functionalities and ensure that they work as expected under normal conditions. This approach helps us to confirm that our primary user journey is seamless and meets the intended user requirements.

## Test Environment

- **Test Tools:** [Cypress]

- **Browsers Tested:** [Chrome]

- **Date of Testing:** [November 17, 2023]

#### **Before starting the test, the project needs to be initiated:**

- **Start the Backend:**
  Navigate to the backend directory, install dependencies, and start the backend server:

  ```bash
  cd backend && npm install && npm run start
  ```

- **Start the Frontend:**
  Navigate to the frontend directory, install dependencies, and start the frontend application:

  ```bash
  cd frontend && npm install && npm run start
  ```

- **Run the Test Method:**
  To execute the tests, navigate to the frontend directory and run Cypress:
  ```bash
  cd frontend && npm run cypress
  ```

---

These commands will set up both the backend and frontend parts of my project and then run the Cypress tests for the UI and components.

<img src="./images_in_mds/2023-11-17 10.53.26.png" alt="UI-Test-Results" style="zoom: 100%;" />

The image shows a user interface from Cypress, a testing tool for web applications. Assuming you have already executed `npm run cypress` and have been directed to this page:

1. There are two main options presented for testing: "E2E Testing" and "Component Testing".
2. "E2E Testing" option is for building and testing the entire experience of the application from end-to-end to ensure each flow matches expectations.
3. "Component Testing" option is for building and testing components in isolation to ensure each state matches expectations.

## **UI** Testing

Initiate UI testing by selecting the "E2E Testing" option on the left. I have designed a Happy Path test that begins with initializing and registering a new user to log into the system. This test covers a complete series of actions including creating, editing, and publishing a room, user login, booking, and user logout.

#### Happy Path Test for Host User

The happy path test involves a series of steps that a host user would typically follow in my application. The test includes:

1. **Landing Page Visit:** Test the initial loading and display of the landing page.
2. **Account Registration:** Validate the account registration process on the registration page.
3. **Listing Creation:** Ensure that the host can create a new listing through the create listing page.
4. **Listing Modification:** Test the ability to modify a listing via the edit listing page.
5. **Setting Listing Availability:** Check the functionality to set a listing's availability and make it live.
6. **Publishing a Listing:** Confirm that the publish button works as expected to make a listing public.
7. **Unpublishing a Listing:** Test the unpublish button to remove a listing from public view.

8. **Navigating to Listing Page:** Validate the user journey from the host page to the listing page.
9. **Viewing Listing Details:** Ensure detailed information of a listing is accessible via the listing detail page.
10. **Making a Booking:** Test the booking process for a listing.
11. **Account Logout:** Confirm the functionality of the logout button.
12. **Login Page Navigation:** Test the journey to the login page and logging back into the system.
13. **Returning to Landing Page:** Validate the successful navigation back to the landing page after login.

## UI Test Results

<img src="./images_in_mds/2023-11-17 17.10.45.png" alt="UI-Test-Results" style="zoom: 67%;" />

The image I have provided appears to be a screenshot of my UI testing result. Since all steps are checked off, it implies the "happy path" — the ideal user journey without any problems — was completed successfully for this airbrb application. There are no failures or issues indicated, the test results are all positive.

## **Component** Testing

In the **Component** Testing section, I tested three components. 



#### 1. Rational for "Login Button Component Test"

**1.1. Test for Component Mounting**

-  I used `cy.mount` to render the `LoginBtn` component with the text "Log In." The test then checks if a button containing the text "Log In" is present.

**1.2. Test for Click Event Handling**

- The component is mounted with an `onClick` prop that is a Cypress spy. This spy function allows us to track if the function is called when the button is clicked. After clicking the button, the test verifies whether the `onClick` spy was called.

  

#### 2. Rational for "ShowListingCard Component Test"

**Test Objective: Verifying Content Display**

- This test aims to ensure that the `ShowListingCard` component correctly displays an image, a title, and a description as passed through its properties.
- Method:
  - The test starts by creating a `testData` object containing mock data for an image URL, a title, and a description.
  - The `ShowListingCard` component is then rendered using `cy.mount` with `testData` spread as props.
  - Subsequently, three assertions are made:
    1. **Image Verification**: The test checks if the image element (`img`) in the component has the `src` attribute matching the `testData.image` URL and an `alt` attribute matching the `testData.title`. This ensures that the image is correctly sourced and accessible.
    2. **Title Verification**: The test confirms that the element with the class `.ant-card-meta-title` contains the text from `testData.title`. This verifies that the title is displayed as expected.
    3. **Description Verification**: Similarly, the test checks if the element with the class `.ant-card-meta-description` contains the text from `testData.description`, confirming the display of the description.



#### 3. Rationale for "HostingSideBar Component Test"

**1. Rendering Menu Items Test**

- **Method**: Uses `cy.contains` to check visibility of "My Listings," "Manage Bookings," "Back to Travelling," and "Log Out."

**2. Click Event Logging Test**
- **Objective**: Verifies that click events on sidebar menu items are loggable.
- **Method**: Simulates clicks and uses `cy.window().its('console').invoke('log', ...)` to log these events.
- **Importance**: Essential for monitoring user interactions and useful for analytics or debugging.



## **Component** Testing Results

<img src="/Users/pengyueting/Desktop/23T3_6080/airbrb/images_in_mds/2023-11-17 18.34.46.png" style="zoom:50%;" />

<img src="/Users/pengyueting/Desktop/23T3_6080/airbrb/images_in_mds/2023-11-17 19.38.03.png" style="zoom:50%;" />

<img src="/Users/pengyueting/Desktop/23T3_6080/airbrb/images_in_mds/2023-11-17 20.08.54.png" style="zoom:50%;" />

