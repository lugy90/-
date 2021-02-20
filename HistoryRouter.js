export default class HistoryRouter {
    currentUrl = '';
    handlers = {};

    constructor() {
        this.refresh = this.refresh.bind(this);
        this.addStateListener();
        window.addEventListener('load', this.refresh, false);
        window.addEventListener('popstate', this.refresh, false);
        window.addEventListener('pushState', this.refresh, false);
        window.addEventListener('replaceState', this.refresh, false);
    }
    addStateListener() {
        const listener = function (type) {
            var orig = history[type];
            return function () {
                var rv = orig.apply(this, arguments);
                var e = new Event(type);
                e.arguments = arguments;
                window.dispatchEvent(e);
                return rv;
            };
        };
        window.history.pushState = listener('pushState');
        window.history.replaceState = listener('replaceState');
    }
    refresh(event) {
        this.currentUrl = location.pathname;
        this.emit('change', location.pathname);
    }
    on(evName, listener) {
        this.handlers[evName] = listener;
    }
    emit(evName, ...args) {
        const handler = this.handlers[evName];
        if (handler) {
            handler(...args);
        }
    }
}