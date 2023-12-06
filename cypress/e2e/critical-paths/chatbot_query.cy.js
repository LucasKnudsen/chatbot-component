describe('Chatbot Test', () => {
  it('should send a question to the chatbot and verify the API and visual response', () => {
    const question = 'Tell me very very shortly about Soft Design'
    const expectedResponseInclude = 'Soft Design'

    // Visit the page
    cy.visit('/')

    // Click the chatbot button
    cy.get('[data-testid="bubble-button"]').click()

    // Type the question in the input field
    cy.get('[data-testid="question-input"]').type(question)

    // Click the submit button
    cy.get('[data-testid="submit-question"]').click()

    // Verify the API response
    cy.intercept('POST', '**/flowise/middleware').as('apiRequest')

    // Wait for the intercept
    // Verify the API response
    cy.wait('@apiRequest').should(({ request, response }) => {
      expect(request.body.question).to.include(question)
      expect(request.body.socketIOClientId).to.exist
      expect(request.body.chatId).to.exist
      expect(request.body.channelId).to.exist
      expect(request.body.promptCode).to.include('question')

      expect(response.body.text).to.include(expectedResponseInclude)
    })

    // Verify the visual response
    cy.get('[data-testid="chatbot-answer"]')
      .children()
      .first()
      .should('contain', expectedResponseInclude)
  })
})
