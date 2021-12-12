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

export const parseServicesDate = (services) => {
    if (services && services.length > 0) {
        services.forEach(serv => {
            serv.start = new Date(serv.start);
            serv.end = new Date(serv.end);
        });
    }

    return services;
}