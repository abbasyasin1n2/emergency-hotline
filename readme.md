
## JavaScript Concepts Explained

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector?

getElementById returns a single element by ID (fastest), getElementsByClassName returns live HTMLCollection by class, querySelector/querySelectorAll returns static NodeList using CSS selectors (most flexible).

### 2. How do you create and insert a new element into the DOM?

Use document.createElement() to create elements, then appendChild(), insertBefore(), append(), or prepend() to insert them into the DOM.

### 3. What is Event Bubbling and how does it work?

Event bubbling is when events start at target element and propagate up through parent elements to document root automatically.

### 4. What is Event Delegation in JavaScript? Why is it useful?

Event delegation attaches one listener to parent element to handle multiple child events using bubbling. Benefits: better performance, memory efficiency, works with dynamic content.

### 5. What is the difference between preventDefault() and stopPropagation()?

preventDefault() stops default browser behavior but allows bubbling. stopPropagation() stops event bubbling but allows default behavior.

