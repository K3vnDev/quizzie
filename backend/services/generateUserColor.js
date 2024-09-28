const colors = [
  '#ee4035',
  '#f37736',
  '#36abb5',
  '#850F8D',
  '#365E32',
  '#81A263',
  '#005C78',
  '#E49BFF'
]

export function generateUserColor() {
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}
