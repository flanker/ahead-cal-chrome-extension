import dayjs, { Dayjs } from "dayjs"
import { CircleChevronLeft, CircleChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

import styles from "./Calendar.module.css"
import { HOLIDAYS, WORKDAYS } from "./constants"

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

  const isToday = (date: Dayjs | null) => {
    if (!date) return false
    return date?.format("YYYY-MM-DD") === currentDate.format("YYYY-MM-DD")
  }

  const isWeekend = (date: Dayjs | null) => {
    if (!date) return false
    const dateStr = date.format("YYYY-MM-DD")
    if (WORKDAYS[dateStr]) return false
    const day = date.day()
    return day === 0 || day === 6
  }

  const renderDay = (date: Dayjs | null, index: number) => {
    if (!date) return <div key={index} className={styles.day}></div>
    const dateStr = date.format("YYYY-MM-DD")
    const holiday = HOLIDAYS[dateStr]
    const workday = WORKDAYS[dateStr]

    return (
      <div
        key={index}
        className={`${styles.day} ${isToday(date) ? styles.today : ""} ${isWeekend(date) ? styles.weekend : ""} ${holiday ? styles.holiday : ""} ${workday ? styles.workday : ""}`}
        title={holiday?.name || workday?.name}>
        {date.date()}
      </div>
    )
  }

  return (
    <div className={styles.monthContainer}>
      <div className={`${styles.monthTitle} ${headerClassName}`}>
        {date.format("MMM YYYY")}
      </div>
      <div className={styles.calendar}>
        {days.map((day, i) => renderDay(day, i))}
      </div>
    </div>
  )
}

export default function Calendar() {
  const [months, setMonths] = useState(() => [0, 1, 2, 3])
  const [scrollAccumulator, setScrollAccumulator] = useState(0)

  const handlePrevMonth = () => {
    setMonths((prev) => {
      return prev.map((month) => month - 1)
    })
  }

  const handleNextMonth = () => {
    setMonths((prev) => {
      return prev.map((month) => month + 1)
    })
  }

  const handleToday = () => {
    setMonths([0, 1, 2, 3])
  }

  const handleScroll = (event: WheelEvent) => {
    event.preventDefault()

    const newAccumulator = scrollAccumulator + event.deltaY
    setScrollAccumulator(newAccumulator)

    const threshold = 100

    if (Math.abs(newAccumulator) >= threshold) {
      if (newAccumulator < 0) {
        handlePrevMonth()
      } else {
        handleNextMonth()
      }
      setScrollAccumulator(0)
    } else {
      setScrollAccumulator(newAccumulator)
    }
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
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      handleScroll(e)
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("wheel", handleWheel)
    }
  }, [scrollAccumulator])

  const baseDate = new Date()

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
        {months.map((offset) => {
          const monthDate = new Date(
            baseDate.getFullYear(),
            baseDate.getMonth() + offset
          )
          return (
            <MonthCalendar
              key={offset}
              date={dayjs(monthDate)}
              currentDate={dayjs()}
              headerClassName={
                offset !== months[0] ? styles.secondMonthHeader : undefined
              }
            />
          )
        })}
      </div>
    </div>
  )
}
