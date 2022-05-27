import { BookingPage } from "../../pages/booking";
import { LoginPage } from "../../pages/login";
import bookings from "../../../bookings";

const login = new LoginPage();
const bookingPage = new BookingPage();
const addDays = function (date: Date, days: number) {
  var newDate = new Date(date.valueOf());
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

const sleepUntilBookngTime = () => {
  const bookingTime = new Date().setUTCHours(0, 50, 0, 0);
  cy.log(bookingTime.toString());
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate < bookingTime);
};

describe("Book A Tee Time", () => {
  const currentDate = new Date();
  const bookingDate = addDays(currentDate, 4);
  const todaysBooking = bookings.filter((booking) => {
    return (
      booking.month ==
        bookingDate.toLocaleString("default", { month: "long" }) &&
      booking.day == bookingDate.getDate()
    );
  });

  if (todaysBooking) {
    todaysBooking.forEach((booking) => {
      it(`Book TeeTime for ${booking.time} on ${booking.month} ${booking.day} `, () => {
        cy.visit("");
        cy.intercept("GET", "/private_api/sessions").as("loginSuccess");
        login.login();
        cy.wait("@loginSuccess");

        cy.intercept(
          "GET",
          new RegExp(`/marketplace/clubs/${booking.clubId}/teetimes\?.*`),
          {
            statusCode: 201,
            body: {},
          }
        ).as("bookingConfig");

        bookingPage.navigateTo(booking.clubId);
        bookingPage.setDate(booking.month, booking.day);
        sleepUntilBookngTime();
        const bookingReview = bookingPage.selectTeeTime(
          booking.time,
          booking.numPlayers
        );

        //bookingReview.confirmBooking();
      });
    });
  } else {
    it("No Bookings to make today", () => {
      cy.log("No bookings set today");
    });
  }

  it("No Bookings to make today", () => {
    bookings.forEach((booking) => {
      cy.log(booking.month + " " + booking.day);
    });
    cy.log(
      bookingDate.toLocaleString("default", { month: "long" }) +
        " " +
        bookingDate.getDate()
    );

    cy.log(
      bookings
        .filter((booking) => {
          return booking.month == "May";
        })
        .toString()
    );
  });
});
