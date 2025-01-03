import dayjs, { Dayjs } from "dayjs"
import { CircleChevronLeft, CircleChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

import styles from "./Calendar.module.css"
import { HOLIDAYS } from "./constants"

interface MonthCalendarProps {
  date: Dayjs
  currentDate: Dayjs
  headerClassName?: string
}

function MonthCalendar({
  date,
  currentDate,
  headerClassName
}: MonthCalendarProps) {
  const daysInMonth = date.daysInMonth()
  const firstDay = date.startOf("month")
  const startOffset = firstDay.day()

  const days: (Dayjs | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => firstDay.add(i, "day"))
  ]

  const isHoliday = (date: Dayjs | null) => {
    if (!date) return null
    const dateStr = date.format("YYYY-MM-DD")
    return HOLIDAYS[dateStr]
  }

  const isToday = (date: Dayjs | null) => {
    if (!date) return false
    return date?.format("YYYY-MM-DD") === currentDate.format("YYYY-MM-DD")
  }

  const isWeekend = (date: Dayjs | null) => {
    if (!date) return false
    const day = date.day()
    return day === 0 || day === 6 // 0 是周日，6 是周六
  }

  const renderDay = (date: Dayjs | null) => {
    const holiday = isHoliday(date)
    return (
      <div
        className={`${styles.day} ${isToday(date) ? styles.today : ""} ${isWeekend(date) ? styles.weekend : ""} ${holiday ? styles.holiday : ""}`}
        title={holiday?.name}>
        {date?.date()}
      </div>
    )
  }

  return (
    <div className={styles.monthContainer}>
      <div className={`${styles.monthTitle} ${headerClassName}`}>
        {date.format("MMMM YYYY")}
      </div>
      <div className={styles.calendar}>
        {days.map((day, i) => renderDay(day))}
      </div>
    </div>
  )
}

export default function Calendar() {
  const [monthOffset, setMonthOffset] = useState(0)

  const handlePrevMonth = () => {
    setMonthOffset((prev) => prev - 1)
  }

  const handleNextMonth = () => {
    setMonthOffset((prev) => prev + 1)
  }

  const handleToday = () => {
    setMonthOffset(0)
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp":
        handlePrevMonth()
        break
      case "ArrowRight":
      case "ArrowDown":
        handleNextMonth()
        break
      case " ": // Space key
        event.preventDefault() // Prevent page scroll
        handleToday()
        break
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const currentDate = new Date()
  const firstMonth = new Date(
    currentDate.setMonth(currentDate.getMonth() + monthOffset)
  )
  const secondMonth = new Date(currentDate.setMonth(currentDate.getMonth() + 1))

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <button onClick={handlePrevMonth} className={styles.navButton}>
          <CircleChevronLeft />
        </button>
        <button onClick={handleToday} className={styles.todayButton}>
          Today
        </button>
        <button onClick={handleNextMonth} className={styles.navButton}>
          <CircleChevronRight />
        </button>
      </div>
      <div className={styles.monthsContainer}>
        <MonthCalendar date={dayjs(firstMonth)} currentDate={dayjs()} />
        <MonthCalendar
          date={dayjs(secondMonth)}
          currentDate={dayjs()}
          headerClassName={styles.secondMonthHeader}
        />
      </div>
    </div>
  )
}
