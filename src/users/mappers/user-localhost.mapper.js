import {User} from '../models/User.model';

export const userLocalhostMapper = (user) => {
    const {
        id, isActive, number, avatar, firstName, lastMame, gender
    } = user;

    return {
        id, isActive, number, avatar, first_name: firstName, last_name: lastName, gender
    };
}

