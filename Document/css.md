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

- Universal Selector: 
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
			
			
###	3. Box Model :
		
			
			
