import PropTypes from "prop-types";
import styled from "styled-components";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { momentLocalizer } from "react-big-calendar";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";

const StyledCalendar = styled(Calendar)`
  &.rbc-calendar {
    min-height: 85vh;
    width: ${m.col12};
    margin: ${m.sp4} 0 0;
    .rbc-toolbar-label {
      font-size: ${m.sp7};
      font-weight: 600;
      color: ${c.gray2};
    }
    .rbc-time-view {
      border-top: none;
      margin: ${m.sp4} ${m.sp4} 0;
    }
    .rbc-time-content {
      border-bottom: none;
    }
    .rbc-btn-group {
      border-radius: ${s.borderRadius};
      outline: none;
      button {
        color: ${c.primary2};
        cursor: pointer;
        border: 1px solid transparent;
        background-color: ${c.primary9};
        box-shadow: none;
        height: ${m.sp8};
        outline: none;
        &.rbc-active,
        :focus,
        :hover {
          background: ${c.primary8};
          border: 1px solid ${c.primary8};
        }
      }
    }
    .rbc-event {
      border-radius: 0;
      border: 1px solid ${c.primary6};
      background-color: ${c.primary6};
      color: ${c.primary9};
    }
    .rbc-header,
    .rbc-month-view,
    .rbc-time-header-content,
    .rbc-time-header-gutter {
      border: none;
    }
    .rbc-month-row,
    .rbc-day-bg {
      border: none;
      border-radius: ${s.borderRadius};
    }
    .rbc-event-label,
    .rbc-allday-cell {
      display: none;
    }
    .rbc-date-cell {
      text-align: center;
      padding: 0;
    }
    .rbc-time-slot {
      border-top: none;
    }
    .rbc-off-range-bg {
      background-color: ${c.primary9};
    }
    .rbc-toolbar {
      padding: ${m.sp5} ${m.sp7};
    }
    .rbc-month-header {
      border-bottom: 1px solid ${c.primary8};
      padding-bottom: ${m.sp3};
      margin-bottom: ${m.sp5};
    }
  }
`;

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function MyCalendar(props) {
  return (
    <StyledCalendar
      {...props}
      localizer={localizer}
      defaultDate={moment().toDate()}
      step={30}
      showMultiDayTimes
      components={{
        event: props.event
      }}
    />
  );
}
