/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

const antData = {
  ants: [
    { name: 'Marie ‘Ant’oinette', length: 12, color: 'BLACK', weight: 2 },
    { name: 'Flamin’ Pincers', length: 11, color: 'RED', weight: 2 },
    { name: 'AuNT Sarathi', length: 20, color: 'BLACK', weight: 5 },
    {
      name: 'The Unbeareable Lightness of Being',
      length: 5,
      color: 'SILVER',
      weight: 1,
    },
    { name: '‘The Duke’', length: 17, color: 'RED', weight: 3 },
  ],
}

describe('app', () => {
  describe('ant-race', () => {
    it('loads ant data when user clicks button', () => {
      // setup
      cy.intercept('GET', '/api/ant-data')
      cy.visit('http://localhost:3000/')
      cy.waitForReact(1000, '#root')

      // when user clicks on button to load ant data
      cy.get('[data-cy=load-ant-data]').click()

      // ant data should be loaded into local state
      cy.getReact('AntRace').getCurrentState()

      // TODO: first assertion
    })
  })
})

// this export is intentional, please see:
//   https://www.typescriptlang.org/tsconfig#isolatedModules
//   https://stackoverflow.com/questions/56577201/why-is-isolatedmodules-error-fixed-by-any-import
export { }
