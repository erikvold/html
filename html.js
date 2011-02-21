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

(function(global) {
  var tags = [
    "html", "head", "body", "script", "meta", "title", "link",
    "div", "p", "span", "a", "img", "br", "hr", "em", "strong",
    "table", "tr", "th", "td", "thead", "tbody", "tfoot",
    "ul", "ol", "li", 
    "dl", "dt", "dd",
    "h1", "h2", "h3", "h4", "h5", "h6", "h7",
    "form", "fieldset", "input", "textarea", "label", "select", "option"
  ];

  function appendChildren(ele, children, startIndex) {
    for (var i = startIndex, child; child = children[i]; i++) {
      if (Object.isString(child))
        ele.appendChild(document.createTextNode(child));
      else if (Object.isArray(child))
        appendChildren(ele, child);
      else
        ele.appendChild(child);
    }
    return ele;
  }

  function html_tag(tagName, attrs) {
    var ele = event, events = {}, value, eventMatch = /^on(.+)/i;

    if ((Object.isString(attrs) || Object.isElement(attrs)))
      return appendChildren(new Element(tagName), arguments, 1);

    var oldAttrs = attrs;
    attrs = {};
    for (var prop in oldAttrs) {
      if ((event = prop.match(eventMatch)) && Object.isFunction(oldAttrs[prop])) {
        events[event[1]] = oldAttrs[prop];
      } else {
        attrs[prop] = oldAttrs[prop];
      }
    }

    var ele = new Element(tagName, attrs);
    for (var event in events) ele.observe(event, events[event])

    return appendChildren(ele, arguments, 2);
  }

  for (var i = 0, tag; tag = tags[i]; i++) global[tag] = html_tag.bind({}, tag);

  tags = html_tag = null
})(this);
