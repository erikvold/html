/*
Copyright (C) 2011 by Erik Vold

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

(function() {
  var tags = [
    "html", "head", "body", "script", "meta", "title", "link",
    "div", "p", "span", "a", "img", "br", "hr", "em", "strong",
    "table", "tr", "th", "td", "thead", "tbody", "tfoot",
    "ul", "ol", "li", 
    "dl", "dt", "dd",
    "h1", "h2", "h3", "h4", "h5", "h6", "h7",
    "form", "fieldset", "input", "textarea", "label", "select", "option"
  ];

  function appendChildren(ele, children) {
    for (var i = 0, child; child = children[i]; i++) {
      if (Object.isString(child))
        ele.appendChild(document.createTextNode(child));
      else if (Object.isArray(child)) {
        appendChildren(ele, child);
      } else {
        ele.appendChild(child);
      }
    }
  }

  function html_tag(tagName, attrs) {
    var hasAttrs = !((Object.isString(attrs) || Object.isElement(attrs))),
        ele = new Element(tagName, hasAttrs ? attrs : {});

    appendChildren(ele, Array.prototype.slice.call(arguments, hasAttrs ? 2 : 1));

    return ele;
  }

  for (var i = 0, tag; tag = tags[i]; i++) window[tag] = html_tag.bind({}, tag);

  tags = html_tag = null
})();
