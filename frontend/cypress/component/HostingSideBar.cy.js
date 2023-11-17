/* eslint-disable no-undef */
// HostingSideBar.spec.js
import React from 'react';
import HostingSideBar from '../../src/components/HostingSideBar';

describe('HostingSideBar Component Test', () => {
  it('should render all menu items correctly', () => {
    cy.mount(<HostingSideBar />);

    cy.contains('My Listings').should('be.visible');
    cy.contains('Manage Bookings').should('be.visible');
    cy.contains('Back to Travelling').should('be.visible');
    cy.contains('Log Out').should('be.visible');
  });

  it('should log the click event', () => {
    cy.mount(<HostingSideBar />);

    cy.contains('My Listings').click();
    cy.window().its('console').invoke('log', 'click ', { key: '1' });
    cy.contains('Manage Bookings').click();
    cy.window().its('console').invoke('log', 'click ', { key: '2' });
  });
});
