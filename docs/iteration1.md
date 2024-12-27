# Decisions

In this section follows descriptions of the choices we have made while developing "RealStore", for different aspects of the project.

## REST-API and data fetching

The project fetches data from the fakeStore API. Documentation for the API can be found here: https://fakestoreapi.com/docs. The fakeStoreAPI was chosen as it is well documented, and contained 30 items that could be seperated by category, which was just what we needed inorder to be able to cover all functional requirements.

We chose TanStack Query for fetching data from the API because of its ability to efficiently manage server-state with features like caching, auto-refetching, and built-in error handling, which improve data synchronization and overall application performance. TanStack Query automatically caches API responses, reducing redundant network requests, and ensures data is always up-to-date through its auto-refetching feature. Built-in error handling simplifies managing failed requests, while background fetching helps maintain a responsive user interface. This tool streamlines data synchronization and improves overall application performance, making it a good choice for handling API data in React projects.

## Testing

The project contains tests for testing some basic user interaction, checking correct state, snapshot tests, as well as checking for correct rendering. The tests are written using Vitest, as well as the React testing library and jest-dom.

The components that are being tested are ActionBox, as this contains functionalities for adding items to cart, Navbar, as the navbar needs to contain links for other pages and Favorite, as it handles both API-calls and storage handling.

ActionBox.test.tsx contains tests for using some default props, testing rendering with different props and the user interaction of adding a product to cart. In order to not actually store any data, the addToCart functions has been mocked using vi.mock. ActionBox.test.tsx also contains tests that checks rendering of desktop version and mobile version.

Navbar.test.tsx contains a snapshot test as well as a test that checks that the Navbar has been rendered correctly.

Favorite.test.tsx mocks the functions for storing and manipulating favorites, to test for rendering, both when successfull and unsuccessful, and makes sure the items that are marked favorite, are actually visible on the page.

There would preferably be more tests, but as the team lacked both the skill set for creating tests for React, and time, we had to settle for basic tests in this iteration. Fortunately we have tests that have tested each requirement.

## Usage of Tanstack query

We chose to use TanStack Query to minimize unnecessary API calls, as it allows us to fetch data from the server just once and efficiently manage it with caching.

## Usage of Dev

We decided to implement a "Dev" stage to ensure a stable production environment. This helps prevent pushing incomplete products to the main branch. By only merging into main when the entire product is finished, we maintain a cleaner codebase and reduce the risk of introducing bugs or unfinished features into the live version.

## Storage handling

The project uses the HTML Web Storage API, both local storage and session storage, for storing data.

In local storage, the ids of the items that the user has marked as favorites, are stored. Since we want to save this information, even when the page is refrefreshed, they have to be stored in local storage, and not session storage.

In session storage the filters the user has selected (if any), and the ids of cart items are stored. The stored ids or filters are then used to fetch from the API, and present the user with the correct products.

No actual products are stored in storage, just the ids, such that there is no mismatch between what is fetched from the API and what is stored in storage.

## CSS modules

For this project we chose to use CSS Modules instead of regular CSS because they make it easier to manage each component's styles and keep the code more organized.

## Design

We chose a simple and straightforward design with focus on functionality. Our goal was to create an app that's intuitive and easy to navigate. Despite its simplicity, the design remains aesthetically appealing and visually engaging.

## Technicalities

-   It's only possible to add one of each product to cart.

-   On the product page (accessed by clicking a product from the shopping page), you can only add the product to the cart, but there's no option to remove it by clicking the same button.

-   In the mobile view of the product page, adding a product to the cart makes the description section extend longer than necessary.

-   When a product is added to the cart, the button text changes to "Already in cart," which can be confusing and might imply the product was in the cart before clicking, even though it wasn’t.

-   When a product is unfavorited on the favorite page or removed from the cart page, then website refreshes to reflect the updated state. We applied the same approach for the checkout process on the cart page.

-   Give all HTML attributes either a class, id or aria-label so that it is easily mentioned when testing. This would also strengthen the criteria of good HTML according to availability criterias.

-   Use linting more thouroughly while development, so it does not become a huge task in the end of the iteration.

-   Spend more time on tests, and make tests as you go, instead of all in the end.

-   Start with covering all criterias, and then add more functionality if there is time. We ended up spending more time adding new functionality, which resultet in less time for tests for example.

## Decision of not inlcuding ratings

The "product" fetched from the API contain a rating field, as well as id, price, category, description and image. We originally planned to integrate the ratings into the application, which is why some functions allow a rating field. However due to lack of time, we decided to cut this functionality.

## Usage of AI

We used AI to transform our divs into more suitable elements. We also used it for improving our tests.
