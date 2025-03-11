import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./style.scss";

export default function CalendarDate({ calendarDate, onChangeDate }) {
  const today = new Date();
  return (
    <div className="searchbox-pod searchbox-content-block">
      <div className="searchbox-content-block-title">
        When would you like to ship?
      </div>
      <Calendar
        formatShortWeekday={(locale, date) =>
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][date.getDay()]
        }
        calendarType="hebrew"
        value={calendarDate}
        onChange={onChangeDate}
        minDate={today}
      />
    </div>
  );
}
