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
cssCopy code.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* for vertical centering */
}
Alternatively, you can use transform and position properties:
cssCopy code.element {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

###	11. What is the difference between margin and padding?

margin is the space between the element's border and surrounding elements.
padding is the space between the content and the element's border.


###	12. What is CSS specificity and how does it work?
CSS specificity is a set of rules that determines which CSS styles get applied to an element when there are conflicting styles targeting the same element. The specificity hierarchy, from highest to lowest, is:

Inline styles
IDs (#example)
Classes, pseudo-classes, attribute selectors (.example, :hover, [attr=value])
Elements, pseudo-elements (div, ::before)

More specific selectors (like IDs) take precedence over less specific selectors (like elements). If two selectors have the same specificity, the last one in the CSS file will be applied.
What is the box-sizing property, and what are its values?
The box-sizing property in CSS determines how the total width and height of an element are calculated. It has two main values:

content-box (default): The width and height include only the content area, not the padding, border, or margin.
border-box: The width and height include the content area, padding, and border, but not the margin.

Using box-sizing: border-box can make it easier to size elements, as the width and height you set will include the padding and border, rather than just the content area.
What is the difference between display: none and opacity: 0?

display: none completely removes the element from the document flow, as if it doesn't exist. It doesn't take up any space.
opacity: 0 makes the element invisible but still takes up space in the layout.


###	13. What is the CSS calc() function, and how can it be useful?
The calc() function in CSS allows you to perform calculations when specifying values for CSS properties. It can be used to add, subtract, multiply, or divide values of different units, making it useful for responsive design or positioning elements dynamically based on other values. For example:
cssCopy code.element {
  width: calc(100% - 50px); /* Subtract 50px from 100% */
  height: calc(20vh + 100px); /* Add 20% of the viewport height and 100px */
}

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