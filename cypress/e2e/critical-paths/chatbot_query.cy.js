describe('Chatbot Test', () => {
  it('should send a question to the chatbot and verify the API and visual response', () => {
    const question = 'Hi there! What can you do for me today?'
    const expectedResponseInclude = 'Soft Design'

    // Visit the page
    cy.visit('/')

    // Type the question in the input field
    cy.get('[data-testid="question-input"]').type(question)

    // Click the submit button
    cy.get('[data-testid="submit-question"]').click()

    // Verify the API response
    cy.intercept('POST', '**/flowise/middleware').as('apiRequest')

    // Wait for the intercept
    cy.wait('@apiRequest').should(({ request, response }) => {
      expect(request.body.question).to.include(question)
      expect(response.body.text).include(expectedResponseInclude)
    })

    // Verify the visual response
    cy.get('[data-testid="chatbot-answer"]')
      .children()
      .first()
      .should('contain', expectedResponseInclude)
  })
})
