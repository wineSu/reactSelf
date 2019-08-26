import $ from 'jquery';
class Unit{
    //父类保存参数
    constructor(element){
        this.currentElement = element
    }
}

class ReactTextUnit extends Unit{
    getMarkUp(rootId){
        //保存当前元素id
        this._rootId = rootId;
        return `<span data-reactid="${rootId}">${this.currentElement}</span>`;
    }
}

class ReactNativeUnit extends Unit{
    getMarkUp(rootId){
        //保存当前元素id
        this._rootId = rootId;
        let {type, props} = this.currentElement;
        let tagStart = `<${type} data-reactid="${rootId}"`;
        let tagEnd = `</${type}>`;
        let contentStr;
        for(let propName in props){
            if(/on[A-Z]/.test(propName)){
                let eventType = propName.slice(2).toLowerCase() //click点击事件
                $(document).on(eventType,`[data-reactid="${rootId}"]`, props[propName])
            }else if(propName === 'children'){
                contentStr = props[propName].map((child, idx)=>{
                    //递归循环子节点
                    let childInstance = createReactUnit(child)
                    return childInstance.getMarkUp(`${rootId}.${idx}`)
                }).join('');
            }else{
                tagStart += (`${propName} = ${props[propName]}`)
            }
        }
        return tagStart + '>' + contentStr + tagEnd
    }
}

class ReactCompositUnit extends Unit{
    getMarkUp(rootId){
        this._rootId = rootId
        let {type: Component, props} = this.currentElement
        let ComponentInstance = new Component(props)
        ComponentInstance.componentWillMount && ComponentInstance.componentWillMount()
        //render中返回值
        let reactRender = ComponentInstance.render()
        let reactCompositUnitInstance = createReactUnit(reactRender)
        let markup = reactCompositUnitInstance.getMarkUp(rootId);
        //发布订阅  借助jq实现
        $(document).on('mounted', ()=>{
            ComponentInstance.componentDidMount && ComponentInstance.componentDidMount()
        })
        return markup
    }   
}

function createReactUnit(element){
    if(typeof element == 'string' || typeof element == 'number'){
        return new ReactTextUnit(element)
    }
    if(typeof element == 'object' && typeof element.type == 'string'){
        console.log(111111111111111)
        return new ReactNativeUnit(element)
    }
    
    if(typeof element === 'object' && typeof element.type == 'function'){
        return new ReactCompositUnit(element)
    }
}

export default createReactUnit