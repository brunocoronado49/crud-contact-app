import {User} from '../models/User.model';

export const localhostUserMapper = (localhostUser) => {
    const {
        id, isActive, number, avatar, first_name, last_name, gender
    } = localhostUser;

    return new User({
        id, isActive, number, avatar, firstName: first_name, lastName: last_name, gender
    });
}


