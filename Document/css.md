###	1. Cascading
There are five steps in the cascade algorithm, in order:
- Relevance
- Origin and importance
- Specificity
- Scoping proximity
- Order of appearance
	The “cascading” in CSS refers to the fact that styling rules “cascade” down from several sources. This means that CSS has an inherent hierarchy and styles of a higher precedence will overwrite rules of a lower precedence.

###	2. CSS building blocks :
- a. Type , class, Id selectors : 
	- Type : 
		span {
 		 background-color: yellow;
		}
   - Class :  
	```<h1 class="highlight">Class selectors</h1>```
	.highlight {
	background-color: yellow;
	}

	- Universal: 
		
		```* {
		margin: 0;
		}
		article *:first-child{font-weight:bold;} ```
	- Id : 
		#one {
		background-color: yellow;
		}

- b. Attribute selectors :
    - we can match any list item with a class attribute. This matches all of the list items except the first one.
	li[class] {
	font-size: 200%;
	}

	- matches a selector with a class of a 
	li[class="a"] {
	background-color: yellow;
	}

	-  will match a class of a but also a value that contains the class of a as part of a whitespace-separated list
	li[class~="a"] {
	color: red;
	}
			
- c. Combinators : Link to refer : https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Combinators#descendant_combinator
		
	- Descendant combinator : 
	Typically represented by a single space (" ") character — combines two selectors such that elements matched by the second selector are selected if they have an ancestor
	.box p {
	color: red;
	}

	- Child combinator : 
	ul > li {
	border-top: 5px solid red;
	}

	- Next-sibling combinator : Immediate sibbling will get styles applied
	h1 + p {
	font-weight: bold;
	}
	```<h1>A heading</h1>
		<p>Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo
				melon azuki bean garlic.</p>```

	- Subsequent-sibling combinator : all siblings will get highlighted 
			
			
###	3.  What is the difference between display: none and visibility: hidden?

display: none removes the element from the document flow, as if it doesn't exist. It doesn't take up any space.
visibility: hidden hides the element, but it still takes up space in the layout.


###	4. Explain the CSS box model.
The CSS box model is a fundamental concept that defines how elements are sized and positioned on a web page. It consists of four parts:

Content box: The area where the content of the element is displayed.
Padding: The space between the content and the border.
Border: The line surrounding the padding and content.
Margin: The space between the border and the surrounding elements.


###	5. What is the difference between inline, inline-block, and block elements?

inline elements: They are rendered inline with other elements and respect left-to-right flow. They cannot have width and height set, and margin/padding works differently.
inline-block elements: They behave like inline elements but can have width and height set, and margin/padding works as expected.
block elements: They start on a new line and take up the full width available by default. They can have width and height set, and margin/padding works as expected.


###	6. What is the CSS specificity hierarchy?
The CSS specificity hierarchy determines which CSS rule gets applied when there are conflicting styles targeting the same element. The hierarchy, from the highest to lowest specificity, is:

Inline styles
IDs
Classes, pseudo-classes, attribute selectors
Elements, pseudo-elements


###	7. What are CSS pseudo-classes and pseudo-elements?

Pseudo-classes are used to target specific states of an element, like :hover, :focus, :active, :nth-child, etc.
Pseudo-elements are used to style parts of an element, like ::before, ::after, ::first-line, ::selection, etc.


###	8. Explain the concept of CSS positioning.
CSS positioning allows you to position elements on a web page using the position property. The main values are:

static (default): Elements are positioned according to the normal document flow.
relative: Elements are positioned relative to their normal position.
absolute: Elements are positioned relative to their nearest positioned ancestor.
fixed: Elements are positioned relative to the viewport.
sticky: Elements are positioned based on the user's scroll position.


###	9. What is the difference between em and rem units?

em is a relative unit that is relative to the font size of the parent element.
rem (root em) is a relative unit that is relative to the font size of the root element (usually the <html> element).


###	10. How can you center an element horizontally and vertically?
To center an element horizontally and vertically, you can use the following technique:

**Method 1: Flexbox (Recommended)**
```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* for vertical centering */
}
```

