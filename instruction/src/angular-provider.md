# AngularJS Providers

<hr>

## About Providers

> [The] Provider recipe is the core recipe type and all the other recipe types [constant, value, factory, and service] are just syntactic sugar on top of it. It is the most verbose recipe with the most abilities, but for most services it's overkill.
>
> https://docs.angularjs.org/guide/providers

- Providers run in two parts, during the configuration phase and the run phase.
- Providers accept application wide configuration.
- Providers must define a `$get` function.

### Example Code

**Define a Provider**

```js
var app = angular.module('app', []);

app.provider('defaultValue', function() {
    var defaultValue;
    
    // 'this' and its properties are only accessible during the configuration phase 
    this.defaultValue = function(value) {
        defaultValue = value;
    };
    
    // whatever $get returns will be it's factory during the run phase
    this.$get = [function() {
    
        return function(value) {
            return arguments.length > 0 ? value : defaultValue; 
        };
        
    });
    
});
```

**Configure the Provider**

Notice that the provider was named "defaultValue" but during the configuration phase the word "Provider" is added to the end of the name, making it "defaultValueProvider". This happens for all providers.

```js
app.config(['defaultValueProvider', function(defaultValueProvider) {
    defaultValueProvider.defaultValue('Hello, World!');
});
```

**Use the Provider During Run Time**

The provider returns what was in $get as a factory. You can use that factory in controllers, services, other factories, etc. so long as it is during the run phase.

```js
app.run(['defaultValue', function(defaultValue) {
    var value1 = defaultValue('Hello, Bob!');
    var value2 = defaultValue();
    
    console.log(value1);    // "Hello, Bob!"
    console.log(value2);    // "Hello, World!"
});
```

