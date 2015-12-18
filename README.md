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

##### Result

- Check out the page [here](http://d-castillo.info/udacity/frontend-nanodegree-mobile-portfolio/views/pizza.html)
