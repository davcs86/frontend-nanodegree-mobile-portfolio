## Website Performance Optimization portfolio project

Project #4 for Udacity's front-end web developer nanodegree program by davcs86.

### Usage

1. Clone the project source code

    ```bash
    $> git clone https://github.com/davcs86/frontend-nanodegree-mobile-portfolio.git
    ```

1. Enter into the directory

    ```bash
    $> cd `frontend-nanodegree-mobile-portfolio`
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

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

  ``` bash
  $> ./ngrok http 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights!


### Optimizations to the [original code](https://github.com/udacity/frontend-nanodegree-mobile-portfolio)

####Part 1: Optimize PageSpeed Insights score for index.html

Profile, optimize, measure... and then lather, rinse, and repeat. Good luck!

####Part 2: Optimize Frames per Second in pizza.html

To optimize views/pizza.html, you will need to modify views/js/main.js until your frames per second rate is 60 fps or higher. You will find instructive comments in main.js.
