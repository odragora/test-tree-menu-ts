import React from 'react'
import { classNames, fileToJSON } from 'utils'
import Tree from 'components/Tree'
import './MainPage.scss'

export interface Node {
  id: number,
  title: string,
  nodes?: Node[],
}

interface Props {
  className?: string,
}
interface State {
  treeData: Node[],
}

const MOCK_DATA = [
  {
    id: 1,
    title: 'Node 1',
    nodes: [],
  },
  {
    id: 2,
    title: 'Node 2',
    nodes: [],
  },
  {
    id: 3,
    title: 'Node 3',
    nodes: [
      {
        id: 4,
        title: 'Node 3-1',
        nodes: [
          {
            id: 7,
            title: 'Node 3-1-1',
            nodes: [],
          },
          {
            id: 8,
            title: 'Node 3-1-2',
            nodes: [],
          },
        ],
      },
      {
        id: 5,
        title: 'Node 3-2',
        nodes: [],
      },
      {
        id: 6,
        title: 'Node 3-3',
        nodes: [],
      },
    ],
  },
]

export default class MainPage extends React.Component<Props, State> {
  state: State = {
    treeData: MOCK_DATA,
  }

  handleFileUpload: React.ChangeEventHandler<HTMLInputElement> = async(e) => {
    if (e.target.files === null) {
      return
    }

    const file = e.target.files[0]
    const jsonData = await fileToJSON(file)

    this.setState({ treeData: jsonData as Node[] })
  }

  render(): JSX.Element {
    const { className } = this.props
    const { treeData } = this.state

    return (
      <div className={classNames(className, 'MainPage')}>
        <div className='MainPage_tree'>
          <h2 className='MainPage_header'>
            Data Tree
          </h2>

          <Tree data={treeData} />

          <div className='MainPage_upload'>
            <h2 className='MainPage_header'>
              Upload a JSON file
            </h2>

            <input
              className='MainPage_uploadInput'
              type='file'
              onChange={this.handleFileUpload}
            />
          </div>
        </div>
      </div>
    )
  }
}
