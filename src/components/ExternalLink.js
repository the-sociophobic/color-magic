import React from 'react'


const ExternalLink = props =>
  <a
    className={props.className}
    href={props.to}
    target={props.newTab ? "_blank" : ""}
    rel="noopener noreferrer"
  >
    {props.children}
  </a>


export default ExternalLink