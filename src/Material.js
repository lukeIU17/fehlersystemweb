class Material {

    constructor(materialID, materialName, materialType, description, courseID) {
        this.materialID = materialID;
        this.materialName = materialName;
        this.materialType = materialType;
        this.description = description;
        this.courseID = courseID;
    }

    getMaterialID() {
        return this.materialID;
    }

    getMaterialName() {
        return this.materialName;
    }

    getMaterialType() {
        return this.materialType;
    }

    getDescription() {
        return this.description;
    }

    getCourseID() {
        return this.courseID;
    }

    setMaterialID(value) {
        this.materialID = value;
    }

    setMaterialName(value) {
        this.materialName = value;
    }

    setMaterialType(value) {
        this.materialType = value;
    }

    setDescription(value) {
        this.description = value;
    }

    setCourseID(value) {
        this.courseID = value;
    }

    delete() {
        // Logik für Delete method
    }
}

export default Material;
