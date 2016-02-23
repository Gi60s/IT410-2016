# Responsive Design

<hr>

**Responsive design:** The practice of creating a layout that is flexible enough to fit a variety of screen widths while retaining it's ease of use.

Use:

- One URL
- One page of HTML content
- One set of JavaScript
- One set of CSS (using media queries)

Get a website or web application that fits on:

- Desktops
- Laptops
- Tablets
- Smart phones

<hr>

## Media Types

You can specify what type of media a CSS is intended for:

- **all** - Any media type device. This is the default media type.
- **print** - Used for printers.
- **screen** - Used for computer screens.

[See a full list](https://css-tricks.com/snippets/css/all-stylesheet-media-types/)

```html
<link rel="stylesheet" media="screen" href="main.css" />
<link rel="stylesheet" media="print" href="print.css" />
```

## Media Queries

https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries

```html
<!-- CSS media query on a link element -->
<link rel="stylesheet" media="(max-width: 800px)" href="example.css" />

<!-- CSS media query within a stylesheet -->
<style>
@media (max-width: 600px) {
  .facet_sidebar {
    display: none;
  }
}
</style>
```

### And

Use the word *and*.

```css
@media (min-width: 700px) and (max-width: 1000px) { ... }
```

### Or

Use a comma.

```css
@media (min-width: 400px), print
```

<hr>

## CSS Grid Systems

A set of CSS rules that help you to layout your website or web application.

- Create a row of elements.
- Elements in the row are set to take up a specific width at different screen widths.

[Twitter's Bootstrap Grid](http://getbootstrap.com/css/#grid) has one of the more popular grid systems.

Note that Bootstrap has much more styling than just a grid system:

- [CSS](http://getbootstrap.com/css/)
- [Components](http://getbootstrap.com/components/)

#### Exercise

We're going to create a grid layout using the following code:

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Title</title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <style>
        .row > * {
            outline: 1px solid #999;
            font-size: 200%;
        }
    </style>
<body>

    <div class="container-fluid">
        <div class="row">
            <div class="col-md-4">
                Left Column
            </div>
            <div class="col-md-4">
                Middle Column
            </div>
            <div class="col-md-4">
                Right Column
            </div>
        </div>
    </div>

</body>
</html>
```

You can access this exercise at https://jsfiddle.net/j91w2edy/1/

1. When the screen is medium size:
    - The left column should take up 2 columns and be at the far left.
    - The middle column should take up 8 columns and be in the middle.
    - The right column should take up 2 columns and be at the far right.
2. When the screen is small size:
    - The left column should take up 3 columns and be at the far left.
    - The middle column should take up 9 columns and be at the far right.
    - The bottom column should take up 12 columns and be below the left and middle columns.
3. When the screen is extra small:
    - All columns should take up 12 columns.
    - The middle column should be at the top, followed by the left column, and lastly the right column.
    - **Hint:** You may need to reorder the rows in the HTML and look into the push and pull column classes for Bootstrap.
    
<hr>

#### Solution

```html
...
<div class="container-fluid">
    <div class="row">
        <div class="col-md-8 col-md-push-2 col-sm-9 col-sm-push-3">
            Middle Column
        </div>
        <div class="col-md-2 col-md-pull-8 col-sm-3 col-sm-pull-9">
            Left Column
        </div>
        <div class="col-md-2">
            Right Column
        </div>
    </div>
</div>
...
```

<hr>

### CSS Grid Flaws

- It uses floats.
- Floats were not originally indented for complex layouts.
- In the previous solution we saw how we needed to do some weird things to make it layout properly:
    - We put middle first.
    - We had to include weird margins (css push and pull classes).
    - There were other problems that were not readily apparent.

<hr>

### Flexbox

- Flexbox is a system that can replace grid layouts.
- It is not fully supported by all browsers yet, although it is very close.
- The specification is not yet finalized, but it is also very close.

Two good sources for learning about flexbox:

- [css-tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)

#### Question

1. How would you go about creating the same flexible layout in the exercise using flexbox and media queries? (We don't need to solve this, just get a rough idea.)

