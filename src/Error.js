class Error {

    constructor(errorID, errorName, errorType, description, materialID, status) {
        this.errorID = errorID;
        this.errorName = errorName;
        this.errorType = errorType;
        this.description = description;
        this.materialID = materialID;
        this.status = status;
    }

    getErrorID() {
        return this.errorID;
    }

    getErrorName() {
        return this.errorName;
    }

    getErrorType() {
        return this.errorType;
    }

    getDescription() {
        return this.description;
    }

    getMaterialID() {
        return this.materialID;
    }

    getStatus() {
        return this.status;
    }

    setErrorID(value) {
        this.errorID = value;
    }

    setErrorName(value) {
        this.errorName = value;
    }

    setErrorType(value) {
        this.errorType = value;
    }

    setDescription(value) {
        this.description = value;
    }

    setMaterialID(value) {
        this.materialID = value;
    }

    setStatus(value) {
        this.status = value;
    }

    delete() {
        // Logik für Delete method
    }
}

export default Error;
