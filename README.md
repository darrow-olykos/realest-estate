# Next.js + Cypress + Ant Design Mobile Exemplar
Fork this repo to start any basic React web app.
See `package.json` for how to run and test the project.

### Cypress for System Behavior Testing
See the `integrations/` folder to see some behavioral tests.
This exemplar shows how to test system behavior without coupling to the React.js framework. ( https://docs.cypress.io/guides/references/best-practices )

The goal is to keep Cypress ignorant that the web app implements anything other than vanilla JavaScript and HTML. We may continue to verify system behavior even if implementation (including chosen js frameworks) changes over time. (This also lets you reuse written tests for other web apps).

### Ant Design Mobile (antd-mobile)
Just a UI component library I wanted to try. Previously, when I built web apps, I ran into some pains:

1) First, I would start desktop-first and then do large lifts to handle mobile use-cases.
2) I tended to use Ant Design UI Component library. However, I could only ever override global theming if I modified build tooling to load antd styles/components, significantly increased app bundle size, and re-configuring babel and Webpack through frameworks like Nextjs was a pain.
3) I did a lot of CSS-in-JavaScript to re-style antd components locally

I was about to move on to a UI component library for my next phase of projects, but then I came across Ant Design Mobile:
1) Components designed for mobile, though they still look in a desktop browser.
2) Can easily override global theming with CSS vars, and for SSR, it's trivial to configure for Next.js ( https://mobile.ant.design/guide/ssr )
3) Can easily do local antd-mobile component styling also with CSS vars ( https://mobile.ant.design/guide/css-variables )
