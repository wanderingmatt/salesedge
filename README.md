# SalesEdge

Corporate site for SalesEdge — Corporate introductory services.

## Setup

The site is compiled and deployed via Gulp functions. You will need [Homebrew](https://brew.sh/), [Node](https://nodejs.org/en/download/package-manager), and [Gulp](http://gulpjs.com/) installed.

##### Install Homebrew

`$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

##### Install Node via Homebrew

`$ brew install node`

##### Install Gulp Globally

`$ npm install -g gulp`

##### Install Remaining Development Dependencies

`$ npm install` (from project root)

## Developing

##### Running

The `default` Gulp task will start a server, watch the `src` directory, compile changes to the `dist` directory, and live reload the browser window. You can run the `default` task from the project root folder by typing:

`$ gulp`

##### Updating Dependencies

If you ever want to update the Development Dependencies for the project, you can do so using [Check Updates](https://www.npmjs.com/package/npm-check-updates).

###### Install Check Updates

`$ npm install -g npm-check-updates`

###### Update Dependency Hints and Install New Versions

```
$ ncu -u
$ npm install
```


## Deploying

The site is hosted under a custom domain on Github Pages. The `deploy` Gulp task will copy everything in the `dist` folder to the `gh-pages` branch and push it to Github. You can run the `deploy` task from the project root folder by typing:

`$ gulp deploy`
