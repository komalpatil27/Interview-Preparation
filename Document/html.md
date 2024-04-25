### 1. HTML 5 features (The latest version of HTML is HTML5.) link to refer: https://www.browserstack.com/guide/top-html5-features
- a. Semantic Elements : 
	· Semantics, to put it simply, is the use of HTML tags that accurately reflect the content they contain. For instance, using the <div> tag doesn’t suggest the content it will carry, however using the <p> tag suggests it can be used to hold paragraph information.  For example : <header> , <article> : define an independent, self-contained piece of content.
	· Why to use ? 
	- Accessibility: It is easier for persons with disabilities to navigate your website if you have appropriately laid up a foundation of semantic HTML.
		- SEO (Search engine optimization) :  Search engines utilize HTML to decipher the content, its placement of semantic keywords has an impact on the webpage’s ranking.
		- Browser compatibility: Each browser interacts with semantic elements differently, semantic elements make it simple to utilize larger coverage of your website across platforms.

### 2. Audio and Video Support :
- To embed Audio and Video into your HTML document, you may use the following two tags, <audio> and <video> tags. 
- Example : 
	 ```<video width = "300" height = "200" controls autoplay>
	<source src = "./dog.mp4" type ="video/mp4" />
	</video>
	 
	<audio controls>
	<source src="dog.mp3" type="audio/mp3">
	</audio>```
					 
### 3. Canvas Elements :
				Canvas Elements is a top-notch feature that has made the tedious task of handling graphics easier for developers.
				Example : 
				<canvas id="Canvas" width="200" height="100" style="border:1px solid #000000;">Canvas</canvas>
				 
### 4. Geolocation API :
	The Geolocation API is an HTML feature that is used access the geographical position of a user, however, it is not accessed unless the user approves of it.
	 
### 5. Local Storage :
	Using this feature you can reduce the transactions between the application and the backend server, creating a fast application. However, there are some limitations, such as there is limited storage, and you can not access more storage than that. 
	 
### 6. Responsive Images :
    Including srcset attribute to specify multiple versions of an image at different screen resolutions. 
	There’s one more attribute, the sizes attribute which is used to specify how much space the image will take up on the page, it also helps the browser to pick the best-suited image depending upon the screen size it is viewed upon.
	<img
	alt="image alt text" src="doggo.jpg" srcset=" small.jpg 240w, medium.jpg 300w, large.jpg 720w "
	sizes=" (min-width: 960px) 720px, 100vw "
	>
				 
### 7. Web Workers :
	Using web workers, you can transfer some processes from the Main thread to the Worker thread. This will free up the main thread for other tasks while the worker thread does the CPU-intensive tasks.
	Refer https://www.knowledgehut.com/blog/web-development/turbocharge-web-apps-with-web-workers for more details.
· Example :
	const worker = new Worker(worker.js);  
	// Sending and Receiving a message from the main script to the worker script: main.js 
	btn1.addEventListner('click', (event)=>{ 
    // Using the postMessage to send Message from the main.js to worker.js
    worker.postMessage('Hello Worker'); 
	 }); 
	worker.onmessage = function(message) alert(`The sum is: ${message.data}`); 
				 
### 8. Drag and Drop API : 
	Drag and drop is among the most unique features of HTML5 that allow you to grab any element in the DOM and drop it to a different location. To create an element able to drag and drop, set the attribute “draggable” on the tag and put its value to true.  
	· Example : <p id="drag" draggable="true">Draggable element</p>
		 
### 9. Form Enhancements :
	 key enhancements in the new HTML 5 include new input times such as email, URL, and more, placeholder text, required fields feature, validation, and more. 
	 
### 10. Web Sockets:
	In the previous versions of HTML, when a client sends a request to the backend server, the server then responds afterward. However, in HTML 5 we can establish a bidirectional live communication between the server and the client (a web browser) to reduce the latency in the responses. 
	 
### 11. Micro Data :
	Micro Data in simpler words is a further deeper level to provide semantics to your webpage. This feature is used to structure data in HTML documents by embedding your own customized elements. 
· Example : link -> https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/itemref
	There are five global attributes:  itemref, itemmid, itemscope, itemprop, and itemtype 
	 
### 12. Cross Document Messaging
	There are several scenarios, in which you want to access cross-document communication to make your web page more interactive with less effort. 
	Some of these scenarios are when you want to embed data from third-party sites such as maps, photos, videos, and more. This can be achieved in HTML 5 with the feature of cross-document messaging, to enable real-time communication between different parts of websites opened in different frames, windows, etc. 
	Link : https://html.spec.whatwg.org/multipage/web-messaging.html

			 
### 13. Meta Tag :
	The <meta> tag defines metadata about an HTML document. Metadata is (information) about data.
	<meta> tags always go inside the <head> element, and are typically used to specify character set, page description, keywords, author of the document, and viewport settings.
	Metadata will not be displayed on the page, but is machine parsable.
	 
	<head>
	  <meta charset="UTF-8">
	  <meta name="description" content="Free Web tutorials">
	  <meta name="keywords" content="HTML, CSS, JavaScript">
	  <meta name="author" content="John Doe">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	</head>

### 14. Document Structure

```
<!DOCTYPE html> <!-- Document type declaration -->
<html lang="en"> <!--root element with language -->
<head> <!-- This element contains metadata about the document-->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Async and Defer Example</title>
  
  <!-- Script tags go here -->
  <script async src="async-script.js"></script>
  <script defer src="deferred-script.js"></script>
</head>
<body> <!-- visible content -->
  <h1>Async and Defer Example</h1>

  <!-- Inline script tag -->
  <script>
    console.log('Inline script');
  </script>

  <!-- Regular script tag -->
  <script src="regular-script.js"></script>
</body>
</html>
```
### 15. Difference between defer and async
- Defer :
    - Ordered execution: Scripts are executed in the order they appear in the HTML, but only after the HTML parsing is complete.
    - Waits for DOM: Ensures the DOM is fully built before executing the script, making it suitable for scripts that rely on DOM elements or interact with the page structure.
    - Use defer for scripts that rely on the DOM or need to run in a specific order.

- Async :
    - <b>The async attribute is used to load the script asynchronously, meaning the script will be downloaded in parallel with parsing the HTML document, and executed as soon as it's available, without blocking the HTML parsing.</b>
    - Script execution is independent: Once downloaded, the script is executed as soon as possible, regardless of where the browser is in parsing the HTML or the order of other scripts.
    - No guaranteed order: Multiple async scripts can execute concurrently or in any order they finish downloading.
    - Use async for independent scripts that don't interact with the DOM or other scripts (e.g., analytics trackers).

    ![ASYNC-DEFER](./images/asyncDefer.png)
```<!DOCTYPE html>
<html>
<head>
  <title>Async and Defer Example</title>
  <!-- This script will be loaded asynchronously -->
  <script async src="async-script.js"></script>

  <!-- This script will be loaded asynchronously and executed after HTML parsing -->
  <script defer src="deferred-script.js"></script>
</head>
<body>
  <h1>Async and Defer Example</h1>

  <!-- This script will be loaded and executed in the order it appears -->
  <script>
    console.log('Inline script');
  </script>
</body>
</html>```

       