export class BookingReviewPage {

  confirmBooking() {
    cy.intercept('POST', '/marketplace/reservations').as('reservationSubmit');
    cy.get('reservation-review-terms').find('input[type="checkbox"]').click()
    cy.contains('button', 'Confirm Reservation').click();
    cy.wait('@reservationSubmit');


    cy.get('.alert-danger').should('not.exist');
  }
}