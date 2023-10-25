import {User} from '../models/User.model';
import {localhostUserMapper} from '../mappers/localhost-user.mapper';
import {userLocalhostMapper} from '../mappers/user-localhost.mapper';

export const saveUser = async(userLike) => {
    const user = new User(userLike);
    if (!user.firstName || !user.lastName) throw 'First and last name are required';

    const userToSave = userLocalhostMapper(user);
    let userUpdated;

    if (user.id) {
        userUpdated = await updateUser(userToSave);
    } else {
        userUpdated = await createUser(userToSave);
    }

    return localhostUserMapper(userUpdated);
}

const createUser = async(user) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users`;
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const newUser = await response.json();
    return newUser;
}

const updateUser = async(user) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;
    const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const updateUser = await response.json();
    return updateUser;
}



