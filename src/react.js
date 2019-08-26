import $ from 'jquery';
import createReactUnit from './unit.js';
import createElement from './element.js';
import Component from './Component.js';

let React = {
    render,
    nextRootIndex: 0,
    createElement,
    Component
}

//给每个元素添加属性
function render(element, container){
    let createReactUnitInstance = createReactUnit(element);
    let markUp = createReactUnitInstance.getMarkUp(React.nextRootIndex);
    $(container).html(markUp);
    $(document).trigger('mounted');
}

export default React