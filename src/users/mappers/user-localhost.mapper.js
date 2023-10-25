
export const userLocalhostMapper = (user) => {
    const {
        id, isActive, number, avatar, firstName, lastName, gender
    } = user;

    return {
        id, isActive, number, avatar, first_name: firstName, last_name: lastName, gender
    };
}

