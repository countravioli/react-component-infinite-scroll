import React from 'react';
import test from 'tape-catch';
import sinon from 'sinon';
import ReactDOM from 'react-dom';

import { mount } from 'enzyme';
import { createDom, EmptyComponent, createEvent, destroyDom } from './helpers';

import InfiniteScroll from '../infinite';

test('InfiniteScroll component', t => {
  const findDOMNode = sinon.stub(ReactDOM, 'findDOMNode');

  t.test('scroll when close to viewport bottom', t => {
    createDom();
    const FakeComponent = EmptyComponent;
    const props = {
      nextPage: sinon.spy(),
      threshold: 100
    };

    // Make React return a fake position of the InfiniteScroll Component
    const fakeNode = {
      offsetTop: 0,      // InfiniteScroll space from top browser
      offsetHeight: 200  // InfiniteScroll component height
    };
    findDOMNode.returns(fakeNode);

    // Force window to have 50px height so scroll should trigger on scroll
    global.window.scrollY = 0;
    global.window.innerHeight = 50;

    mount(
      <InfiniteScroll {...props}>
        <FakeComponent/>
      </InfiniteScroll>
    );

    t.ok(props.nextPage.notCalled,
      'Should not call nextPage when enough elements are on the page');

    global.window.scrollY = 100;
    const event = createEvent(global.document, 'scroll');
    global.window.dispatchEvent(event);

    t.ok(props.nextPage.calledOnce,
      'Should call nextPage after scroll event and there are not enough elements under the fold');

    destroyDom();
    t.end();
  });

  t.test('call for more pages if theres no enough items in the page to paginate', t => {
    createDom();
    const FakeComponent = EmptyComponent;
    const props = {
      nextPage: sinon.spy(),
      threshold: 100
    };

    // Make React return a fake position of the InfiniteScroll Component
    const fakeNode = {
      offsetTop: 0,      // InfiniteScroll space from top browser
      offsetHeight: 100  // InfiniteScroll component height
    };
    findDOMNode.returns(fakeNode);

    // Force window to have 100px height so scroll should trigger on scroll
    global.window.scrollY = 0;
    global.window.innerHeight = 150;

    mount(
      <InfiniteScroll {...props}>
        <FakeComponent/>
      </InfiniteScroll>
    );

    t.ok(props.nextPage.calledOnce,
      'Should call nextPage');

    destroyDom();
    t.end();
  });

  t.test('scroll when close to viewport bottom', t => {
    createDom();
    const FakeComponent = EmptyComponent;
    const props = {
      nextPage: sinon.spy(),
      threshold: 100
    };

    // Make React return a fake position of the InfiniteScroll Component
    const fakeNode = {
      offsetTop: 0,      // InfiniteScroll space from top browser
      offsetHeight: 200  // InfiniteScroll component height
    };
    findDOMNode.returns(fakeNode);

    // Force window to have 50px height so scroll should trigger on scroll
    global.window.scrollY = 0;
    global.window.innerHeight = 50;

    const wrapper = mount(
      <InfiniteScroll {...props}>
        <FakeComponent/>
      </InfiniteScroll>
    );

    t.ok(props.nextPage.notCalled,
      'Should not call nextPage when enough elements are on the page');

    // Simulate an unmount of the component
    const component = wrapper.instance();
    component.componentWillUnmount();

    global.window.scrollY = 100;
    const event = createEvent(global.document, 'scroll');
    global.window.dispatchEvent(event);

    t.ok(props.nextPage.notCalled,
      'Should not call nextPage when enough elements are on the page');

    destroyDom();
    t.end();
  });
});
