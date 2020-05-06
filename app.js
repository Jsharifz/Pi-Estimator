// The following script's purpose is to estimate the value of Pi with random number generation and basic geometry.

// Parameters of a right-anle triangle.
let rise = 0;
let run = 0;
let hypotenuse = 0;

// A counter that adds up when the length of the hypotenuse is within the circle.
let hypotenuseWithinCircle = 0;

// The new estimated value of Pi will be passed onto this variable.
let piEstimated = 0;

// The difference between the estimated value and the actual value of Pi.
let error = 0;

// The length of time each iteration takes.
let iterationTimeLength = 1000;

// The rate of iterations per second.
let iterationRate = 0;

// The total number of iterations generated.
let iterations = 0;

// This function calculates the hypotenuse of the triangle.
let hypotenuseCalculation = (a, b) => {
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
};

// This function calculates the estimated value of Pi. https://www.geeksforgeeks.org/estimating-value-pi-using-monte-carlo/
let piCalculator = (x) => {
    return (x * 4) / iterations;
};

// Used to display the values in the DOM.
let piHtml = document.getElementById("pi");

// Start of the function that runs the calculator.
let piEstimator = () => {
    // Needed to start counting.
    iterations++;

    // Converts interval time (ms) to intervals per second.
    iterationRate = 1000 / iterationTimeLength;

    // These variables reasign themselves to a value between (inclusive) 0 and 1.
    run = Math.random() * (1 - 0) + 0;
    rise = Math.random() * (1 - 0) + 0;

    // The hypotenuse is calculated by calling the required functon.
    hypotenuse = hypotenuseCalculation(rise, run);

    // Checks to see if the imaginary end point of the hypotenuse is greater than or less than 0. The radius of the circle is given by default as the maximum value if the rise or run cannot exceed 1. Example: If the run is 0 and the rise is 1, the hypotenuse is 1. If the rise AND run are 1, the hypotenuse is 1.41 and therefore the length is longer than the radius of the circle.
    if (hypotenuse <= 1) {
        hypotenuseWithinCircle++;
    }

    // This variable sets the value of Pi depending on the total number of points in the circle and the total iterations.
    piEstimated = piCalculator(hypotenuseWithinCircle);

    // This will simply keep track of the accuracy of the calculator by comparing the estimated value with actual value of Pi.
    error = Math.PI - piEstimated;

    // This will update the portion of HTML so it can be displayed in the browser.
    pi.innerHTML = `
    <div>
        <p>Rise:</p>
        <p>${rise}</p>
    </div>
    <div>
        <p>Run:</p>
        <p>${run}</p>
    </div>
    <div>
        <p>Hypotenuse:</p>
        <p>${hypotenuse}</p>
    </div>
    <div>
        <p>Rate:</p>
        <p>${iterationRate} Iterations/Second</p>
    </div>
    <div>
        <p># of Success:</p>
        <p>${hypotenuseWithinCircle}</p>
    </div>
    <div>
        <p># of Iterations:</p>
        <p>${iterations}</p>
    </div>
    <div>
        <p>Estimated Pi:</p>
        <p>${piEstimated}</p>
    </div>
    <div>
        <p>Error:</p>
        <p>${error}</p>
    </div>
    `;
};

// The given state by default; will change with a click of a button.
let running = false;

// This function starts the repeating interval of the function. It only starts of the given conditions are provided. Only envoked after the "Start" or "Pause" button is pressed.
const startStopper = () => {
    if (running === true) {
        // Starts the interval if "Start" is clicked.
        x = setInterval(piEstimator, iterationTimeLength);
    } else if (running === false) {
        // Stios the inverval if the "Pause" is clicked.
        clearInterval(x);
    }
};

// This function changes the running status from false to true.
const start = () => {
    // Checks if the state is true or false. If the loop and state is not provided, repeated clicking of "Start" will stack the intervals.
    if (running === false) {
        // Since the default status is false, it changes it to true.
        running = true;
        // After changing the state, the function is envoked to operate the calculator
        startStopper();
    }
};

// This function changes the running status from true to false.
const pause = () => {
    if (running === true) {
        // Just like the previous function, it changes the state of the variiable.
        running = false;
        // After changing the state, the function is envoked to operate the calculator.
        startStopper();
    }
};

// This function on click will reset the main values to "0" and reset the HTML text; this will work if the function is running or not.
const reset = () => {
    // The main values requried to estimate Pi are reset when this function is envoked.
    hypotenuseWithinCircle = 0;
    iterations = 0;

    pi.innerHTML = `
    <div>
        <p>Rise:</p>
        <p></p>
    </div>
    <div>
        <p>Run:</p>
        <p></p>
    </div>
    <div>
        <p>Hypotenuse:</p>
        <p></p>
    </div>
    <div>
        <p>Rate:</p>
        <p></p>
    </div>
    <div>
        <p># of Success:</p>
        <p></p>
    </div>
    <div>
        <p># of Iterations:</p>
        <p></p>
    </div>
    <div>
        <p>Estimated Pi:</p>
        <p></p>
    </div>
    <div>
        <p>Error:</p>
        <p></p>
    </div>
    `;
};

// If the running state is true, this function clears the interval changes the interval rate, then restarts the calculator.
const faster = () => {
    if (running === true) {
        clearInterval(x);
        iterationTimeLength = iterationTimeLength / 1.25;
        startStopper();
    }
};

// If the running state is true, this function clears the interval changes the interval rate, then restarts the calculator.
const slower = () => {
    if (running === true) {
        clearInterval(x);
        iterationTimeLength = iterationTimeLength * 1.25;
        startStopper();
    }
};
