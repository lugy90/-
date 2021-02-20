export default class HashRouter {
    currentUrl = '';
    handlers = {};

    constructor() {
        this.refresh = this.refresh.bind(this);
        window.addEventListener('load', this.refresh, false);
        window.addEventListener('hashchange', this.refresh, false);
    }

    getHashPath(url) {
        const index = url.indexOf('#');
        if (index >= 0) {
            return url.slice(index + 1);
        }
        return '/';
    }

    refresh(event) {
        let curURL = '',
        oldURL = null;
        if (event.newURL) {
            oldURL = this.getHashPath(event.oldURL || '');
            curURL = this.getHashPath(event.newURL || '');
        } else {
            curURL = this.getHashPath(window.location.hash);
        }
        this.currentUrl = curURL;
        // 当hash路由发生变化时，则触发change事件
        this.emit('change', curURL, oldURL);
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