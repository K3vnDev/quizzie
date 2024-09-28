const colors = [
  '#598a15', // light green
  '#24a17d', // aqua green
  '#0f808a', // aqua blue
  '#0f3c8a', // dark blue
  '#5414af', // purple
  '#b517ab', // pink
  '#af154b', // red
  '#b05625' // orange
]

export function generateQuizColor(userQuizzes) {
  const randomIndex = Math.floor(Math.random() * colors.length)
  const randomColor = colors[randomIndex]

  const lastColors = userQuizzes.slice(1 - Math.floor(colors.length / 1.5))

  return lastColors.some(quiz => quiz.previewColor === randomColor)
    ? generateQuizColor(userQuizzes)
    : randomColor
}
