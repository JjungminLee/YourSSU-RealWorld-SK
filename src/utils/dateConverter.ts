export const dateConverter = (dateInput: string) => {
  const dateTime = dateInput.split('T')

  if (dateInput === '') {
    return ''
  }

  return dateTime.join(' ')
}
