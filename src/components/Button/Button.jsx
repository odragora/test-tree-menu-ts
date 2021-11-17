import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from 'utils'
import './Button.scss'

export default function Button({
  className, children, ...rest
}) {
  return (
    <button
      className={classNames(className, 'Button')}
      {...rest}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}
