class VmConsole {
  _logs = '';
  _errors = '';
  _success = false;

  constructor() {}

  log(message) {
    this._logs += message + '\n';
  }

  error(message) {
    this._errors += message + '\n';
  }

  success() {
    this._success = true;
  }
}

module.exports = VmConsole;
