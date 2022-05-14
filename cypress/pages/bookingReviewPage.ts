export class BookingReviewPage {

  confirmBooking() {
    cy.get('reservation-review-terms').find('input[type="checkbox"]').click()
    cy.contains('button', 'Confirm Reservation').click();
  }
}