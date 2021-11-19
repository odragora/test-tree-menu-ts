import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from 'utils'
import './Button.scss'

interface Props extends React.ComponentPropsWithoutRef<'button'> {}

export default function Button({
  className, children, ...rest
}: Props): JSX.Element {
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
