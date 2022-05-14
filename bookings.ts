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
        month: 'May',
        day: 18,
        time: '4:30 PM',
        numPlayers: 3
    }
];

export default bookingData;