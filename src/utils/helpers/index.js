export const isNullOrEmty = (property) => {
    if (!property || property === ""){
        return true;
    }
    return false;
}

export const isPastDate = (property) => {
    if (new Date(property) > new Date()){
        return false;
    }
    return true;
}

export const isNegativeNumber = (property) => {
    if (0 > property){
        return true;
    }
    return false;
}