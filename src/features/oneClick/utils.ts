export function cleanContentForSpeech(content: string): string {
  // Removing markdown headers and other unwanted characters
  let cleanedContent = content.replace(/[#_*~`>+\=\[\]\(\)]/g, '').replace(/\n/g, ' ')

  // Removing URLs
  cleanedContent = cleanedContent.replace(/https?:\/\/[^\s]+/g, '')

  return cleanedContent
}
