import {showModal} from '../render-modal/render-modal'
import './render-add-button.css'

/**
 * @param {HTMLDivElement} element
 */
export const renderAddButton = (element) => {
    const floatingActionButton = document.createElement('button');

    floatingActionButton.innerText = '+ New Contact';
    floatingActionButton.classList.add('fab-button');
    element.append(floatingActionButton);

    floatingActionButton.addEventListener('click', () => {
        showModal()
    });
}
