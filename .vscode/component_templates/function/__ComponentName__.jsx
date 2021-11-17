import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from 'utils'
import './__ComponentName__.scss'

export default function __ComponentName__({
  className,
}) {
  return (
    <div className={classNames(className, '__ComponentName__')}>
      __ComponentName__ Component
    </div>
  )
}

__ComponentName__.propTypes = {
  className: PropTypes.string,
}
