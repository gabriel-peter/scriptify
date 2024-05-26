import { Tables } from "@/types_db";
import moment from "moment";

export function computeAge(birthDate: string) {
    // Convert birthDate to a moment object
    const birthMoment = moment(birthDate);

    // Calculate age using diff and moment().format()
    const age = moment().diff(birthMoment, 'years');

    return age;
}

export function stringifyAddress(userInfo: Tables<"profiles">) {
    return userInfo.address1 + " " +
        (userInfo.address2 ? userInfo.address2 + " " : '') +
        userInfo.city + ", " +
        userInfo.state_enum?.toString() + " " +
        userInfo.zip_code;
}

export function stringifyName(userInfo: {first_name: string, last_name: string}) {
    return userInfo.first_name + " " + userInfo.last_name;
}