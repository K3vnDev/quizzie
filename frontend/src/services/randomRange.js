export const randomRange = (minInclusive, maxExclusive, whole = true) => {
  const diff = maxExclusive - minInclusive
  let random = Math.random() * diff + minInclusive
  if (whole) random = Math.floor(random)
  return random
}
