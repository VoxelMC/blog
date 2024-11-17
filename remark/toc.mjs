// This is a forked version of remark-toc
// I forked it so that I could make it work with remark-callouts!

/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast-util-toc').Options} Options
 */

import { toc } from 'mdast-util-toc';

/**
 * Generate a table of contents (TOC).
 *
 * Looks for the first heading matching `options.heading` (case insensitive),
 * removes everything between it and an equal or higher next heading, and
 * replaces that with a list representing the rest of the document structure,
 * linking to all further headings.
 *
 * @param {Readonly<Options> | null | undefined} [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
export default function remarkToc(options) {
    const settings = {
        ...options,
        heading:
            (options && options.heading) || '(table[ -]of[ -])?contents?|toc',
        tight:
            options && typeof options.tight === 'boolean' ?
                options.tight
            :   true,
    };

    /**
     * Transform.
     *
     * @param {Root} tree
     *   Tree.
     * @returns {undefined}
     *   Nothing.
     */
    return function (tree) {
        const result = toc(tree, settings);

        if (
            result.endIndex === undefined ||
            result.endIndex === -1 ||
            result.index === undefined ||
            result.index === -1 ||
            !result.map
        ) {
            return;
        }

        // Here is the callout magic.
        let inner = {
            type: 'paragraph',
            children: [
                { type: 'text', value: '[!toc]- ' },
                {
                    type: 'strong',
                    children: [
                        {
                            type: 'text',
                            value: 'Table of Contents',
                        },
                    ],
                },
                { type: 'break' },
                result.map,
            ],
        };
        let wrapper = {
            type: 'blockquote',
            children: [inner],
        };

        tree.children = [
            ...tree.children.slice(0, result.index - 1),
            wrapper,
            ...tree.children.slice(result.endIndex),
        ];
    };
}
