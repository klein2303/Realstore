This repository contains one of two projects from the subject IT2810 Web Development at NTNU. The course covers technologies and methods used in development of web-applications. Through the projects, we leared about architectures, languages, formats and standards for web-applications and how real-life projects at companies can be developed. I made this project together with three other students.

The other project can be found here: https://github.com/klein2303/World-Explore

## Table of content:

- About the project
- Running the project
- Running tests
- Running eslint

## About the project

Welcome to RealStore! This is a shopping website where you can buy clothes, jewelry and electronics. This project is build based on Typescript and React, and uses HTML to create the website. Styling is done using CSS-modules.

The user has the ability to add products to the cart if they want to buy a product. When navigating to the cart, the user will see a summary of all the products added to the cart, and the price sum. In addition to this, the user has the ability to mark a product as favourite, in order to save something that might look interesting. By navigating to the favourite-page, the user can see all of their favourited products marked so far. Moreover, the user can explore the website by browsing the products and filter on specific things like gender or pricerange. By clicking on a product, the user can read more detailed information about the product.

The website is also made mobile friendly, as it will adapt to the smaller screen if viewed on one.

## Running the project

To run the project, you need to have Node 22 installed. Clone the repository from git. Then navigate to the folder `shopping_website` by writing `cd shopping_website` in the terminal.

Now you need to install some npm components.
To do so, run the following commands in a terminal while inside the mentioned folder:

- `npm install`
- `npm install react-icons`
- `npm install @tanstack/react-query`

Now run:

`npm run dev` 

in order to run the project

## Running tests

In order to run the tests first navigate to the correct folder as described under "Running the project". Then run the following command in the terminal:

`npm test`

## Running eslint

In order to run eslint to check for issues and problems with the code, run the following command after navigating to the `shopping_website` folder:

`npm run lint`
