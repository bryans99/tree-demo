import React, { Component } from 'react'
import './App.css';
import { TreeNode } from './TreeNode'
import { Story } from './Story'
import { Comment } from './Comment'
const items = [
  {
    "by": "ChrisRackauckas",
    "descendants": 12,
    "id": 20477873,
    "kids": [20478583, 20478493],
    "kidNodes": [
      {
        "by": "KenoFischer",
        "id": 20478583,
        "parent": 20477873,
        "text": "Happy that this paper finally made it to arxiv. The biggest reason for writing it was to try and showcase some of the breadth of applications we see for really high quality first class AD support at the language level. There are several communities that need this technology, so it makes sense to try and build one system that can address all of them and share tricks. I&#x27;m also hoping this gives people a sense of why our list of feature requirements for this system is so extensive (pervasive custom gradients, higher order AD, mixed mode, ultra fast scalar AD, etc). These days AD is often discussed only in the context of deep learning, but as the frontiers of deep learning are pushed and hybrid models become more and more popular, I&#x27;m expecting our focus on generality to pay off here.",
        "time": 1563544017,
        "type": "comment"
      },
      {
        "by": "endoftime5",
        "id": 20478493,
        "kids": [20478516],
        "parent": 20477873,
        "text": "I’ve just given this a cursory read but wanted to say that this looks really exciting. Julia in general seems like such an exciting language.<p>I’ve recently switched some Fortran simulations at work for a pure Julia implementation and it is great fun to write. DifferentialEquations is a phenomenal piece of work!",
        "time": 1563543362,
        "type": "comment"
      }
    ],
    "score": 114,
    "time": 1563537523,
    "title": "A Differentiable Programming System to Bridge ML and Scientific Computing",
    "type": "story",
    "url": "https://arxiv.org/abs/1907.07587"
  },
  {
    "by": "moioci",
    "descendants": 11,
    "id": 20477740,
    "kids": [20478811, 20477791],
    "kidNodes": [
      {
        "by": "secure",
        "id": 20478811,
        "kids": [20478915],
        "kidNodes": [
          {
            "by": "moioci",
            "id": 20478915,
            "kids": [20479274],
            "parent": 20478811,
            "text": "not the author, just a non-techy person who wants to try org mode without the complexity of emacs.",
            "time": 1563546515,
            "type": "comment"
          }
        ],
        "parent": 20477740,
        "text": "This looks cool!<p>But could you (if you are the author?) please restrict the Google Drive permissions from “See, edit, create and delete all of your Google Drive files” to only affect a sub directory of my drive please? That’s best practice for isolation.<p>Thanks!",
        "time": 1563545731,
        "type": "comment"
      },
      {
        "by": "fock",
        "id": 20477791,
        "kids": [20478856, 20478694, 20478556],
        "kidNodes": [
          {
            "by": "iamnothere",
            "id": 20478856,
            "parent": 20477791,
            "text": "More backends have been considered: <a href=\"https:&#x2F;&#x2F;github.com&#x2F;DanielDe&#x2F;org-web&#x2F;issues&#x2F;5\" rel=\"nofollow\">https:&#x2F;&#x2F;github.com&#x2F;DanielDe&#x2F;org-web&#x2F;issues&#x2F;5</a><p>Would be nice to see Syncthing support.",
            "time": 1563546090,
            "type": "comment"
          },
          {
            "by": "yourfate",
            "id": 20478694,
            "parent": 20477791,
            "text": "This is the problem I also have with this. Give it a git backend, and I might use it. Even an s3 backend would be ok.",
            "time": 1563544763,
            "type": "comment"
          },
          {
            "by": "imglorp",
            "id": 20478556,
            "parent": 20477791,
            "text": "Encrypt the file and throw on IPFS?",
            "time": 1563543797,
            "type": "comment"
          }
        ],
        "parent": 20477740,
        "text": "looks nice! though the focus on proprietary API-based backends (?!) is a bit puzzling? how about commiting to a git repo on the web server. Running within nextcloud?",
        "time": 1563536686,
        "type": "comment"
      }
    ],
    "score": 95,
    "time": 1563536257,
    "title": "Org-mode on web, built with React, for mobile, synced with Dropbox, Google Drive",
    "type": "story",
    "url": "https://github.com/DanielDe/org-web"
  }
]

const itemsToNodes = (items) => {
  return items.map(item => {
    return {
      id: item.id,
      label: item.type === 'story' ? `story by ${item.by}` : `comment by ${item.by}`,
      childNodes: itemsToNodes(item.kidNodes || [])
    }
  })
}

const childNodes = itemsToNodes(items)

const findItem = (items, id) => {
  let item = items.find(item => item.id === id)
  if (item) {
    return item
  }
  items.some(childItem => {
    if (childItem.kidNodes) {
      item = findItem(childItem.kidNodes, id)
    }
    return item
  });
  if (item) {
    return item
  }
}


export class App extends Component {
  state = {
    selectedItem: undefined
  }

  selected = (id) => {
    const item = findItem(items, id)
    this.setState({ selectedItem: item })
  }

  render() {
    const { selectedItem } = this.state
    return (
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ width: '50%' }}>
          <TreeNode label='News' level={0} childNodes={childNodes} onSelect={this.selected} />
        </div>
        <div style={{ width: '50%' }}>
          {selectedItem && selectedItem.type === 'story' && <Story item={selectedItem} />}
          {selectedItem && selectedItem.type !== 'story' && <Comment item={selectedItem} />}
        </div>
      </div >
    )

  }
}

export default App;
