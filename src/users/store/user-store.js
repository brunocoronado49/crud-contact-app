import {loadUsersByPage} from '../usecases/load-users-by-page';

const state = {
    users: [],
    currentPage: 0
}

const loadNextPage = async() => {
    const users = await loadUsersByPage(state.currentPage + 1);
    if (users.length === 0) return;

    state.currentPage += 1;
    state.users = users;
}

const loadPreviousPage = async() => {
    if (state.currentPage === 1) return;
    const users = await loadUsersByPage(state.currentPage - 1);

    state.users = users;
    state.currentPage -= 1;
}

const onUserChanged = (userUpdated) => {
    let wasFound = false;
    state.users = state.users.map(usr => {
        if (usr.id === userUpdated.id) {
            wasFound = true;
            return userUpdated;
        }
        return userUpdated;
    });

    if (state.users.length < 10 && !wasFound) {
        state.users.push(userUpdated);
    }
}

const reloadPage = async() => {
    const users = await loadUsersByPage(state.currentPage);
    if (users.length === 0) {
        await loadPreviousPage();
        return;
    }

    state.users = users;
}

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,
    getUsers: () => [...state.users],
    getCurrentPage: () => state.currentPage
}



