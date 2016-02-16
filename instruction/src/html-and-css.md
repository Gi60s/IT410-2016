# Front-End Basics

<hr>

## HTML5

- HTML5 is the latest standard being used to create HTML files.
- The content of the HTML file consists primarily of tags with attributes.

### Tags

- A tag starts and ends with `<` and `>` respectively. For example, the paragraph tag: `<p>`.
- Many tags also expect a closing tag to match an opening tag, like the paragraph. Closing tags start with `<\` and end with `>`. For example: `<p>Content</p>`
- If a tag doesn't need a closing tag then you just put the opening tag. For example, the horizontal rule tag: `<hr>`.

### Attributes

- All tags have attributes that can be used to further define how the tag looks or what it should do.
- Attributes exist within the opening tag, for example the image tag takes a source to define what image to display: `<img src='image.png'>`
- Two attributes that all elements can have are `class` and `id`.

### ID Attribute

- The `id` attribute defines a unique ID for an element. This id should be unique for the entire page. Example usage: `<p id='Main'></p>`.
- This attribute is often used to find the element using JavaScript.
- CSS also uses the ID attribute to define styles.

### Class Attribute

- The `class` attribute defines a CSS class to apply to an element.
- You must define the class style in CSS before this affects the element.

<hr>

### Template

(The below template is taken from https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Sections_and_Outlines_of_an_HTML5_document and then modified.)

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Title</title>
    <link type="text/css" rel="stylesheet" href="css/main.css">
</head>
<body>

<section>
    <h1>Forest elephants</h1>
    <section>
        <h1>Introduction</h1>
        <p>In this section, we discuss the lesser known forest elephants.</p>
    </section>
    <section>
        <h1>Habitat</h1>
        <p>Forest elephants do not live in trees but among them.</p>
    </section>
    <aside>
        <p>advertising block</p>
    </aside>
</section>
<footer>
    <p>(c) 2010 The Example company</p>
</footer>

<script type="text/javascript" src="js/main.js"></script>

</body>
</html>
```

Will produce:

![HTML5 Template Output](./images/html5-template.png)

<hr>

### Forms

w3schools can be a good resource. In the past it has been criticized for having out of date or inaccurate data, but overall its pretty good and it has some nice learning tools.

