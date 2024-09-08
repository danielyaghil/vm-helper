class VmConsole {
    _logs = '';
    _errors = '';
    _success = false;
    _output = null;

    constructor() {}

    log(message) {
        this._logs += message + '\n';
    }

    error(message) {
        this._errors += message + '\n';
    }

    output(obj) {
        this._output = obj;
    }

    success() {
        this._success = true;
    }
}

module.exports = VmConsole;
