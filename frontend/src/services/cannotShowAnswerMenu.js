export const onCannotShowAnswerMenu = 'editmodeexitfromenterkey'

export const dispatchOnCannotShowAnswerMenu = () => {
  const event = new Event(onCannotShowAnswerMenu)
  document.dispatchEvent(event)
}
