describe('Suggested Prompts', () => {
  it('should send a query to the middleware and verify the API and visual response', () => {
    const chatbotQuestion = 'In only 10 words, tell me about Anders'

    cy.intercept({ method: 'POST', url: '**/flowise/middleware' }).as('middlewareRequest')

    cy.visit('/')

    // Type the question in the input field
    cy.get('[data-testid="question-input"]').type(chatbotQuestion)

    // Click the submit button
    cy.get('[data-testid="submit-question"]').click()

    // Await the first request
    cy.wait('@middlewareRequest')

    // Await the second request and verify the prompt suggestions
    cy.wait('@middlewareRequest').should(({ request, response }) => {
      expect(request.body.previousQuestions).to.include(chatbotQuestion)
      expect(request.body.promptCode).to.include('suggestedPrompts')

      expect(response.body.text).to.be.an('array').with.lengthOf(2)
    })

    // Verify that the suggested prompts are rendered
    cy.get('[data-testid="suggested-prompt"]').should('have.length', 2)
  })
})
