[![Netlify Status](https://api.netlify.com/api/v1/badges/6cfa2b57-49b3-4440-9cbd-75bd297f30e0/deploy-status)](https://app.netlify.com/sites/pagey-revolut/deploys)

# Revolut Currency Exchange Widget

This is my submission for the Currency Exchange Widget challenge, you can see a live demo hosted
on [Netlify](https://pagey-revolut.netlify.app/).

### Useful Scripts

-   `yarn` - install dependencies
-   `yarn start` - run the app locally and go to [http://localhost:3000](http://localhost:3000) in a browser.
-   `yarn test` - runs the test suite
-   `yarn build` - builds the app for production to the `/build` folder

### Developer Notes

I made the assumption that the reference to "pockets" in the brief are essentially "accounts" or "wallets".
I also elected to not use Redux as I thought that the state wasn't complicated enough to justify the boilerplate
that Redux brings, especially when combined with TypeScript. I feel that the `useContext` hook is a clean solution
to small global state management.

There are 2 functions in the repo that not particularly DRY - the input `onChange` handlers. With more time, I would
find a cleaner solution.

In my utility function `getValueFromRates`, it was specifically built for the main 3 currencies. However, with a refactor,
the logic could be applied to take any currencies that are all relative to a base currency.
