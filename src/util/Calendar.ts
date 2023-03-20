import dayjs from 'dayjs';

class MyCalendar {
  static days = ['일', '월', '화', '수', '목', '금', '토'];

  static months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  startDate: number;

  startDay: number;

  endDate: number;

  endDay: number;

  constructor(year: number, month: number) {
    const start = dayjs(new Date(year, month, 0));
    const end = dayjs(new Date(year, month + 1, 0));
    this.startDate = start.date();
    this.startDay = start.day();
    this.endDate = end.date();
    this.endDay = end.day();
  }

  static getDayString(day: number) {
    return MyCalendar.days[day];
  }

  static getMonthString(month: number) {
    return MyCalendar.months[month];
  }

  getDates() {
    const dates: number[] = [];
    for (let i = 0; i <= this.startDay; i += 1)
      dates.push(this.startDate - (this.startDay - i));
    for (let i = 1; i <= this.endDate; i += 1) dates.push(i);
    for (let i = 0; this.endDay + i + 1 < 7; i += 1) dates.push(i + 1);

    return dates;
  }
}

export default MyCalendar;
