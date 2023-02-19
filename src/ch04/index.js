import Application from "./components/Application.js";
import Footer from "./components/Footer.js";
import List from "./components/List.js";


//* window.customElements: 사용자 정의 HTML 요소를 만들고 등록하는 데 사용됩니다.
window.customElements.define('todomvc-app', Application);
window.customElements.define('todomvc-footer', Footer);
window.customElements.define('todomvc-list', List);