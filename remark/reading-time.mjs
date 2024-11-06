import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

export function remarkReadingTime() {
    return (tree, { data }) => {
        const pageText = toString(tree);
        const readingTime = getReadingTime(pageText);

        data.astro.frontmatter.readingTime = readingTime.minutes;
    };
}
