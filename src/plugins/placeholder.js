import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

const pluginKey = new PluginKey('placeholder');

const placeholder = (text) => {
  return new Plugin({
    key: pluginKey,
    props: {
      decorations(state) {
        const { doc } = state;
        const { childCount, firstChild } = doc;
        if (
          childCount === 1 &&
          firstChild?.isTextblock &&
          firstChild?.content.size === 0
        ) {
          const span = document.createElement('span');
          span.style.color = '#ccc';
          span.textContent = text;
          return DecorationSet.create(doc, [Decoration.widget(1, span)]);
        }
      },
    },
  });
};

export default placeholder