import { BookingPage } from '../../pages/booking';
import { LoginPage } from '../../pages/login';
import bookings from '../../../bookings'; 

const login = new LoginPage();
const bookingPage = new BookingPage();

describe('Book A Tee Time', () => {
    
    bookings.forEach(booking => {
        it(`Book TeeTime for ${booking.time} on ${booking.month} ${booking.day} `,() => {
            cy.visit("");
            cy.intercept('GET', '/private_api/sessions').as('loginSuccess');
            login.login();
            cy.wait('@loginSuccess');

            cy.intercept('GET', new RegExp(`/marketplace/clubs/${booking.clubId}/teetimes\?.*`), {
                statusCode: 201,
                body: {
                },
              }).as('bookingConfig')

            bookingPage.navigateTo(booking.clubId);
            bookingPage.setDate(booking.month, booking.day);
            const bookingReview = bookingPage.selectTeeTime(booking.time, booking.numPlayers);

            bookingReview.confirmBooking();
        });
    });
    
});
