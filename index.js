var chalk = require('chalk');

const packageJson = require(process.cwd() + '/package.json');
const scripts = packageJson.scripts || {};
const scriptsHelpConfig = getScriptsHelpConfig();
const search = specificScript = process.argv[2];

if (scriptsHelpConfig['man-message']) {
  console.log('======================================================================');
  console.log('                                             .__        __          ');
  console.log('   ____ ______   _____     ______ ___________|__|______/  |_  ______');
  console.log('  /    \\\\____ \\ /     \\   /  ___// ___\\_  __ \\  \\____ \\   __\\/  ___/');
  console.log(' |   |  \\  |_> >  Y Y  \\  \\___ \\\\  \\___|  | \\/  |  |_> >  |  \\___ \\ ');
  console.log(' |___|  /   __/|__|_|  / /____  >\\___  >__|  |__|   __/|__| /____  >');
  console.log('      \\/|__|         \\/       \\/     \\/         |__|             \\/ ');
  console.log(' ');
  console.log(`${packageJson.name} ${packageJson.version} (forked from talarari/npm-scripts-help)`);
  console.log('Copyright (c) 2016 Open Source Community and/or its affiliates.');
  console.log('======================================================================');
  console.log(' ');
  console.log(getDesc(scriptsHelpConfig['man-message']));
  console.log(' ');
}

Object.keys(scripts)
  .filter(function (scriptName) {
    if (!search) return true;
    return new RegExp(search).test(scriptName)
  })
  .map(getScriptHelp)
  .filter(sh => sh !== undefined)
  .map(printScriptHelp)
;

function getScriptHelp(scriptName) {
  var script = scripts[scriptName] || '';
  var currentScriptHelp = scriptsHelpConfig[scriptName];

  if (typeof currentScriptHelp === 'string' || Array.isArray(currentScriptHelp)) {
    currentScriptHelp = {
      "Description": getDesc(currentScriptHelp)
    }
  }

  if (currentScriptHelp !== undefined) {
    return Object.assign({}, {
      name: scriptName,
      Script: script
    }, currentScriptHelp);
  }
}

function printScriptHelp(help) {
  console.log(chalk.gray('npm run ') + chalk.cyan(help.name));

  Object.keys(help).filter(function (key) {
    return key !== 'name' && key !== 'Script';
  })
    .forEach(function (helpKey) {
      var desc = getDesc(help[helpKey]);
      if (helpKey === 'Script') {
        console.log(chalk.gray(desc));
      } else {
        console.log(desc);
      }
    })
    ;
}

function getDesc(line) {
  if (!line) return '';

  if (typeof line === 'string') {
    return line + '\n';
  }

  if (Array.isArray(line) && line.length > 0 && typeof line[0] === 'string') {
    return formatMultiLine(line);
  }
  return '';
}

function formatMultiLine(multiline) {
  return multiline.join('\n') + '\n';
}

function getScriptsHelpConfig() {
  try {
    return require(process.cwd() + '/.scriptsmanrc.js');
  }
  catch (err) {
    return packageJson['scriptsman'] || {};
  }

}
