import Calendar from "~components/Calendar"

import classes from "./index.module.css"

export default function Index() {
  return (
    <div className={classes.container}>
      <div className={classes.calendarWrapper}>
        <Calendar />
      </div>
    </div>
  )
}
