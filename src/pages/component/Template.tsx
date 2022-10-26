import React from 'react'
import components from '../../components/index';

interface TemplateProps{
  tag: string,
  props?: any,
  children?: any[]
}

// 递归遍历装配组件
function renderJson(json:JSON) {
  
  return (
    
  )
}


const Template = (props: TemplateProps) => {
  console.log(props)
  return <>
    {React.createElement(components[props.tag], props.props)}
    {React.createElement(components["Card"], {title: '没问题'}, [])}
  </>
}


export default Template