- [Forms Overview](http://www.w3schools.com/html/html_forms.asp)
- [Form Elements](http://www.w3schools.com/html/html_form_elements.asp)
- [Form Input Types](http://www.w3schools.com/html/html_form_input_types.asp)
- [Form Input Attributes](http://www.w3schools.com/html/html_form_attributes.asp)

Some things of note for forms on pages using AJAX:

- You wont specify an action or a method on the form.
- You'll use JavaScript to submit the form, using AJAX.

<hr>

### Additional HTML Resources

- [HTML Introduction](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Introduction)
- [HTML Forms](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms_in_HTML)
- [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)

<hr>

## CSS

- CSS stands for *Cascading Style Sheets*
- A style is a grouping of formatting properties.
- You define how an element should look.
- Styles have a hierarchy and can inherit from other styles (thus the cascading part)

<hr>

### CSS Selectors

A selector tells the CSS *where* styles should be applied. There are three main types of selectors:

- **Tag** - A tag selector will match a given tag.
- **Class** - A class selector will match elements that have the same class name.
- **ID** - An ID selector will apply to the element with the specified ID.

#### Tag Selector

All tags that match the selector will have the defined style applied. The following rule will make all `<p>` tags have bold red content.

```css
p {
    font-weight: bold;
    color: red;
}
```

#### Class Selector

Class selectors start with a `.` (dot). For example:

```css
.my-class {
    border: 1px solid black;
}
```

#### ID Selector

ID selectors start with a `#`. For example:

```css
#my-id {
    text-align: center;
}
```

#### Compound Selectors

It is possible to join multiple selectors together to create more specific selectors.

This example shows how you can make all `<p>` tags with the `important` class have a specific style. In your html you'd write `<p class='important'> ... </p>` to have this style apply to it.

```css
p.important {
    font-weight: bold;
    color: red;
}
```

#### Nested Selectors

You can also specify how something should look when it is a child or descendant of another selector.

- `div p { ... }` - This style rule would apply to all paragraph tags that are somewhere within a div tag.
- `div > p` { ... }` - This style would apply to all paragraph tags that are immediate children of a div tag.
- `#my-id > p > em { ... }` - This style applies to `em` tags that are immediate children of `p` tags that are immediate children of the element with attribute ID of `my-id`.

#### Pseudo Selectors

Pseudo selectors are applied for certain states, such as checked, hover, focus, first-child, etc. [See a full list of pseudo selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes). A common use for this is to modify the way links work in different states.

[This example](./html-snippit/css-link-pseudo.html) has this code:

```html
<style>
    a#styled {
        display: inline-block;
        color: #666;
        border: 1px solid #CCC;
        padding: 5px 10px;
        text-decoration: none;

        transition: background-color 500ms;
    }
    a#styled:hover {
        background-color: #e7a61a
    }

    a#styled:active {
        background-color: #e7d816;
    }
</style>

<a href="javascript: void 0">Example Link</a>

<br><br>

<a id="styled" href="javascript: void 0">Example Link</a>
```

#### Multiple Selectors

You can combine selectors so that more than one selector uses a specific style by separating selectors by commas.

```css
div > p,
ul > li {
    font-weight: bold;
}
```

#### Selector Conflicts

Sometimes two selectors will try to apply competing styles to an element.

Rule of thumb: **The more specific selector has precedence or, all things being equal the last selector has precedence.**

##### Questions

1. What is more specific, an ID or a tag?
2. What is more specific, a tag or a class?
3. Looking at the following code example, what will the `<div>` look like?

CSS

```css
#main {
    border-color: blue;
}
div {
    border: 1px solid red;
}
div {
    border-bottom-width: 2px;
}
```

HTML

```html
<div id='main'>Hello, World!</div>
```

[See the demo](./html-snippit/css-conflict.html).

<hr>

### Adding CSS to your HTML

There are three ways to add CSS to your HTML:

1. Including a style sheet (generally preferred)
2. Include an inline style (great for high performance styles)
3. Include a style rule on an element (generally frowned down upon)

#### Exercises

Create an index.html file with this content:

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Title</title>
</head>
<body>
    <p>Hello, World!</p>
</body>
</html>
```

##### Exercise 1: Include Style Sheet

1. Create a file named `my-styles.css` in the same directory as the index.html file.
2. Add css to the my-styles.css file that will make the paragraph text bold, using: `font-weight: bold`.
3. Inside the `<head>` tag of your index.html file, include your my-style.css using: `<link type='text/css' rel='stylesheet' href='my-style.css'>`

##### Exercise 2: Inline Style

1. Inside the `<head>` tag of your index.html file and *after* your included style sheet add a `<style>` tag.
2. Inside that `<style>` tag add css to make the paragraph text underlined using: `text-decoration: underline`.

##### Exercise 3: Element Style Rule

1. On the `<p>` tag add an attribute `style` equal to `text-align: center; color: blue;`.

<hr>

#### Exercise Solution

CSS

```css
p {
    font-weight: bold;
}
```

HTML

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Title</title>
    <link type='text/css' rel='stylesheet' href='my-style.css'>
    <style>
        p {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <p style='text-align: center; color: blue;'>Hello, World!</p>
</body>
</html>
```

<hr>

## SASS

SASS stands for *Syntactically Awesome Style Sheets* and it addresses many of the problems introduced by CSS being static.

- You can use variables
- You can extend styles
- You can nest styles
- etc.

If you are familiar with LESS then the transition to SASS will be easy. The web community mostly agrees that SASS is better than LESS. It has all of the features of LESS and more.

[Check out the SASS Guide](http://sass-lang.com/guide)