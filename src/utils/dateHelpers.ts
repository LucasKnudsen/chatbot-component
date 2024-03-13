export const todayStartOfDay = () => {
  const date = new Date()

  date.setHours(0, 0, 0, 0)

  return date
}

export const yesterdayStartOfDay = () => {
  const date = new Date()

  date.setHours(0, 0, 0, 0)
  date.setDate(todayStartOfDay().getDate() - 1)

  return date
}
