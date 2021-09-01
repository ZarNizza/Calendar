import React from "react";

export function CalendarTable(props) {
  const activeDate = props.activeDate;
  const setActiveDate = props.setActiveDate;
  let monthsString = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  function generateMatrix() {
    let weekDaysShort = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

    let year = activeDate.getFullYear();
    let month = activeDate.getMonth();
    let firstDay = new Date(year, month, 1).getDay();
    let daysInMonth = () => {
      // magic formula! ))
      if (isNaN(year) || isNaN(month)) {
        return NaN;
      }
      let modMonth = month % 12;
      year += (month - modMonth) / 12;
      return modMonth === 1
        ? (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
          ? 29
          : 28
        : 31 - ((modMonth % 7) % 2);
    };

    let matrix = [];
    matrix[0] = weekDaysShort;

    let counter = 1;
    for (var row = 1; row < 7; row++) {
      matrix[row] = [];
      for (var col = 0; col < 7; col++) {
        matrix[row][col] = "--";
        if (row === 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= daysInMonth()) {
          // Fill in rows only if the counter’s not greater than the number of days in the month
          matrix[row][col] = counter++;
        }
      }
    }
    return matrix;
  }

  function setActiveTD(aDay) {
    if (isFinite(aDay)) {
      let year = activeDate.getFullYear();
      let month = activeDate.getMonth();
      let newActiveDate = new Date(+year, +month, +aDay);
      setActiveDate(newActiveDate);

      document.getElementById("inputString").focus();
    }
  }

  let matrix = generateMatrix();

  let rows = [];
  rows = matrix.map((row, rowIndex) => {
    let rowItems = row.map((item, colIndex) => {
      return (
        <td
          style={{
            flex: 1,
            height: 18,
            textAlign: "center",
            backgroundColor: rowIndex === 0 ? "#AAF" : "", // highlight Header
            color: colIndex === 0 ? "#FF2D00" : "", // highlight Sundays
            fontWeight: item === activeDate.getDate() ? "bold" : "normal", // highlight CurrentDate
          }}
          key={rowIndex.toString() + colIndex.toString()}
        >
          <button
            onClick={() => setActiveTD(item)}
            style={{
              backgroundColor: rowIndex === 0 ? "#AAF" : "", // highlight Header
              color: colIndex === 0 ? "#FF2D00" : "", // highlight Sundays
              fontWeight: item === activeDate.getDate() ? "bold" : "normal", // highlight CurrentDate
            }}
          >
            {item === "--" ? "" : item}
          </button>
        </td>
      );
    });
    
    return (
      <tr
        style={{
          flex: 1,
          flexDirection: "row",
          padding: 15,
          justifyContent: "space-around",
          alignItems: "center",
        }}
        key={rowIndex.toString()}
      >
        {rowItems}
      </tr>
    );
  });
  let rowFirst = rows.shift();

  return (
    <div>
      <div id="editArea"></div>
      <table>
        <caption>
          {monthsString[activeDate.getMonth()]} &nbsp;{" "}
          {activeDate.getFullYear()}
        </caption>
        <thead>{rowFirst}</thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
