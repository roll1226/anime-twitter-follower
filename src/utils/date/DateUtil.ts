class DateUtil {
  public static getDateString(day: Date) {
    const year = day.getFullYear();
    const month = day.getMonth() + 1;
    const date = day.getDate();
    const hours = String(day.getHours());
    const minutes = String(day.getMinutes());

    return `${year}年${month}月${date}日 ${
      hours.length < 2 ? "0" + hours : hours
    }:${minutes.length < 2 ? "0" + minutes : minutes}`;
  }
}

export default DateUtil;
