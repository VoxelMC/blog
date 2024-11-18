/**
 * Subscript and Superscript plugin for Remark.
 */
import { visit } from 'unist-util-visit';
export default function supersub() {
    // Superscript
    return tree => {
        visit(tree, ['text'], (node, i, parent) => {
            if (node.type !== 'text') {
                return;
            }
            const { value } = node;
            const values = value.split(/\^/);
            if (values.length === 1 || values.length % 2 === 0) {
                return;
            }
            const children = values.map((str, i) =>
                i % 2 === 0 ?
                    {
                        type: 'text',
                        value: str,
                    }
                :   {
                        type: 'superscript',
                        data: {
                            hName: 'sup',
                        },
                        children: [
                            {
                                type: 'text',
                                value: str,
                            },
                        ],
                    }
            );
            parent.children.splice(i, 1, ...children);
        });
        // Subscript
        visit(tree, ['text'], (node, i, parent) => {
            if (node.type !== 'text') {
                return;
            }
            const { value } = node;
            // eslint-disable-next-line no-useless-escape
            const values = value.split(/\~/);
            if (values.length === 1 || values.length % 2 === 0) {
                return;
            }
            const children = values.map((str, i) =>
                i % 2 === 0 ?
                    {
                        type: 'text',
                        value: str,
                    }
                :   {
                        type: 'subscript',
                        data: {
                            hName: 'sub',
                        },
                        children: [
                            {
                                type: 'text',
                                value: str,
                            },
                        ],
                    }
            );
            parent.children.splice(i, 1, ...children);
        });
    };
}
