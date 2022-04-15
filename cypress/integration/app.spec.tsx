/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

/**
 * Intent: Test app behavior, try to avoid testing implementation details
 */
describe('app', () => {

  const selectors = {
    LOAD_ANT_DATA: '[data-cy=load-ant-data]',
    ANT_WIN_CHANCE_STATE: '[data-cy=ant-win-chance-state]',
    START_CALCULATIONS: '[data-cy=start-calculations]'
  }

  describe('ant-race', () => {
    it('user must be able to tap a button that loads the ant data', () => {
      // stub network response, visit home page
      cy.intercept('GET', '/api/ants', { fixture: 'ant-data.json' }).as('loadAntData')
      cy.visit('http://localhost:3000/')

      // user taps (load data) button
      cy.get(selectors.LOAD_ANT_DATA).should('be.visible').and('be.enabled')
      cy.get(selectors.LOAD_ANT_DATA).click()

      // network request to load data should be made
      cy.wait('@loadAntData').its('response').should('exist')

      cy.get(selectors.START_CALCULATIONS).should('be.visible').and('be.enabled')

    })
  })

  describe('when data has been fetched', () => {
    it('when data has been fetched, ui must reflect the state of each ant\'s win likelihood calculation (not yet run, in progress, calculated, etc.).', () => {
      // stub network response, visit home page
      cy.intercept('GET', '/api/ants', { fixture: 'ant-data.json' }).as('loadAntData')
      cy.visit('http://localhost:3000/')

      // when data has been fetched
      cy.get(selectors.LOAD_ANT_DATA).should('be.visible').and('be.enabled')
      cy.get(selectors.LOAD_ANT_DATA).click()
      cy.wait('@loadAntData').its('response').should('exist')

      // before starting calculations
      cy.get(selectors.START_CALCULATIONS).should('be.visible').and('be.enabled')
      cy.get(selectors.ANT_WIN_CHANCE_STATE).each(el => { expect(el).to.have.text('Not yet run') })

      // immediately following starting, (calculations on all ants should run simultaneously is an of this behavior implementation detail)
      cy.get(selectors.START_CALCULATIONS).click()
      cy.get(selectors.ANT_WIN_CHANCE_STATE).each(el => { expect(el).to.have.text('in progress') })

      cy.get(selectors.ANT_WIN_CHANCE_STATE).each(el => { expect(el).to.have.text('calculated') })
    })
  })
})

// this export is intentional, please see:
//   https://www.typescriptlang.org/tsconfig#isolatedModules
//   https://stackoverflow.com/questions/56577201/why-is-isolatedmodules-error-fixed-by-any-import
export { }
