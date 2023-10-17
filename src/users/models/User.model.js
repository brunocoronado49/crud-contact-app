export class User {
    /**
     * 
     * @param {User} userData 
     */
    constructor({id, isActive, number, avatar, firstName, lastName, gender}) {
        this.id = id;
        this.isActive = isActive;
        this.number = number;
        this.avatar = avatar;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
    }
}



