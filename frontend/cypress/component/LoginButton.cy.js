/* eslint-disable no-undef */
import React from 'react';
import LoginBtn from '../../src/components/LoginBtn';

describe('Login Button Component Test', () => {
  it('should mount', () => {
    cy.mount(<LoginBtn>Log In</LoginBtn>);
    cy.get('button').contains('Log In');
  });

  it('when button is clicked, should call onClick', () => {
    cy.mount(<LoginBtn onClick={cy.spy().as('onClick')}>Log In</LoginBtn>);
    cy.get('button').contains('Log In').click();
    cy.get('@onClick').should('have.been.called');
  });
});
