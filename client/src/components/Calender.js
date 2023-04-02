import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { format, addMonths, subMonths } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays, parseISO } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal.js";
import { setModalOpen, setDiaryKey, setOpen } from "../store/store.js";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Stack from "@mui/material/Stack";

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className="header row">
      <Stack direction="row" spacing={1}>
        <span className="text">
          <span className="text month">{format(currentMonth, "M")}월</span>
          {format(currentMonth, "yyyy")}
        </span>
        <div className="col col-end">
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            onClick={prevMonth}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            onClick={nextMonth}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
      </Stack>
    </div>
  );
};

const RenderDays = () => {
  const days = [];
  const date = ["일", "월", "화", "수", "목", "금", "토"];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col" key={i} style={{ backgroundColor: "#121212" }}>
        {date[i]}
      </div>
    );
  }

  return <div className="days row">{days}</div>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const { diaryData } = useSelector((state) => state);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;
      const diaryKey = format(cloneDay, "d");

      days.push(
        <div
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, selectedDate)
              ? "selected"
              : format(currentMonth, "M") !== format(day, "M")
              ? "not-valid"
              : "valid"
          }`}
          key={day}
          onClick={() => onDateClick(cloneDay, diaryKey)}
        >
          <span
            className={
              format(currentMonth, "M") !== format(day, "M")
                ? "text not-valid"
                : ""
            }
          >
            {formattedDate}
          </span>
          {diaryData.map((data, index) => {
            const resultDate = new Date(data.date);
            const result = format(resultDate, "yyyy-MM-dd");

            if (result == format(cloneDay, "yyyy-MM-dd")) {
              return (
                <span className="one-write" key={data.idx}>
                  {data.one_write}
                </span>
              );
            }
          })}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className="body">{rows}</div>;
};

export const Calender = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { modalOpen, diaryKey, open } = useSelector((state) => state);
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(setModalOpen(true));
  };
  const closeModal = () => {
    dispatch(setModalOpen(false));
  };
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day, diaryKey) => {
    setSelectedDate(day);
    dispatch(setDiaryKey(diaryKey));
    openModal();
  };

  return (
    <div className="calendar main-box">
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <RenderDays />
      <RenderCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
      />
      <Modal
        opens={modalOpen}
        close={closeModal}
        header="한줄 메모장"
        selectedDate={selectedDate}
      ></Modal>
    </div>
  );
};
