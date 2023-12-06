describe('Suggested Prompts', () => {
  it('should send a query to the middleware and verify the API and visual response', () => {
    const chatbotQuestion = 'How can I buy this chatbot?'

    // Visit the page
    cy.visit('/')

    // Click the chatbot button
    cy.get('[data-testid="bubble-button"]').click()

    // Type the question in the input field
    cy.get('[data-testid="question-input"]').type(chatbotQuestion)

    // Click the submit button
    cy.get('[data-testid="submit-question"]').click()

    // Stubs and awaits the first flowise/middleware request
    cy.intercept(
      {
        method: 'POST',
        url: '**/flowise/middleware',
        times: 1,
      },
      {
        body: {
          text: 'Just a test response',
        },
      }
    ).as('questionRequest')

    cy.wait('@questionRequest')

    // Spies on the second flowise/middleware request
    cy.intercept('POST', '**/flowise/middleware').as('suggestionsRequest')

    cy.wait('@suggestionsRequest').should(({ request, response }) => {
      expect(request.body.previousQuestions).to.include(chatbotQuestion)
      expect(request.body.promptCode).to.include('suggestedPrompts')

      expect(response.body.text).to.be.an('array').with.lengthOf(2)
    })

    // Verify that the suggested prompts are rendered
    cy.get('[data-testid="suggested-prompt"]').should('have.length', 2)
  })
})
