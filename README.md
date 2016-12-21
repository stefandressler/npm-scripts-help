# npm-scripts-man
prints documentation for npm scripts.

## Install
```
npm i --save-dev npm-scripts-man
```

add help script to your package json's scripts

```
scripts:{
  "build" : "node build.js",
  "start": "node start.js",
  "help": "node node_modules/npm-scripts-man"
}

```

## Run
To see all scripts:
```
npm run man
```
to filter scripts:
```
npm run man [regex]
```

# adding documentation to scripts:

## inside package.json
add a property called scriptsman in the root of package.json like this:
```
"scriptsman" : {
  "man-message" : [
    "some explanation that will show on the top",
    "it can be multiple lines if you use an array",
    "or a single line if you use a string"
  ],
  "build" :"this will build the project",
  "start" : {
    "Desciption": "will run the project",
    "Usage": "npm start [--arg1]",
    "Long Description" : [
      "this is the first line",
      "this is the second line"
    ]
  }
}
```

## in .scriptsmanrc.js file
add a file in the root of the project, next to package.json called scriptsmanrc.js and export the scriptsman object
```
module.exports = {
  "man-message" : [
    "some explanation that will show on the top",
    "it can be multiple lines if you use an array",
    "or a single line if you use a string"
  ],
  "build" :"this will build the project",
  "start" : {
    "Desciption": "will run the project",
    "Usage": "npm start [--arg1]",
    "Long Description" : [
      "this is the first line",
      "this is the second line"
    ]
  }
};
```


## scripts man object syntax
* scriptsman must be an object.
* "man-message" is a special property that will show a general message before the scripts docs.
* add a key with a name matching any script you have in your npm scripts.    
values can be strings for single line description, arrays for multiline or objects.    
objects can contain any key as long as their value is a string or a string array.







