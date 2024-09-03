class Addition {

    constructor(errorID, description) {
        this.errorID = errorID;
        this.description = description;
    }

    getErrorID() {
        return this.errorID;
    }

    getDescription() {
        return this.description;
    }
}

export default Addition;