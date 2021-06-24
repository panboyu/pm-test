import { DOMParser } from 'prosemirror-model'
import { schema } from "prosemirror-schema-basic"
import { EditorState } from "prosemirror-state"
import { EditorView } from "prosemirror-view"
import { undo, redo, history } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { baseKeymap } from 'prosemirror-commands'

import placeholder from './plugins/placeholder'

import './index.css'

let state = EditorState.create({
  // schema,
  doc: DOMParser.fromSchema(schema).parse(document.querySelector('#root')),
  plugins: [
    history(),
    keymap({ 'Mod-z': undo, 'Mod-y': redo }),
    keymap(baseKeymap),
    placeholder('这一刻你在想什么...')
  ]
})

let view = new EditorView(document.querySelector('#root'), {
  state,
  dispatchTransaction(tr) {
    console.log('==tr==', tr)
    let newState = view.state.apply(tr)
    view.updateState(newState)
  }
})
