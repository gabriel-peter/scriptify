import { Tables } from "@/types_db";

export function computeAge(date_of_birth: string) {
    return date_of_birth // TODO
}

export function stringifyAddress(userInfo: Tables<"profiles">) {
    return userInfo.address1 + " " +
        userInfo.address2 + " " +
        userInfo.city + ", " +
        userInfo.state_enum?.toString() + " " +
        userInfo.zip_code;
}

export function stringifyName(userInfo: {first_name: string, last_name: string}) {
    return userInfo.first_name + " " + userInfo.last_name;
}