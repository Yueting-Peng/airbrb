/* eslint-disable no-undef */
// ShowListingCard.spec.js
import React from 'react';
import ShowListingCard from '../../src/components/ShowListingCard';

describe('ShowListingCard Component Test', () => {
  it('should display the correct image, title, and description', () => {
    const testData = {
      image: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-760358951987380047/original/7aa67581-0918-495b-9859-b82be808a107.jpeg?im_w=720',
      title: 'Test Title',
      description: 'This is a test description'
    };

    cy.mount(<ShowListingCard {...testData} />);

    cy.get('img')
      .should('have.attr', 'src', testData.image)
      .and('have.attr', 'alt', testData.title);

    cy.get('.ant-card-meta-title')
      .should('contain', testData.title);

    cy.get('.ant-card-meta-description')
      .should('contain', testData.description);
  });
});
