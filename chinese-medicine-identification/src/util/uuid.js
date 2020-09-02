export function getUUID() {
    return (getUUIDNumber() + getUUIDNumber() + "-" + getUUIDNumber() + "-" + getUUIDNumber()
        + "-" + getUUIDNumber() + "-" + getUUIDNumber() + "-" + getUUIDNumber())
}

function getUUIDNumber() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}