**Method 2: Position + Transform**
```css
.element {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

###	11. What is the difference between margin and padding?

margin is the space between the element's border and surrounding elements.
padding is the space between the content and the element's border.


###	12.The box-sizing property in CSS determines how the total width and height of an element are calculated. It has two main values:

content-box (default): The width and height include only the content area, not the padding, border, or margin.
border-box: The width and height include the content area, padding, and border, but not the margin.

Using box-sizing: border-box can make it easier to size elements, as the width and height you set will include the padding and border, rather than just the content area.


###	13. What is the CSS calc() function, and how can it be useful?
The calc() function in CSS allows you to perform calculations when specifying values for CSS properties. It can be used to add, subtract, multiply, or divide values of different units, making it useful for responsive design or positioning elements dynamically based on other values. For example:

```css
.element {
  width: calc(100% - 50px); /* Subtract 50px from 100% */
  height: calc(20vh + 100px); /* Add 20% of the viewport height and 100px */
}
```

###	14. What is the difference between css and css-in-js?

css refers to traditional CSS stylesheets that are separate from JavaScript.
css-in-js is a technique where CSS styles are written inside JavaScript files using library like styled-components, emotion, etc. This allows you to couple styles with their respective components and leverage JavaScript features like variables, functions, and conditionals.


###	15. What is CSS selector specificity and how does it work?
CSS selector specificity is a way to determine which styles are applied to an element when multiple styles target the same element. Specificity is calculated based on the type of selector used, and more specific selectors take precedence over less specific ones.
The specificity hierarchy from highest to lowest is:

Inline styles
IDs (#example)
Classes, pseudo-classes, attribute selectors (.example, :hover, [attr=value])
Elements, pseudo-elements (div, ::before)

When two selectors have the same specificity, the last one defined in the CSS file will be applied.


###	16. What is Flexbox and when should you use it?

Flexbox (Flexible Box Layout) is a one-dimensional layout method for arranging items in rows or columns. Items flex to fill additional space or shrink to fit into smaller spaces.

**Key Properties:**
```css
.container {
  display: flex;
  flex-direction: row; /* or column */
  justify-content: center; /* align along main axis */
  align-items: center; /* align along cross axis */
  gap: 10px; /* spacing between items */
}

.item {
  flex: 1; /* grow, shrink, basis */
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
}
```

**Use Flexbox for:**
- Navigation bars
- Card layouts
- Centering content
- Distributing space evenly
- One-dimensional layouts (row OR column)


###	17. What is CSS Grid and how does it differ from Flexbox?

CSS Grid is a two-dimensional layout system for creating complex layouts with rows and columns simultaneously.

**Basic Grid Example:**
```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  grid-template-rows: 100px auto;
  gap: 20px;
  grid-template-areas: 
    "header header header"
    "sidebar main main"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
```

**Flexbox vs Grid:**
- **Flexbox**: One-dimensional (row OR column), content-first approach
- **Grid**: Two-dimensional (rows AND columns), layout-first approach
- **Use Flexbox**: For components and small-scale layouts
- **Use Grid**: For page layouts and complex two-dimensional designs


###	18. What are CSS animations and transitions? What's the difference?

**Transitions:** Smooth changes between two states when triggered by an event (hover, focus, etc.)
```css
.button {
  background-color: blue;
  transition: background-color 0.3s ease, transform 0.2s;
}

.button:hover {
  background-color: red;
  transform: scale(1.1);
}
```

**Animations:** More complex, multi-step animations that can run automatically
```css
@keyframes slideIn {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.element {
  animation: slideIn 0.5s ease-out forwards;
}
```

**Key Differences:**
- Transitions: Simple, two-state changes, require trigger
- Animations: Complex, multi-step, can auto-play, more control


###	19. What is z-index and how does stacking context work?

`z-index` controls the stacking order of positioned elements (position: relative, absolute, fixed, or sticky).

```css
.element1 {
  position: relative;
  z-index: 1; /* Lower value, behind */
}

.element2 {
  position: relative;
  z-index: 10; /* Higher value, in front */
}
```

**Stacking Context Rules:**
- Only works on positioned elements
- Higher z-index appears on top
- Elements create new stacking contexts with: position + z-index, opacity < 1, transform, filter, etc.
- Child elements cannot escape parent's stacking context


###	20. What are CSS Variables (Custom Properties)?

CSS Variables allow you to store values that can be reused throughout your stylesheet.

```css
:root {
  --primary-color: #3498db;
  --spacing-unit: 8px;
  --font-size-large: 24px;
}

.button {
  background-color: var(--primary-color);
  padding: calc(var(--spacing-unit) * 2);
  font-size: var(--font-size-large);
}

/* Can be changed dynamically with JavaScript */
.dark-theme {
  --primary-color: #2c3e50;
}
```

**Benefits:**
- Reusability and maintainability
- Dynamic updates via JavaScript
- Scoped to elements (cascade and inherit)
- Better than preprocessor variables for runtime changes


###	21. What are Media Queries and how do you use them for responsive design?

Media queries apply styles based on device characteristics like screen width, height, orientation, etc.

```css
/* Mobile First Approach */
.container {
  width: 100%;
  padding: 10px;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    width: 750px;
    padding: 20px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    width: 960px;
  }
}

/* Landscape orientation */
@media (orientation: landscape) {
  .header {
    height: 60px;
  }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #1a1a1a;
    color: #ffffff;
  }
}
```


###	22. What are the different CSS units and when should you use each?

**Absolute Units:**
- `px`: Pixels - fixed size, good for borders, precise control
- `pt`, `cm`, `mm`: Print stylesheets

**Relative Units:**
- `em`: Relative to parent font-size (compounds)
- `rem`: Relative to root font-size (doesn't compound) - **recommended for font sizes**
- `%`: Relative to parent element
- `vw/vh`: Viewport width/height (1vw = 1% of viewport width)
- `vmin/vmax`: Smaller/larger of vw or vh

```css
html {
  font-size: 16px; /* Base size */
}

