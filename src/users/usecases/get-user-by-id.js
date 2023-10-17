import {localhostUserMapper} from '../mappers/localhost-user.mapper';

export const getUserById = async(id) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
    const response = await fetch(url);
    const data = await response.json();

    const user = localhostUserMapper(data);
    return user;
}


