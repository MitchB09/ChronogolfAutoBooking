import { BookingReviewPage } from "./bookingReviewPage";

export class BookingPage {

  navigateTo(clubId: number) {
    cy.visit(`/dashboard/#/memberships/14771250/clubs/${clubId}/teesheet`);
  }

  setDate(month: string, day: number) {
    cy.get('.datepicker-popdown').click();
    cy.get('button[role="heading"]').click();
    cy.get('.uib-monthpicker').contains('button', month).click();
    cy.get('.uib-daypicker').contains('button', new RegExp(`^${day}$`)).click();
  }

  selectTeeTime(teeTime: string, numPlayers: number): BookingReviewPage {
    cy.get('teesheet-body').scrollTo('bottom');
    cy.contains('teesheet-teetime', teeTime).find('.teesheet-slots > .teesheet-slot').as('desiredTeeTime');
    
    // Assert Tee Time has enough open slots
    for (let i = 0; i < numPlayers; i++) {
      cy.get('@desiredTeeTime').eq(i).should('not.have.class', 'is-taken')
    }

    // Click Desired slots
    cy.get('@desiredTeeTime').eq(numPlayers-1).click();

    cy.get('.modal-dialog').contains('button', 'Continue').click();
    return new BookingReviewPage();
  }
}