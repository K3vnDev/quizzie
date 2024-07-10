export const validateInput = ({ prevInput, newInput, maxLength }) => {
  newInput = newInput.trimStart()
  if (newInput.length > maxLength && newInput.length >= prevInput.length) return prevInput

  for (let i = 0; i < newInput.length; i++) {
    const currentChar = newInput.charAt(i)
    const prevChar = newInput.charAt(i - 1)

    if (currentChar === ' ' && prevChar === ' ') {
      newInput = newInput.slice(0, i) + newInput.slice(i + 1, newInput.length)
      return newInput
    }
  }
  return newInput
}
