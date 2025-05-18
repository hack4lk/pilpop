export function History() {
    this.history = [];

    this.add = function (action, pill) {
        this.history.push({action: action, pill: pill});
    };
    this.remove = function () {
        this.history.pop();
    };
    this.getHistory = function () {
        return this.history;
    };
}