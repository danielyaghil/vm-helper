var vm = require('vm');
var VmConsole = require('./wm-console');

async function vmRun(script, variables, timeout = 180000) {
  try {
    const scriptText = `
'use strict';
async function run() {
    try {
        ${script}
    } catch (error) {
        if (error) {
            if (error instanceof Error) {
                if (error.message) {
                    console.error(error.message);
                }
                if (error.stack) {
                    console.error(error.stack);
                }
            } else if (typeof error === 'string') {
                console.error(error);
            } else if (typeof error === 'object') {
                console.error(JSON.stringify(error));
            } else {
                console.error('Error::', typeof error);
            }
        }
        return;
    }
    console.success();
}

run();
`;
    const _console = new VmConsole();
    var sandbox = {
      console: _console,
      fetch: fetch,
    };

    Object.keys(variables).forEach((key) => {
      sandbox[key] = variables[key];
    });

    vm.createContext(sandbox); // Contextify the object.
    let vmScript = new vm.Script(scriptText);
    let options = {
      timeout: timeout,
      displayErrors: true,
      breakOnSigint: true,
    };
    await vmScript.runInContext(sandbox, options); // Execute the code in the context.
    return {
      success: _console._success,
      logs: _console._logs,
      errors: _console._errors,
      output: _console._output,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      logs: '',
      errors: error,
      output: null,
    };
  }
}

module.exports = vmRun;
