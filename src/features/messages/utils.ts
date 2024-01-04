export const extractChatbotResponse = (response: any) => {
  let text = ''

  if (response.text) text = response.text
  else if (response.json) text = JSON.stringify(response.json, null, 2)
  else text = JSON.stringify(response, null, 2)

  return text
}
