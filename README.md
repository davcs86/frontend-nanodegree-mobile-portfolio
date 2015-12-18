## Website Performance Optimization portfolio project

Project #4 for Udacity's front-end web developer nanodegree program by davcs86.

### Usage

1. Clone the project source code

    ```bash
    $> git clone https://github.com/davcs86/frontend-nanodegree-mobile-portfolio.git
    ```

1. Enter into the directory `frontend-nanodegree-mobile-portfolio`

    ```bash
    $> cd frontend-nanodegree-mobile-portfolio
    ```

1. Install node packages

    ```bash
    $> npm install
    ```

1. Install bower packages

    ```bash
    $> bower install
    ```

1. Run default task in grunt

    ```bash
    $> grunt default
    ```

1. Enter into the directory `dist`

    ```bash
    $> cd dist
    ```

1. To inspect the site, you can run a local server

    ```bash
    $> python -m SimpleHTTPServer 8080
    ```

1. Alternatively, you can download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

    ``` bash
    $> ./ngrok http 8080
    ```

1. Copy the public URL `ngrok` gives you and try running it through PageSpeed Insights!


### Optimizations to the [original code](https://github.com/udacity/frontend-nanodegree-mobile-portfolio)

####Part 1: Optimize PageSpeed Insights score for index.html

##### HTML

- Moved the styles and scripts to just before the closing BODY tag to avoid render blocking.
- Created a thumbnail version of pizzeria.jpg since the original size was too much for index.html
- Added media type to styles to wait only for the necessary styles.
- The script `js/perfmatters.js` is loaded asynchronous.
- All the assets (css, js and images) are minified and optimized.

##### JS

- The Google font and Google analytics scripts are loaded asynchronous in the page `onload` event.
    ``` js
    window.addEventListener("load", function() {
        // (...)
        (function() {
            var wf = document.createElement("script");
            wf.src = ("https:" == document.location.protocol ? "https" : "http") +
                "://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
            wf.type = "text/javascript";
            wf.async = "true";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(wf, s);
        })();
        (function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,"script","//www.google-analytics.com/analytics.js","ga");
        // (...)
    });
    ```
##### Result

- Check out the PageSpeed Insights [scores](https://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Fd-castillo.info%2Fudacity%2Ffrontend-nanodegree-mobile-portfolio%2F&tab=mobile)

####Part 2: Optimize Frames per Second in pizza.html

##### HTML

- Moved the styles and scripts to just before the closing `body` tag to avoid render blocking.
- Moved `div#movingPizzas1` outside of any other div in order to create an independent layer, to improve _Composite layer_ times.
- The script `js/main.js` is loaded asynchronous.
- Added the extra large size for pizza slider.
- All the assets (css, js and images) are minified and optimized.

##### JS

- Optimizations to `view/js/main.js`:
    - In `changePizzaSizes` method, the selector of elements is executed one time before the for loop.
    - In `resizePizzas` method:
        - Added the `Extra large` size (was a TODO).
        - Changed the inner `sizeSwitcher` method to return a percentage instead of a fraction, and moved to outer scope.
        - Removed the `determineDx` method, the new width is the percentage returned by `sizeSwitcher` method.
        - Moved the inner `changePizzaSizes` method to outer scope.
    - In `changePizzaSizes` method, the selector of elements is executed one time before the for loop.
    - The for loop to create and append the random pizzas is moved to a new method, `createRandomPizzas`. With the following changes:
        - The selector for the container is executed one time before the for loop.
        - The new random pizzas are appended to a [document fragment](https://developer.mozilla.org/en/docs/Web/API/DocumentFragment) in the for loop, then this document fragment is appended to the DOM tree one time.
    - In `updatePositions` method:
        - Changed to update the moving pizzas position only when window `onscroll` event happens.
        - Changed to calculate only the phases needed.
        - Changed to calculate the phases based on the timestamp sent from `requestAnimationFrame`, instead of `document.body.scrollTop` (which causes reflow).
        - The selector for the moving pizzas is executed only one time just after of creating them in the `createMovingPizzas`.
    - In `createMovingPizzas` method:
        - The selector for the moving pizzas container is executed only one time before the for loop.
        - The new moving pizzas are appended to a document fragment in the for loop, then this document fragment is appended to the DOM tree one time.
        - Changed the element created to DIV, and left the background and dimensions in the CSS class.
        - Also, resized the `views/images/pizza.png` image to the exact dimension (100x77px) in order to avoid resizing in runtime.
        - Set page `onload` event to call `createRandomPizzas`, `createMovingPizzas` and `updatePositions` methods with `requestAnimationFrame`.
        - Set Page `onscroll` event, used to set `updatePositionsFlag` to `true` (used in `updatePositions`).

##### Result

- Check out the page [here](http://d-castillo.info/udacity/frontend-nanodegree-mobile-portfolio/views/pizza.html)
