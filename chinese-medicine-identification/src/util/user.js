import {AsyncStorage} from "react-native";
import {getUUID} from "./uuid";
import RomoteURL from "./remote-url";

export function getUserId() {
    return AsyncStorage.getItem('userid')
}


export function saveUser() {
    AsyncStorage.getItem('userid').then(value => {
        if (value == null) {
            let userId = getUUID()
            AsyncStorage.setItem('userid', userId);
            fetch(RomoteURL + '/user', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    id: userId,
                })
            })
                .then(response => {
                    return response.json();
                })
                .then((response) => {
                });
        }
    })
}
