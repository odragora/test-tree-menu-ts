import React from 'react'
import Button from 'components/Button'
import { Node as NodeType } from 'components/MainPage'
import { classNames } from 'utils'
import './Tree.scss'

interface TreeProps {
  className?: string,
  data: NodeType[],
}
interface TreeState {}

export default class Tree extends React.Component<TreeProps, TreeState> {
  render(): JSX.Element {
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

interface NodeProps {
  title: React.ReactNode,
}
interface NodeState {
  isExpanded: boolean,
}

class Node extends React.Component<NodeProps, NodeState> {
  state = {
    isExpanded: false,
  }

  handleToggle = (): void => {
    this.setState(state => ({ isExpanded: !state.isExpanded }))
  }

  render(): JSX.Element {
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

function renderNode({
  id, title, nodes = [],
}: NodeType): JSX.Element {
  return nodes.length > 0
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
