See the [iteration 1](iteration1.md) to read about decissions done for project 1.

## Changes from iteration 1
- The ActionBox-component previously started fetching all products unnecessarily to find the desired product, which lead to unecessary API-calls. This is now fixed by using the hook we made, to make sure that it only fetches one item.  
- There were some scalability issues on the product/clothe-page especially for mobile. This page and its corresponding component's CSS-files were refactored in order to solve this issue 
- Previously, we had an issue when a product was added to the cart from the product-page. The button text changed to "Already in cart," which could be confusing. In order to solve this, the text now depicts "Added to cart" instead. 
- To be more consistent, text on the page mostly have the same colour. 
- We have made the website fully keyboard-accessible with tab and enter, in order to strive for better accessibility. Furthermore, we improved the user feedback a bit by adding hovering effects on buttons and links. 
- Another improvement for accessibility is the usage of aria-tags. The tags were put according to mozillas aria-guide (generalized for different browsers), which can be found [here](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes)
- We have made tests for all components