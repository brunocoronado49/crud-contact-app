import userstore from '../../store/user-store';
import {renderTable} from '../render-table/render-table';
import './render-buttons.css';

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderButtons = (element) => {
    const contentButton = document.createElement('div');
    contentButton.className = 'content-buttons';

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next Page >';

    const previousButton = document.createElement('button');
    previousButton.innerText = '< Previous Page';

    const currentPageLabel = document.createElement('span');
    currentPageLabel.id = 'current-page';
    currentPageLabel.innerText = userstore.getCurrentPage();

    contentButton.append(previousButton, currentPageLabel, nextButton)
    element.append(contentButton);

    nextButton.addEventListener('click', async() => {
        await userstore.loadNextPage();
        currentPageLabel.innerText = userstore.getCurrentPage();

        renderTable(element);
    });

    previousButton.addEventListener('click', async() => {
        await userstore.loadPreviousPage();
        currentPageLabel.innerText = userstore.getCurrentPage();

        renderTable(element);
    });

}
