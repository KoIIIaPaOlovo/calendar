import dayNames from "../additions/dayNames";

const dateFunctions = {
  countSumWithoutHolidays(startDate, endDate) {
    let endDateNumber = this.countDateNumber(endDate);
    let startDateNumber = this.countDateNumber(startDate);

    let sumWithoutHolidays =
      (endDateNumber - startDateNumber) / (1000 * 60 * 60 * 24) + 1;

    return sumWithoutHolidays;
  },

  countDateNumber(date) {
    return Date.parse(
      new Date(date.getFullYear(), date.getMonth(), date.getDate()),
    );
  },

  countDateFromString(dateString) {
    return new Date(
      dateString.slice(6, 10),
      +dateString.slice(3, 5) - 1,
      dateString.slice(0, 2),
    );
  },

  getLastDay(currentDate) {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  },

  getFirstDay(currentDate) {
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  },

  getDayFromNumber(currentDate, dayNumber) {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      dayNumber,
    );
  },

  countDateDifference(startDate, endDate, currentDate, days) {
    let endDateNumber = this.countDateNumber(endDate);
    let startDateNumber = this.countDateNumber(startDate);
    let sumWithoutHolidays = this.countSumWithoutHolidays(startDate, endDate);

    for (let index = 1; index <= days; index++) {
      let tempDate = this.getDayFromNumber(currentDate, index);
      if (
        Date.parse(tempDate) >= startDateNumber &&
        Date.parse(tempDate) <= endDateNumber
      ) {
        if (
          dayNames[tempDate.getDay()] === "Su" ||
          dayNames[tempDate.getDay()] === "St"
        ) {
          sumWithoutHolidays = sumWithoutHolidays - 1;
        }
      }
    }

    return sumWithoutHolidays >= 0 ? sumWithoutHolidays : 0;
  },

  sliceDate(duration, currentDate, position) {
    let date = position === "end" ? duration.slice(13) : duration.slice(0, 10);
    let dateNumber = Date.parse(this.countDateFromString(date));

    if (
      dateNumber < Date.parse(this.getFirstDay(currentDate)) &&
      position === "start"
    ) {
      return this.getFirstDay(currentDate);
    }
    if (dateNumber > this.getLastDay(currentDate) && position === "end") {
      return this.getLastDay(currentDate);
    }

    return this.countDateFromString(date);
  },

  countDays(date) {
    return 33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate();
  },
};

export default dateFunctions;
