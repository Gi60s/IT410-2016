# Polymer Introduction

<hr>

## Polymer Starter Kit

The Polymer starter kit is intended to quickly get you started with Polymer. It has the following features:

- Page routing
- Material design
- Unit testing
- A deployment pipeline

The Polymer Starter Kit comes in two flavors:

1. The light starter kit
   - For beginners in web development
   - Everything is already compiled and set up
   - May be a little out of date.
2. The normal starter kit
   - Requires you to have passing familiarity with NodeJS, gulp, and bower.

#### Exercise

1. [Download the Polymer Starter Kit](https://github.com/PolymerElements/polymer-starter-kit/releases/latest)
2. Follow the set up instructions on the [GitHub Polymer Start Kit Repository](https://github.com/PolymerElements/polymer-starter-kit).

### Results

After following set up instructions and starting with `gulp serve` we should see some URL's in the terminal.

```sh
[PSK] Access URLs:
 -------------------------------------
       Local: http://localhost:5000
    External: http://192.168.1.10:5000
 -------------------------------------
          UI: http://localhost:3001
 UI External: http://192.168.1.10:3001
 -------------------------------------
[PSK] Serving files from: .tmp
[PSK] Serving files from: app
```

- The Local URL is the URL to load our application from the local machine.
- The External URL is how another computer would access our app.
- The UI URL is an interface for making changes to the running BrowserSync.

<hr>

## BrowserSync

BrowserSync does a few nice things for us:

### Live reloads

Whenever a file changes it automatically reloads the browser.

#### Exercise

1. Have your browser open to the app.
2. Edit your index.html file. For example, in rename the menu item "Contact" to "Contacts".

### Browser Mirroring

Browser events are shared between open instances of the app.

1. Clicks
2. Scrolling
3. Form submission
4. Form inputs
5. Form toggles (radio/checkbox)

#### Exercise

1. Open a second browser window to the same URL.
2. Open the app on another device: a tablet, a phone, or another computer. It must be on the same network.
3. Interact with the app and watch the other open instances change too.

<hr>

## BrowserSync Settings

Open a browser window to the BrowserSync UI page: http://localhost:3001

- **Overview** - See the URL for the running app, what directories are being served from, and what clients are connected.
- **Sync Options** - Decide what should be synced between browsers.
- **Network Throttle** - Start a new server for the app that throttles the network speed (slows it down).

<hr>

## Resources to Learn Polymer

There is a lot to learn about Polymer and we won't attempt to cover it all in one class, so here are some great learning resources:

- [Polycasts with Rob Dodson](https://www.youtube.com/playlist?list=PLNYkxOF6rcIDdS7HWIC_BYRunV6MHs5xo) - A series of very well done, clear, and concise videos that teach you how to write Polymer applications and web components.
- [Polymer Home Page](https://www.polymer-project.org)
   - [Developer Guide](https://www.polymer-project.org/1.0/docs/devguide/feature-overview.html) - A comprehensive guide on everything you need to know about how polymer works. Read this very carefully, twice.
   - [Elements Catalog](https://elements.polymer-project.org/)

<hr>

## The Elements Catalog

[Elements Catalog](https://elements.polymer-project.org/)

- **Iron Elements** - These are the core polymer elements upon which other elements are built.
- **Paper Elements** - Material design elements.
- **Google Web Components** - Components that use Google's API's and services.
- **Gold Elements** - Ecommerce elements.
- **Neon Elements** - Animation and special effects.
- **Platinum Elements** - Offline, push, and more.
- **Molecules** - Wrappers for third-party libraries.

## iron-autogrow-textarea

Creates a text area that will automatically grow larger as the amount of input increases.

#### Exercise

1. Add the iron-autogrow-textarea element to the home page.

    ```html
    ...

    <!-- Main Content -->
        <div class="content">
          <iron-pages attr-for-selected="data-route" selected="{{route}}">
            <section data-route="home" tabindex="-1">

              <!-- Add code here -->
              <paper-material>
                <iron-autogrow-textarea></iron-autogrow-textarea>
              </paper-material>

    ...
    ```

2. You'll also find in the index.html the following, which tells us that all of our component includes should be inside of `elements/elements.html`.

    ```html
    ...
    <link rel="import" href="elements/elements.html">
    ...
    ```

3. Open `elements/elements.html` for editing and add the following under the iron elements section:

    ```html
    <link rel="import" href="../bower_components/iron-autogrow-textarea/iron-autogrow-textarea.html">
    ```