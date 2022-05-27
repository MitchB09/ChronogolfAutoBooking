interface BookingData {
  clubId: number;
  month: string;
  day: number;
  time: string;
  numPlayers: number;
}

const bookingData: BookingData[] = [
  {
    clubId: 18848,
    month: "May",
    day: 19,
    time: "4:30 PM",
    numPlayers: 3,
  },
  {
    clubId: 18848,
    month: "May",
    day: 29,
    time: "4:40 PM",
    numPlayers: 3,
  },
  {
    clubId: 18848,
    month: "May",
    day: 31,
    time: "4:30 PM",
    numPlayers: 3,
  },
  {
    clubId: 18848,
    month: "June",
    day: 2,
    time: "4:30 PM",
    numPlayers: 3,
  },
];

export default bookingData;
