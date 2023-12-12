describe('Chatbot Test', () => {
  beforeEach(() => {
    cy.visit('/')

    cy.wait(3000)
  })

  it('should send a question to the chatbot and verify the API and visual response', () => {
    const question = 'Tell me about Soft Design in 20 words or less'
    const expectedResponseInclude = 'Soft Design'

    // Type the question in the input field
    cy.get('[data-testid="question-input"]').type(question)

    // Click the submit button
    cy.get('[data-testid="submit-question"]').click()

    // Verify the API response
    cy.intercept('POST', '**/flowise/middleware').as('apiRequest')

    // Verify the API request
    cy.get('@apiRequest').should(({ request }) => {
      expect(request.body.question).to.include(question)
      expect(request.body.chatId).to.exist
      expect(request.body.channelId).to.exist
      expect(request.body.promptCode).to.include('question')
    })

    // Wait the request nontheless
    cy.wait('@apiRequest')

    // Verify the visual text
    cy.get('[data-testid="chatbot-answer"]')
      .children()
      .first()
      .should('contain', expectedResponseInclude)

    // Verify the resources
    cy.get('[data-testid="fact-resource"]').should('exist')
    cy.get('[data-testid="link-resource"]').should('exist')
  })

  it('should insert the question into the history tab', () => {
    // Stubs and awaits the first flowise/middleware request
    cy.intercept({
      method: 'POST',
      url: '**/flowise/middleware',
    }).as('question1Request')

    // Type the question in the input field
    cy.get('[data-testid="question-input"]').type('Test 1. Answer me with "PING"')

    // Click the submit button
    cy.get('[data-testid="submit-question"]').click()

    cy.wait('@question1Request')

    // Type the question in the input field
    cy.get('[data-testid="question-input"]').type('Test 2. Answer me with "PONG"')

    // Stubs and awaits the second flowise/middleware request
    cy.intercept({
      method: 'POST',
      url: '**/flowise/middleware',
      times: 1,
    }).as('question2Request')

    // Click the submit button
    cy.get('[data-testid="submit-question"]').click()

    cy.wait('@question2Request')

    cy.get('[data-testid="drawer-button"]').click({ force: true })

    // Assert that the history tab contains two items
    cy.get('[data-testid="history-list-item"]').should('have.length', 2)

    // Verify the second text
    cy.get('[data-testid="chatbot-question"]').should('contain', 'PONG')

    cy.get('[data-testid="history-list-item"]').eq(1).click()

    // Verify the first text
    cy.get('[data-testid="chatbot-question"]').should('contain', 'PING')

    cy.get('[data-testid="history-list-item"]').eq(0).click()

    // Verify the second text again
    cy.get('[data-testid="chatbot-question"]').should('contain', 'PONG')
  })
})
