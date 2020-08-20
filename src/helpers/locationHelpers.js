import {stringify} from "javascript-stringify";

navigator.geolocation = require('@react-native-community/geolocation');
export const getAnyCurrentPosition = async () => {
    try{
        let pos = await currentLocationPromise({enableHighAccuracy: true, timeout: 3000, maximumAge: 60000})
        console.log(pos);
        return pos;
    }
    catch(err){
        console.log("HighAccuracy did not work :"+err);
        try{
            let pos = await currentLocationPromise({enableHighAccuracy: false, timeout: 3000, maximumAge: 60000})
            console.log(pos);
            return pos;
        }
        catch (er){
            console.log("LowAccuracy did not work :"+er);
            return err;
        }
    }
}
export const getCurrentPosition = async () => {
    let pos;
    await navigator.geolocation.getCurrentPosition(
        position => pos=position,
        error => error,
        {enableHighAccuracy: false, timeout: 10000, maximumAge: 60000});
    return pos;
}

const currentLocationPromise = (options) => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => resolve(position),
            ({code, message}) => reject(Object.assign(new Error(message),{name: "PositionError", code})),
            options
        );
    });
};
