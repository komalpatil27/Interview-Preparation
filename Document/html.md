###  HTML 5 features (The latest version of HTML is HTML5.) link to refer: <https://www.browserstack.com/guide/top-html5-features>
        1. **Semantic Elements** :
            -  [Semantics](https://www.browserstack.com/guide/html-semantic), to put it simply, is the use of HTML tags that accurately reflect the content they contain. For instance, using the **&lt;div&gt;** tag doesn’t suggest the content it will carry, however using the **&lt;p&gt;** tag suggests it can be used to hold paragraph information.  For example : &lt;header&gt; , &lt;article&gt; : define an independent, self-contained piece of content.
            - Why to use ?
                - Accessibility: It is easier for persons with disabilities to navigate your website if you have appropriately laid up a foundation of semantic HTML.
                - SEO (Search engine optimization) : Search engines utilize HTML to decipher the content, its placement of semantic keywords has an impact on the webpage’s ranking.
                - Browser compatibility: Each browser interacts with semantic elements differently, semantic elements make it simple to utilize larger coverage of your website across platforms.
                - cancel the element make ut simoke utilise larger coverrage of your website 
        2. **Audio and Video Support** :
            - To embed Audio and Video into your HTML document, you may use the following two tags, &lt;audio&gt; and &lt;video&gt; tags.
                - Example :

&lt;video width = "300" height = "200" controls autoplay&gt;

&lt;source src = "./dog.mp4" type ="video/mp4" /&gt;

&lt;/video&gt;

&nbsp;

&lt;audio controls&gt;

&lt;source src="dog.mp3" type="audio/mp3"&gt;

&lt;/audio&gt;

&nbsp;

###  **Canvas Elements** :

Canvas Elements is a top-notch feature that has made the tedious task of handling graphics easier for developers.

Example :

&lt;canvas id="Canvas" width="200" height="100" style="border:1px solid #000000;"&gt;Canvas&lt;/canvas&gt;

&nbsp;

###  **Geolocation API** :

The [Geolocation](https://www.browserstack.com/docs/app-live/location-testing/geolocation-testing) API is an HTML feature that is used access the geographical position of a user, however, it is not accessed unless the user approves of it.

&nbsp;

###  **Local Storage** :

Using this feature you can reduce the transactions between the application and the backend server, creating a fast application. However, there are some limitations, such as there is limited storage, and you can not access more storage than that.

&nbsp;

###  **Responsive Images** :

Including srcset attribute to specify multiple versions of an image at different screen resolutions.

There’s one more attribute, the sizes attribute which is used to specify how much space the image will take up on the page, it also helps the browser to pick the best-suited image depending upon the screen size it is viewed upon.

<img  
alt="image alt text" src="doggo.jpg" srcset=" small.jpg 240w, medium.jpg 300w, large.jpg 720w "  
sizes=" (min-width: 960px) 720px, 100vw "  
\>

&nbsp;

###  **Web Workers** :

Using web workers, you can transfer some processes from the Main thread to the Worker thread. This will free up the main thread for other tasks while the worker thread does the CPU-intensive tasks.

Refer <https://www.knowledgehut.com/blog/web-development/turbocharge-web-apps-with-web-workers> for more details.

###  Example :

const worker = new Worker(worker.js);  

// Sending and Receiving a message from the main script to the worker script: main.js

btn1.addEventListner('click', (event)=>{

// Using the postMessage to send Message from the main.js to worker.js

worker.postMessage('Hello Worker');

&nbsp;});

worker.onmessage = function(message) alert(\`The sum is: ${message.data}\`);

&nbsp;

###  **Drag and Drop API :**

Drag and drop is among the most unique features of HTML5 that allow you to grab any element in the DOM and drop it to a different location. To create an element able to drag and drop, set the attribute “draggable” on the tag and put its value to true.

###  Example : &lt;p id="drag" draggable="true"&gt;Draggable element&lt;/p&gt;

&nbsp;

###  **Form Enhancements :**

&nbsp;key enhancements in the new HTML 5 include new input times such as email, URL, and more, placeholder text, required fields feature, validation, and more.

&nbsp;

###  **Web Sockets:**

In the previous versions of HTML, when a client sends a request to the backend server, the server then responds afterward. However, in HTML 5 we can establish a bidirectional live communication between the server and the client (a web browser) to reduce the latency in the responses.

&nbsp;

###  **Micro Data :**

Micro Data in simpler words is a further deeper level to provide semantics to your webpage. This feature is used to structure data in HTML documents by embedding your own customized elements.

###  Example : link -> <https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/itemref>

There are five global attributes:  **itemref**, **itemmid**, **itemscope**, **itemprop**, and **itemtype**

&nbsp;

###  **Cross Document Messaging**

There are several scenarios, in which you want to access cross-document communication to make your web page more interactive with less effort.

Some of these scenarios are when you want to embed data from third-party sites such as maps, photos, videos, and more. This can be achieved in HTML 5 with the feature of cross-document messaging, to enable real-time communication between different parts of websites opened in different frames, windows, etc.

Link : <https://html.spec.whatwg.org/multipage/web-messaging.html>

&nbsp;

###  Document Structure :

&lt;!DOCTYPE html&gt;

&lt;html lang="en-US"&gt;

&nbsp; &lt;head&gt;

&nbsp; &lt;/head&gt;

&nbsp; &lt;body&gt;

&nbsp; &lt;/body&gt;

&lt;/html&gt;

&nbsp;

###  Meta Tag :

The &lt;meta&gt; tag defines metadata about an HTML document. Metadata is (information) about data.

&lt;meta&gt; tags always go inside the &lt;head&gt; element, and are typically used to specify character set, page description, keywords, author of the document, and viewport settings.

Metadata will not be displayed on the page, but is machine parsable.

&lt;head&gt;

&nbsp; &lt;meta charset="UTF-8"&gt;

&nbsp; &lt;meta name="description" content="Free Web tutorials"&gt;

&nbsp; &lt;meta name="keywords" content="HTML, CSS, JavaScript"&gt;

&nbsp; &lt;meta name="author" content="John Doe"&gt;

&nbsp; &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;

&lt;/head&gt;

&nbsp;

&nbsp;

&nbsp;