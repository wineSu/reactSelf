import React from './react';
class Child extends React.Component{
    componentWillMount(){
        console.log('子组件将要挂载')
    }
    componentDidMount(){
        console.log('子组件挂载完毕')
    }
    render(){
        return '子组件'
    }
}
class Counter extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            number: 1
        }
    }
    componentWillMount(){
        console.log('父组件将要挂载')
    }
    componentDidMount(){
        console.log('父组件挂载完毕')
    }
    
    render(){
        
        return React.createElement(Child,{onClick:'done'})
    }
}

// function done(){
//     alert(11111111)
// }

// let element = React.createElement('div',{name:'xxx'},'hello', React.createElement('span',{onClick:get},'123'))
// console.log(element)
React.render(React.createElement(Counter, {name: 'ss'}), document.getElementById('root'))