.container {
  width: 80%; /* Relative to parent */
  max-width: 1200px; /* Absolute limit */
  padding: 2rem; /* 32px (16px * 2) */
  font-size: 1.125rem; /* 18px */
}

.hero {
  height: 100vh; /* Full viewport height */
  font-size: 5vw; /* Responsive to viewport */
}
```


###	23. What is the BEM naming convention?

BEM (Block Element Modifier) is a naming methodology for writing maintainable and scalable CSS.

**Structure:** `block__element--modifier`

```css
/* Block: Standalone component */
.card { }

/* Element: Part of the block */
.card__title { }
.card__image { }
.card__description { }

/* Modifier: Variation of block or element */
.card--featured { }
.card--large { }
.card__title--highlighted { }
```

**HTML Example:**
```html
<div class="card card--featured">
  <img class="card__image" src="image.jpg" alt="">
  <h2 class="card__title card__title--highlighted">Title</h2>
  <p class="card__description">Description text</p>
</div>
```

**Benefits:**
- Clear component structure
- Avoids naming conflicts
- Self-documenting code
- Easy to understand relationships


###	24. What are CSS preprocessors and what are their benefits?

CSS preprocessors (SASS, LESS, Stylus) extend CSS with programming features.

**SASS/SCSS Example:**
```scss
// Variables
$primary-color: #3498db;
$spacing: 16px;

// Nesting
.nav {
  background: $primary-color;
  
  &__item {
    padding: $spacing;
    
    &:hover {
      background: darken($primary-color, 10%);
    }
  }
}

// Mixins (reusable code blocks)
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  @include flex-center;
}

// Functions
@function calculate-rem($px) {
  @return $px / 16px * 1rem;
}

.text {
  font-size: calculate-rem(18px);
}
```

**Benefits:**
- Variables, nesting, mixins, functions
- Better code organization
- DRY (Don't Repeat Yourself) principle
- Compiles to standard CSS


###	25. How can you optimize CSS performance?

**Best Practices:**

1. **Minimize CSS file size:**
```css
/* Use shorthand properties */
margin: 10px 20px; /* instead of margin-top, margin-right, etc. */
```

2. **Avoid expensive selectors:**
```css
/* Bad - universal selector */
* { margin: 0; }

/* Bad - deep nesting */
.nav ul li a span { }

/* Good - specific class */
.nav-link { }
```

3. **Use CSS containment:**
```css
.widget {
  contain: layout style paint;
}
```

4. **Optimize animations:**
```css
/* Use transform and opacity (GPU accelerated) */
.element {
  transform: translateX(100px); /* Good */
  will-change: transform; /* Hint to browser */
}

/* Avoid animating layout properties */
.element {
  left: 100px; /* Bad - triggers layout */
}
```

5. **Critical CSS:** Inline critical above-the-fold CSS
6. **Remove unused CSS:** Use tools like PurgeCSS
7. **Minify and compress:** Reduce file size


###	26. What is the difference between CSS Reset and Normalize.css?

**CSS Reset:**
- Removes ALL default browser styles
- Starts from zero
- More aggressive approach

```css
/* Example Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

**Normalize.css:**
- Preserves useful defaults
- Fixes browser inconsistencies
- More moderate approach
- Makes elements render consistently across browsers

**When to use:**
- **Reset**: When you want complete control and will define all styles
- **Normalize**: When you want consistent baseline while keeping useful defaults (recommended for most projects)


###	27. What is the difference between float and flexbox for layouts?

**Float (Legacy):**
```css
.column {
  float: left;
  width: 33.33%;
}

.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
```

**Flexbox (Modern):**
```css
.container {
  display: flex;
  gap: 20px;
}

.column {
  flex: 1;
}
```

**Differences:**
- **Float**: Originally for text wrapping, hacky for layouts, requires clearfix
- **Flexbox**: Purpose-built for layouts, cleaner, more powerful
- **Recommendation**: Use Flexbox/Grid for layouts, float only for text wrapping


###	28. What is the will-change property and when should you use it?

`will-change` hints to the browser which properties will change, allowing optimization.

```css
.element {
  will-change: transform, opacity;
}

/* Use sparingly and remove when done */
.element:hover {
  will-change: transform;
  transform: scale(1.2);
}

.element {
  will-change: auto; /* Reset after animation */
}
```

**Best Practices:**
- Use only for performance issues
- Don't overuse (wastes memory)
- Remove after animation completes
- Don't apply to too many elements


###	29. What are CSS logical properties?

Logical properties adapt to writing direction (LTR/RTL) automatically.

```css
/* Traditional (physical) */
.element {
  margin-left: 20px;
  padding-right: 10px;
  border-top: 1px solid black;
}

/* Logical (direction-aware) */
.element {
  margin-inline-start: 20px; /* left in LTR, right in RTL */
  padding-inline-end: 10px; /* right in LTR, left in RTL */
  border-block-start: 1px solid black; /* top in horizontal writing */
}
```

**Benefits:**
- Internationalization support
- Works with different writing modes
- Future-proof code