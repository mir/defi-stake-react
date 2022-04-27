import dappImg from "../images/dapp.png";
import fauImg from "../images/fau.png";
import wethImg from "../images/weth.png";
import daiImg from "../images/dai.png";
import defaultImg from "../images/coin.png";

export const imgPaths = {
    "dapp": dappImg,
    "dai": daiImg,
    "weth": wethImg,
    "fau": fauImg,
    "default": defaultImg
};

export function getImgPath(_name: string) {
    if (_name in imgPaths) {
        return imgPaths[_name]
    } else {
        return imgPaths["default"]
    }
}