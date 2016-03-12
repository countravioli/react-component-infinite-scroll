import jsdom from 'jsdom';
import React from 'react';

export const createDom = () => {
  const document = jsdom.jsdom('<html><body></body></html>');
  const defaultView = document.defaultView;
  global.document = document;
  global.window = defaultView;
  global.navigator = window.navigator;

  return document;
};

export const createEvent = (document, type) => {
  const event = document.createEvent('HTMLEvents');
  event.initEvent(type, true, true);
  return event;
};

export const destroyDom = () => {
  delete global.document;
  delete global.window;
  delete global.navigator;
};

export const EmptyComponent = React.createClass({
  render() {
    return (<div></div>);
  }
});
