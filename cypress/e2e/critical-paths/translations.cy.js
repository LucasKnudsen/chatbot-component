let storageCache

describe('Translation', () => {
  beforeEach(() => {
    // Visit the page
    cy.visit('/', {
      onBeforeLoad(win) {
        Object.entries(storageCache).forEach(([k, v]) => {
          win.localStorage.setItem(k, v)
        })
      },
    })

    cy.wait(3000)

    cy.get('[data-testid="question-input"]').type('Det her er en dansk besked?')
    cy.get('[data-testid="submit-question"]').click()
  })

  it('should intercept detect-language path and expect language code to be "da"', () => {
    cy.intercept(
      { method: 'POST', url: '**/flowise/middleware' },
      { fixture: 'chatbot_answer.json' }
    )

    cy.intercept({ method: 'POST', url: '*/detect-language' }).as('detectLanguage')

    cy.wait('@detectLanguage').then(({ response, request }) => {
      expect(request.body).to.equal('Det her er en dansk besked?')

      expect(response.statusCode).to.equal(200)
      expect(response.body.languageCode).to.equal('da')
    })
  })

  it.only('should include the "da" languageCode in the flowise/middleware request and translate Facts from en to da', () => {
    cy.intercept({ method: 'POST', url: '**/flowise/middleware' }).as('flowise')
    // Stubs the detect-language request
    cy.intercept(
      { method: 'POST', url: '*/detect-language' },
      { statusCode: 200, body: { languageCode: 'da' } }
    ).as('detectLanguage')
    // Spies on the translate request
    cy.intercept('POST', 'https://translate.ap-southeast-1.amazonaws.com/').as('translate')

    cy.wait('@flowise')

    // Second request to flowise, being the prompt suggestions
    cy.wait('@flowise').should(({ request }) => {
      // Include the language code in the request
      expect(request.body.language).to.equal('da')
    })

    cy.wait('@translate').then(({ request, response }) => {
      expect(request.body.SourceLanguageCode).to.equal('en')
      expect(request.body.TargetLanguageCode).to.equal('da')
    })
  })
})
