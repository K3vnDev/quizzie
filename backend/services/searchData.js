export const search = (query, data, matchPercentage = 0.5) => {
  const queryLwr = query.toLowerCase()

  const matchedItems = []

  // Extract chunks of 2 characters from the query
  const queryChunks = extractChunks(queryLwr)

  for (const item of data) {
    const itemLwr = item.toLowerCase()

    // If the item is exactly the same as the query, add it to the matched items
    if (itemLwr === queryLwr) {
      matchedItems.push({ order: 1, item })
      continue
    }

    // If the item starts with the query, add it to the matched items
    if (itemLwr.startsWith(queryLwr)) {
      matchedItems.push({ order: 1.5, item })
      continue
    }

    // If the item contains the query, add it to the matched items
    if (itemLwr.includes(queryLwr)) {
      matchedItems.push({ order: 2, item })
      continue
    }

    const itemChunks = extractChunks(itemLwr)
    let itemMatchCount = 0

    // For each query chunk, check if it exists in the item chunks and count the number of matches
    for (const queryChunk of queryChunks) {
      if (itemChunks.includes(queryChunk)) itemMatchCount++
    }

    // Calculate the match value as a percentage of the number of query chunks that exist in the item chunks
    const itemMatchValue = itemMatchCount / queryChunks.length
    if (itemMatchValue < 1 - matchPercentage) continue

    // If at least 50% of the query chunks exist in the item chunks, add the item to the matched items
    matchedItems.push({ order: 4 - itemMatchValue, item })
  }

  return matchedItems.sort((a, b) => a.order - b.order)
}

// Separate query into chunks of 2 characters
const extractChunks = query => {
  const queryLwr = query.toLowerCase()
  if (queryLwr.length < 2) return [queryLwr]

  const chunks = []
  for (let i = 0; i < queryLwr.length - 1; i++) {
    chunks.push(queryLwr.slice(i, i + 2))
  }

  return chunks
}
