import ethConfig from "../eth-config.json";
import { getImgPath } from "./imageHelper";

export type Token = {
    image: string;
    address: string;
    name: string;
}

export function getToken(_name: string, _address?: string): Token {
    return {
        image: getImgPath(_name),
        address: _address ? _address : ethConfig["networks"]["rinkeby"][_name + "_token"],
        name: _name.toUpperCase()
    };
}

export function getTokens(tokenNames: Array<string>): Array<Token> {    
    return tokenNames.map((name) => getToken(name));    
}
