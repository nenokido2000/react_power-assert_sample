import { jsdom } from 'jsdom';
import assert from 'power-assert';
import React from 'react';
import ReactDOM  from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import CommentBox from '../components/CommentBox';


describe('CommentBox', () => {
    before(() => {
        global.document = jsdom('<!doctype html><html><body></body></html>');
        global.window = document.defaultView;
        global.navigator = global.window.navigator;
    });

    it('display h2', () => {
        const component = TestUtils.renderIntoDocument(<CommentBox />);
        const h2 = TestUtils.findRenderedDOMComponentWithTag(component, 'h2');
        assert.equal(h2.innerHTML, 'Comments');
    });
});