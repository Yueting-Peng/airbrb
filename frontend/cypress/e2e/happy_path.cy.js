/* eslint-disable no-undef */

/**
 * Happy Path Test
 * Steps:
 * ============================= Host ===================================
 * 0. Visit the landing page
 * 1. Register a new account on the registration page.
 * 2. Create a new listing through the create listing page.
 * 3. Modify the listing via the edit listing page.
 * 4. Set the listing's availability while makeing the listing alive.
 * 5. Publish a listing using the publish button.
 * 6. Remove the listing from public view using the unpublish button.
 * =============================== User ==================================
 * 7. Navigate to the listing page from the home page.
 * 8. View detailed information of a listing via the listing detail page.
 * 9. Make a booking of a listing successfully
 * 10. Sign out of the account using the logout button.
 * 11. Navigate to the login page through login button.
 * 12. Logs back into the airbrb and navigate to the landing page successfully
 */

describe('airbrb happy path', () => {
  // Before each test we need to restore local storage to preserve it.
  beforeEach(() => {
    cy.restoreLocalStorage()
  });
  // After each test we save local storage.
  afterEach(() => {
    cy.saveLocalStorage()
  });
  // Step0 =====> Visit the landing page
  it('Step0: should visit the landing page successfully', () => {
    cy.visit('localhost:3000/');
    cy.url().should('include', 'localhost:3000');
    // To check if the page has rendered successfully, we look for the logo.
    cy.get('header.sc-eCstZk.gSVRgQ img[alt="logo"]').should('be.visible');
    // To check if the "Search Filters" button is rendered
    cy.get('button.ant-btn').contains('Search Filters').should('exist');

    cy.get('ul.ant-menu li').contains('All published listings').should('be.visible');
  });
  // <==================== END ==========================>
  // Step1 START =====> First step, go to the login/register page and register a new user
  it('Step1: should navigate to the register page successfully', () => {
  // Visit the registration page
    cy.visit('localhost:3000/register');
    // Verify that the URL is correct
    cy.url().should('include', 'localhost:3000/register');

    // Verify the presence of the H1 tag with the text "Create new account"
    cy.get('h1').contains('Create new account').should('be.visible');

    // Focus on the email input and type in the email
    cy.get('input#email').type('test@example.com');
    // Focus on the name input and type in the name
    cy.get('input#name').type('testuser');
    // Focus on the password input and type in the password
    cy.get('input#password').type('password');
    // Focus on the confirm password input and type in the password again
    cy.get('input#confirmPassword').type('password');

    // Click on the submit button to submit the form
    cy.get('form#signup-form button[type="submit"]').click();

    // Verify that a success message "Registered successfully!" appears
    cy.contains('.ant-message-custom-content', 'Registered successfully!').should('be.visible');

    // Verify that the user is redirected to the home page after successful registration
    cy.url().should('eq', 'http://localhost:3000/');
  });
  // <==================== END ==========================>
  // Step2 START =====> Create a new listing through the create listing page.
  it('Step2: should navigate to create listing page successfully', () => {
    cy.visit('localhost:3000/');
    cy.url().should('include', 'localhost:3000/');
    // Click on the 'Create a new listing' item in the menu
    // Locate the unordered list with the class 'ant-menu', then find the list item containing the text 'Create a new listing' and click on it
    cy.get('ul.ant-menu').find('li').contains('Create a new listing').click();

    cy.url().should('include', 'http://localhost:3000/hosting/create-listing');
    // Type in the title for the new listing
    cy.get('input#new_listing_form_title').type('example house');

    // Type in the street name for the new listing
    cy.get('input#new_listing_form_street').type('test Road');

    // Type in the city for the new listing
    cy.get('input#new_listing_form_city').type('test City');

    // Type in the state for the new listing
    cy.get('input#new_listing_form_state').type('AAAA');

    // Type in the postcode for the new listing
    cy.get('input#new_listing_form_postcode').type('1221');

    // Type in the country for the new listing
    cy.get('input#new_listing_form_country').type('Riverland');

    // Type in the price per night for the new listing
    cy.get('input#new_listing_form_price').type('200');

    cy.get('#new_listing_form_propertyType').click();

    cy.get('.ant-select-dropdown .ant-select-item').first().click();

    cy.get('#new_listing_form_guests').clear().type('1');

    cy.get('#new_listing_form_bedrooms').clear().type('1');

    cy.get('#new_listing_form_beds').clear().type('1');

    cy.get('#new_listing_form_bathrooms').clear().type('1');

    // The amenities are checkboxes; this will check the first checkbox (Wifi)
    cy.get('input[type="checkbox"][value="wifi"]').check();

    // Click the submit button to create the new listing
    cy.get('form#new_listing_form button[type="submit"]').click();

    // Check for the success message after creating the listing
    cy.contains('.ant-message-custom-content', 'Created a listing successfully!').should('be.visible');

    cy.wait(2000);

    // Confirm the URL redirection to the hosted listings page
    cy.url().should('include', 'localhost:3000/hosting');

    // Wait for two seconds to ensure the listing appears on the page

    // Check for the listing title in the listings on the page
    cy.get('td.ant-table-cell').contains('example house').should('be.visible');
  });
  // <==================== END ==========================>
  // Step 3 START =====> Modify the listing via the edit listing page.
  it('Step3: should navigate to edit page and perform editing', () => {
    cy.visit('http://localhost:3000/hosting');

    // First, click the button to expand the row in the table
    cy.get('td.ant-table-cell.ant-table-row-expand-icon-cell').find('button.ant-table-row-expand-icon').click();

    // Then, click the "Edit" link to go to the edit page
    cy.get('a').contains('Edit').click();

    // Check if the URL matches the expected pattern (with a dynamic listingId)
    cy.url().should('match', /http:\/\/localhost:3000\/hosting\/edit\/.+/);

    // Now on the edit page, perform the editing actions

    // Assuming the thumbnail upload involves selecting a file
    // const thumbnailPath = './cypress_test_img.png'; // Replace with actual file path
    // cy.get('input#new_listing_form_thumbnail').attachFile(thumbnailPath);

    // Modify the title of the listing
    cy.get('input#new_listing_form_title').clear().type('New 1');

    // Finally, submit the form
    cy.get('form#new_listing_form').submit(); // or cy.get('button').contains('Submit').click();

    cy.wait(3000);

    cy.url().should('include', '/hosting');
  });
  // <==================== END ==========================>
  // Step 4 START =====> Set the listing's availability while makeing the listing alive.
  it('Step4: should set the listing availability while makeing the listing alive.', () => {
    cy.get('button.ant-table-row-expand-icon').click();
    cy.get('a').contains('Publish').click();

    cy.get('.ant-modal-content').should('be.visible');

    cy.get('.ant-modal-content .ant-modal-title').should('have.text', 'Publish Listing');
  })
  // <==================== END ==========================>
  // Step 5 START =====> Publish a listing using the publish button.
  it('Step5: should set availability successfully', () => {
    // Click the start date input in the modal to open the date picker
    cy.get('.ant-modal-content .ant-picker-input').first().click();

    // Select a start date (assuming a specific date in the current month)
    // Adjust the selector and date according to your actual application
    cy.get('.ant-picker-cell[title="2023-12-10"]').click();

    // Click the end date input to open the date picker
    cy.get('.ant-picker-cell[title="2023-12-25"]').click();

    // Click the publish button
    cy.get('.ant-modal-footer .ant-btn-primary').contains('Publish').click();

    // Wait for the operation to complete
    cy.wait(2000);

    // Verify that the publish button no longer exists
    cy.get('.ant-modal-footer .ant-btn-primary').should('not.exist');

    cy.get('button.ant-table-row-expand-icon').click();
    cy.get('a').contains('Unpublish').should('be.visible');
  });
  // <==================== END ==========================>
  // Step 6 START =====> Remove the listing from public view using the unpublish button.
  it('Step6: should unpublish listing successfully', () => {
    cy.get('a').contains('Unpublish').click()
    cy.get('.ant-modal-content').should('be.visible');
    cy.get('.ant-modal-content').find('.ant-modal-confirm-title').contains('Unpublish a listing').should('be.visible');
    cy.get('button.ant-btn.ant-btn-default.ant-btn-dangerous').contains('OK').click();
    cy.wait(2000)
    // Unpublish button should not exist
    cy.get('button.ant-table-row-expand-icon').click();
    cy.get('a').contains('Unpublish').should('not.exist');
    // Publish should now exist
    cy.get('a').contains('Publish').should('be.visible')
  })
  // <==================== END ==========================>
  // Step 7 START =====> Navigate to the listing page from the home page.
  it('Step7: should navigate to landing page successfully', () => {
    cy.get('img[src="/static/media/airbrb_logo.0b6f9324eb0ecdca8825.png"].sc-dlfmHC.eZJnhq').click();

    cy.url().should('include', 'localhost:3000')
  })
  // <==================== END ==========================>
  // Step 8 START =====> View detailed information of a listing via the listing detail page.
  it('Step8: should open a listing detail page successfully', () => {
    cy.wait(10000);
    cy.get('.ant-card-body').first().click();

    cy.url().should('include', '/detail/');
    cy.wait(7000);
    cy.get('#property-information')
    // Use should() to assert that the element is visible
      .should('be.visible')
      .contains('Property Information');
  })
  // <==================== END ==========================>
  // Step 9 START =====> Make a booking of a listing successfully
  it('Step9: should make a booking of a listing successfully', () => {
    // Find and click on the start date input to open the calendar
    cy.get('.ant-picker-input-active input[placeholder="Start date"]')
      .click();

    // Select two dates from the calendar
    cy.get('.ant-picker-panels .ant-picker-cell')
      .not('.ant-picker-cell-disabled')
      .first()
      .click();
    cy.get('.ant-picker-panels .ant-picker-cell')
      .not('.ant-picker-cell-disabled')
      .eq(1) // This selects the second available date
      .click();

    cy.get('button[type="button"].ant-btn-primary.ant-btn-lg')
      .click();

    cy.get('.ant-modal-content').should('be.visible')
      .find('.ant-modal-confirm-title')
      .should('have.text', 'Confirm Reservation');

    cy.get('.ant-modal-content')
      .find('button.ant-btn-dangerous')
      .contains('OK')
      .click();

    cy.wait(2000)
  });
  // <==================== END ==========================>
  // Step 10 START =====> Sign out of the account using the logout button.
  it('Step10: should sign out of the account successfully', () => {
    // 在 Cypress 中找到并点击 "Log out" 按钮
    cy.get('#logoutMenuItem').click();

    // Check if the logout confirmation modal appears
    cy.get('.ant-modal-content').should('be.visible')
      .find('.ant-modal-confirm-title')
      .should('have.text', 'Are you sure you want to log out?');

    // Check for specific content in the modal, like "Logging out will end your session"
    cy.get('.ant-modal-confirm-content').should('contain', 'Logging out will end your session');

    // Click the "OK" button on the modal to confirm the logout
    cy.get('.ant-modal-content')
      .find('button.ant-btn-dangerous')
      .contains('OK')
      .click();

    cy.contains('.ant-message-custom-content', 'Logout successfully').should('be.visible');
    cy.url().should('eq', 'http://localhost:3000/');
  })
  // <==================== END ==========================>
  // Step 11 START =====> Navigate to the login page through login button.
  it('Step11: should navigate to login screen successfully', () => {
    cy.get('#loginMenuItem').click();

    // Check if the URL is the expected login page URL
    cy.url().should('include', 'localhost:3000/login');
  })
  // <==================== END ==========================>
  // Step 12 START =====> Logs back into the airbrb and navigate to the landing page successfully
  it('Step12: should login successfully', () => {
    // Visit the login page
    cy.visit('http://localhost:3000/login');

    // Type in the email address
    cy.get('#email').type('test@example.com');

    // Type in the password
    cy.get('#password').type('password');

    // Click the login button
    cy.get('button[type="submit"]').click();

    // After successful login, the URL should be redirected to the dashboard or home page
    // Replace 'YourHomePage' with the actual route
    cy.url().should('eq', 'http://localhost:3000/');

    // Verify if a specific element is visible after login, like a user menu or dashboard link
    // Replace '#userMenu' with the actual selector of the element that should be visible after login
    cy.get('header.sc-eCstZk.gSVRgQ img[alt="logo"]').should('be.visible');
  });
});
// <==================== End all Happy Path Testing ==========================>
