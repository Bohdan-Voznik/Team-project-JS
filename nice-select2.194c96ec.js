parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"b4p1":[function(require,module,exports) {
"use strict";function e(e){var t=document.createEvent("MouseEvents");t.initEvent("click",!0,!1),e.dispatchEvent(t)}function t(e){var t=document.createEvent("HTMLEvents");t.initEvent("change",!0,!1),e.dispatchEvent(t)}function i(e){var t=document.createEvent("FocusEvent");t.initEvent("focusin",!0,!1),e.dispatchEvent(t)}function s(e){var t=document.createEvent("FocusEvent");t.initEvent("focusout",!0,!1),e.dispatchEvent(t)}function n(e,t){return e.getAttribute(t)}function o(e,t){return e.getAttribute("data-"+t)}function d(e,t){return!!e&&e.classList.contains(t)}function r(e,t){if(e)return e.classList.add(t)}function l(e,t){if(e)return e.classList.remove(t)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=c,exports.bind=p;var a={data:null,searchable:!1};function c(e,t){this.el=e,this.config=Object.assign({},a,t||{}),this.data=this.config.data,this.selectedOptions=[],this.placeholder=n(this.el,"placeholder")||this.config.placeholder||"Select an option",this.dropdown=null,this.multiple=n(this.el,"multiple"),this.disabled=n(this.el,"disabled"),this.create()}function p(e,t){return new c(e,t)}c.prototype.create=function(){this.el.style.display="none",this.data?this.processData(this.data):this.extractData(),this.renderDropdown(),this.bindEvent()},c.prototype.processData=function(e){var t=[];e.forEach(e=>{t.push({data:e,attributes:{selected:!1,disabled:!1,optgroup:"optgroup"==e.value}})}),this.options=t},c.prototype.extractData=function(){var e=this.el.querySelectorAll("option,optgroup"),t=[],i=[],s=[];e.forEach(e=>{if("OPTGROUP"==e.tagName)var s={text:e.label,value:"optgroup"};else s={text:e.innerText,value:e.value};var n={selected:null!=e.getAttribute("selected"),disabled:null!=e.getAttribute("disabled"),optgroup:"OPTGROUP"==e.tagName};t.push(s),i.push({data:s,attributes:n})}),this.data=t,this.options=i,this.options.forEach(function(e){e.attributes.selected&&s.push(e)}),this.selectedOptions=s},c.prototype.renderDropdown=function(){var e=`<div class="${["nice-select",n(this.el,"class")||"",this.disabled?"disabled":"",this.multiple?"has-multiple":""].join(" ")}" tabindex="${this.disabled?null:0}">\n  <span class="${this.multiple?"multiple-options":"current"}"></span>\n  <div class="nice-select-dropdown">\n  ${this.config.searchable?'<div class="nice-select-search-box">\n<input type="text" class="nice-select-search" placeholder="Search..."/>\n</div>':""}\n  <ul class="list"></ul>\n  </div></div>\n`;this.el.insertAdjacentHTML("afterend",e),this.dropdown=this.el.nextElementSibling,this._renderSelectedItems(),this._renderItems()},c.prototype._renderSelectedItems=function(){if(this.multiple){var e="";"auto"==window.getComputedStyle(this.dropdown).width||this.selectedOptions.length<2?(this.selectedOptions.forEach(function(t){e+=`<span class="current">${t.data.text}</span>`}),e=""==e?this.placeholder:e):e=this.selectedOptions.length+" selected",this.dropdown.querySelector(".multiple-options").innerHTML=e}else{var t=this.selectedOptions.length>0?this.selectedOptions[0].data.text:this.placeholder;this.dropdown.querySelector(".current").innerHTML=t}},c.prototype._renderItems=function(){var e=this.dropdown.querySelector("ul");this.options.forEach(t=>{e.appendChild(this._renderItem(t))})},c.prototype._renderItem=function(e){var t=document.createElement("li");if(t.innerHTML=e.data.text,e.attributes.optgroup)t.classList.add("optgroup");else{t.setAttribute("data-value",e.data.value);var i=["option",e.attributes.selected?"selected":null,e.attributes.disabled?"disabled":null];t.addEventListener("click",this._onItemClicked.bind(this,e)),t.classList.add(...i)}return e.element=t,t},c.prototype.update=function(){if(this.extractData(),this.dropdown){var t=d(this.dropdown,"open");this.dropdown.parentNode.removeChild(this.dropdown),this.create(),t&&e(this.dropdown)}},c.prototype.disable=function(){this.disabled||(this.disabled=!0,r(this.dropdown,"disabled"))},c.prototype.enable=function(){this.disabled&&(this.disabled=!1,l(this.dropdown,"disabled"))},c.prototype.clear=function(){this.selectedOptions=[],this._renderSelectedItems(),this.updateSelectValue(),t(this.el)},c.prototype.destroy=function(){this.dropdown&&(this.dropdown.parentNode.removeChild(this.dropdown),this.el.style.display="")},c.prototype.bindEvent=function(){this.dropdown.addEventListener("click",this._onClicked.bind(this)),this.dropdown.addEventListener("keydown",this._onKeyPressed.bind(this)),this.dropdown.addEventListener("focusin",i.bind(this,this.el)),this.dropdown.addEventListener("focusout",s.bind(this,this.el)),window.addEventListener("click",this._onClickedOutside.bind(this)),this.config.searchable&&this._bindSearchEvent()},c.prototype._bindSearchEvent=function(){var e=this.dropdown.querySelector(".nice-select-search");e&&e.addEventListener("click",function(e){return e.stopPropagation(),!1}),e.addEventListener("input",this._onSearchChanged.bind(this))},c.prototype._onClicked=function(e){if(this.multiple?this.dropdown.classList.add("open"):this.dropdown.classList.toggle("open"),this.dropdown.classList.contains("open")){var t=this.dropdown.querySelector(".nice-select-search");t&&(t.value="",t.focus());var i=this.dropdown.querySelector(".focus");l(i,"focus"),r(i=this.dropdown.querySelector(".selected"),"focus"),this.dropdown.querySelectorAll("ul li").forEach(function(e){e.style.display=""})}else this.dropdown.focus()},c.prototype._onItemClicked=function(e,t){var i=t.target;d(i,"disabled")||(this.multiple?d(i,"selected")?(l(i,"selected"),this.selectedOptions.splice(this.selectedOptions.indexOf(e),1),this.el.querySelector('option[value="'+i.dataset.value+'"]').selected=!1):(r(i,"selected"),this.selectedOptions.push(e)):(this.selectedOptions.forEach(function(e){l(e.element,"selected")}),r(i,"selected"),this.selectedOptions=[e]),this._renderSelectedItems(),this.updateSelectValue())},c.prototype.updateSelectValue=function(){if(this.multiple){var e=this.el;this.selectedOptions.forEach(function(t){var i=e.querySelector('option[value="'+t.data.value+'"]');i&&i.setAttribute("selected",!0)})}else this.selectedOptions.length>0&&(this.el.value=this.selectedOptions[0].data.value);t(this.el)},c.prototype._onClickedOutside=function(e){this.dropdown.contains(e.target)||this.dropdown.classList.remove("open")},c.prototype._onKeyPressed=function(t){var i=this.dropdown.querySelector(".focus"),s=this.dropdown.classList.contains("open");if(32==t.keyCode||13==t.keyCode)e(s?i:this.dropdown);else if(40==t.keyCode){if(s){var n=this._findNext(i);if(n)l(this.dropdown.querySelector(".focus"),"focus"),r(n,"focus")}else e(this.dropdown);t.preventDefault()}else if(38==t.keyCode){if(s){var o=this._findPrev(i);if(o)l(this.dropdown.querySelector(".focus"),"focus"),r(o,"focus")}else e(this.dropdown);t.preventDefault()}else 27==t.keyCode&&s&&e(this.dropdown);return!1},c.prototype._findNext=function(e){for(e=e?e.nextElementSibling:this.dropdown.querySelector(".list .option");e;){if(!d(e,"disabled")&&"none"!=e.style.display)return e;e=e.nextElementSibling}return null},c.prototype._findPrev=function(e){for(e=e?e.previousElementSibling:this.dropdown.querySelector(".list .option:last-child");e;){if(!d(e,"disabled")&&"none"!=e.style.display)return e;e=e.previousElementSibling}return null},c.prototype._onSearchChanged=function(e){var t=this.dropdown.classList.contains("open"),i=e.target.value;if(""==(i=i.toLowerCase()))this.options.forEach(function(e){e.element.style.display=""});else if(t){var s=new RegExp(i);this.options.forEach(function(e){var t=e.data.text.toLowerCase(),i=s.test(t);e.element.style.display=i?"":"none"})}this.dropdown.querySelectorAll(".focus").forEach(function(e){l(e,"focus")}),r(this._findNext(null),"focus")};
},{}]},{},["b4p1"], null)
//# sourceMappingURL=/team-project-js/nice-select2.194c96ec.js.map