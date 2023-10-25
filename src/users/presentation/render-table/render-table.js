import userStore from '../../store/user-store';
import {deleteUsersById} from '../../usecases/delete-user-by-id';
import {showModal} from '../render-modal/render-modal';
import './render-table.css';

let table;

const createTable = () => {
    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');
    tableHeaders.innerHTML = `
        <tr class="table-header">
            <th class="table-title">ID</th>
            <th class="table-title">Full name</th>
            <th class="table-title">Phone Number</th>
            <th class="table-title">Active</th>
            <th class="table-title">Actions</th>
        </tr>
    `;

    const tableBody = document.createElement('tbody');
    table.append(tableHeaders, tableBody);

    return table;
}

/**
 * 
 * @param {MouseEvent} event 
 */
const tableSelectListener = (event) => {
    const element = event.target.closest('.select-user');
    if (!element) return;

    const id = element.getAttribute('data-id');
    showModal(id);
}

/**
 * 
 * @param {MouseEvent} event 
 */
const tableDeleteListener = async(event) => {
    const element = event.target.closest('.delete-user');
    if (!element) return;

    const id = element.getAttribute('data-id');

    try {
        await deleteUsersById(id);
        await userStore.reloadPage();

        document.querySelector('#current-page').innerText = userStore.getCurrentPage();
        renderTable();
    } catch (error) {
        console.log(`Error en:  ${error}`);
        alert('Not deleted');
    }
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderTable = (element) => {
    const users = userStore.getUsers();

    if (!table) {
        table = createTable();
        element.append(table);

        table.addEventListener('click', tableSelectListener);
        table.addEventListener('click', tableDeleteListener);
    }

    let tableHTMML = '';
    users.forEach(user => {
        tableHTMML += `
            <tr>
                <td class="table-content">${user.id}</td>
                <td class="table-content">${user.firstName} ${user.lastName}</td>
                <td class="table-content">${user.number}</td>
                <td class="table-content">${user.isActive === true ? 'Active' : 'Inactive'}</td>
                <td class="table-content">
                    <a href="#" class="select-user" data-id="${user.id}">Select</a>
                    <a href="#" class="delete-user" data-id="${user.id}">Delete</a>
                </td>
            </tr>
        `;
    });

    table.querySelector('tbody').innerHTML = tableHTMML;
}

