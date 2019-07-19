import React, { Component } from 'react'

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
        const { label, level, childNodes, id, onSelect } = this.props
        const newLevel = level + 1
        return (
            <>
                <div style={{ marginLeft: newLevel * 10 }}>
                    <button onClick={this.toggle}>{buttonLabel}</button>
                    <span onClick={this.onClicked.bind(this, id)}>{label}</span>
                </div>
                {childNodes && expanded && childNodes.map(childNode => <TreeNode {...childNode} key={childNode.id} level={newLevel} onSelect={onSelect} />)}
            </>
        )
    }
}