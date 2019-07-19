import React, { Component } from 'react'
import styled from 'styled-components'

export class TreeNode extends Component {
    state = {
        expanded: false
    }

    toggle = () => {
        this.setState(prevState => {
            return { expanded: !prevState.expanded }
        })
    }

    onClicked(id) {
        const { onSelect } = this.props
        onSelect(id)
    }

    render() {
        const { expanded } = this.state
        const buttonLabel = expanded ? '-' : '+'
        const { label, childNodes, id, onSelect } = this.props
        return (
            <>
                <TreeNodeWrapper>
                    <TreeNodeButton onClick={this.toggle}>{buttonLabel}</TreeNodeButton>
                    <span onClick={this.onClicked.bind(this, id)}>{label}</span>
                    {childNodes && expanded && childNodes.map(childNode => <TreeNode {...childNode} key={childNode.id} onSelect={onSelect} />)}
                </TreeNodeWrapper>
            </>
        )
    }
}

const TreeNodeWrapper = styled.div`
    margin: 10px;
`
const TreeNodeButton = styled.button`
    margin-right: 5px;
    width: 20px;
    padding-left: 2px;
    padding-right: 2px;
`