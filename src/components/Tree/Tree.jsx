import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import { classNames } from 'utils'
import './Tree.scss'

export default class Tree extends React.Component {
  render() {
    const { className, data } = this.props

    return (
      <div className={classNames(className, 'Tree')}>
        {data.map(item => renderNode({
          id: item.id,
          title: item.title,
          nodes: item.nodes,
        }))}
      </div>
    )
  }
}

Tree.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
}

class Node extends React.Component {
  state = {
    isExpanded: false,
  }

  handleToggle = () => {
    this.setState(state => ({ isExpanded: !state.isExpanded }))
  }

  render() {
    const { title, children } = this.props
    const { isExpanded } = this.state

    return (
      <div className='Tree_node'>
        <div className='Tree_nodeBody'>
          <div className='Tree_nodeControls'>
            {
              Boolean(children) && Boolean(React.Children.count(children))
                ? (
                  <Button
                    className='Tree_nodeControl'
                    onClick={this.handleToggle}
                  >
                    {
                      isExpanded
                        ? '–'
                        : '+'
                    }
                  </Button>
                )
                : (
                  <div className='Tree_nodeControl'>
                    •
                  </div>
                )
            }
          </div>
          <Button
            className='Tree_nodeContent'
            title='Click to log the node data to the console!'
            onClick={() => console.log('Clicked node:', title)}
          >
            {title}
          </Button>
        </div>
        <div className='Tree_nodeChildren'>
          {Boolean(isExpanded) && (
            children
          )}
        </div>
      </div>
    )
  }
}

Node.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node,
}

function renderNode({
  id, title, nodes,
}) {
  return nodes
    ? (
      <Node
        key={id}
        title={title}
      >
        {nodes.map(node => (
          renderNode({ id: node.id, title: node.title, nodes: node.nodes })
        ))}
      </Node>
    )
    : (
      <Node key={id} title={title} />
    )
}
