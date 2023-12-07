describe('Translation', () => {
  beforeEach(() => {
    // Visit the page
    cy.visit('/')

    // Click the chatbot button
    cy.get('[data-testid="bubble-button"]').click()

    cy.wait(3000)

    cy.intercept(
      {
        method: 'POST',
        url: '**/flowise/middleware',
        times: 1,
      },
      {
        fixture: 'chatbot_answer.json',
      }
    ).as('question1Request')

    cy.get('[data-testid="question-input"]').type('Det her er en dansk besked?')
    cy.get('[data-testid="submit-question"]').click()
  })

  it('should intercept detect-language path and expect language code to be "da"', () => {
    cy.intercept({ method: 'POST', url: '*/detect-language' }).as('detectLanguage')

    cy.wait('@detectLanguage').then(({ response, request }) => {
      expect(request.body).to.equal('Det her er en dansk besked?')

      expect(response.statusCode).to.equal(200)
      expect(response.body.languageCode).to.equal('da')
    })
  })

  it('should include the "da" languageCode in the flowise/middleware request', () => {
    // Spies on the second flowise/middleware request
    cy.intercept('POST', '**/flowise/middleware', {
      body: {
        text: ['Just a test prompt', 'Just another test prompt'],
      },
    }).as('suggestionsRequest')

    // Stubs the detect-language request
    cy.intercept(
      { method: 'POST', url: '*/detect-language' },
      {
        statusCode: 200,
        body: {
          languageCode: 'da',
        },
      }
    ).as('detectLanguage')

    cy.wait('@suggestionsRequest').should(({ request }) => {
      // Include the language code in the request
      expect(request.body.language).to.equal('da')
    })
  })

  it('Should translate the 4 facts', () => {
    let interceptCount = 0
    cy.intercept('POST', 'https://translate.ap-southeast-1.amazonaws.com/', (req) => {
      // Intercept the request and increment the count
      interceptCount += 1
      req.continue()
    }).as('translate')

    cy.wait('@translate').then(({ request, response }) => {
      expect(request.body.SourceLanguageCode).to.equal('en')
      expect(request.body.TargetLanguageCode).to.equal('da')
    })

    cy.wait(500).then(() => {
      expect(interceptCount).to.equal(4)
    })
  })
})
