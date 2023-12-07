describe('Chatbot Test', () => {
  beforeEach(() => {
    // Visit the page
    cy.visit('/')

    // Click the chatbot button
    cy.get('[data-testid="bubble-button"]').click()

    cy.wait(3000)
  })

  it('should send a question to the chatbot and verify the API and visual response', () => {
    const question = 'Tell me very very shortly about Soft Design'
    const expectedResponseInclude = 'Soft Design'

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
      expect(request.body.chatId).to.exist
      expect(request.body.channelId).to.exist
      expect(request.body.promptCode).to.include('question')

      expect(response.body.text).to.include(expectedResponseInclude)
      expect(response.body.sourceDocuments).to.be.an('array').and.to.have.lengthOf(4)
    })

    // Verify the visual text
    cy.get('[data-testid="chatbot-answer"]')
      .children()
      .first()
      .should('contain', expectedResponseInclude)

    // Verify the resources
    cy.get('[data-testid="fact-resource"]').should('exist')
    cy.get('[data-testid="link-resource"]').should('exist')
    cy.get('[data-testid="picture-resource"]').should('exist')
    cy.get('[data-testid="iframe-resource"]').should('exist')
  })

  it('should insert the question into the history tab', () => {
    // Type the question in the input field
    cy.get('[data-testid="question-input"]').type('Test 1')

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
    ).as('question1Request')

    // Click the submit button
    cy.get('[data-testid="submit-question"]').click()

    cy.wait('@question1Request')

    // Type the question in the input field
    cy.get('[data-testid="question-input"]').type('Test 2')

    // Stubs and awaits the second flowise/middleware request
    cy.intercept(
      {
        method: 'POST',
        url: '**/flowise/middleware',
        times: 1,
      },
      {
        body: {
          text: 'The second test response',
        },
      }
    ).as('question2Request')

    // Click the submit button
    cy.get('[data-testid="submit-question"]').click()

    cy.wait('@question2Request')

    cy.get('[data-testid="drawer-button"]').click({ force: true })

    // Assert that the history tab contains two items
    cy.get('[data-testid="history-list-item"]').should('have.length', 2)

    // Verify the second text
    cy.get('[data-testid="chatbot-answer"]')
      .children()
      .first()
      .should('contain', 'The second test response')

    cy.get('[data-testid="history-list-item"]').eq(1).click()

    // Verify the first text
    cy.get('[data-testid="chatbot-answer"]')
      .children()
      .first()
      .should('contain', 'Just a test response')

    cy.get('[data-testid="history-list-item"]').eq(0).click()

    // Verify the second text again
    cy.get('[data-testid="chatbot-answer"]')
      .children()
      .first()
      .should('contain', 'The second test response')
  })
})
