describe('Suggested Prompts', () => {
  it('should send a query to the middleware and verify the API and visual response', () => {
    const question = 'How can I buy this chatbot?'

    // Visit the page
    cy.visit('/')

    // Type the question in the input field
    cy.get('[data-testid="question-input"]').type(question)

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
      expect(request.body.previousQuestions).to.include(question)

      expect(response.body.text).to.include('chatbot')
    })

    // Verify that the suggested prompts are rendered
    cy.get('[data-testid="suggested-prompt"]').should('have.length', 2)
  })
})
