import React from 'react'
import PropTypes from 'prop-types'
import Rehype2react from 'rehype-react'


const { Compiler } = new Rehype2react({ createElement: React.createElement })

function RenderAst({ ast }) {
  if (!ast) {
    return null
  }
  return Compiler(ast)
}

RenderAst.propTypes = {
  ast: PropTypes.object,
}

export default RenderAst
