

const compareArr = (arr1, arr2) => {
    let isEqual = true;
    if (arr1.length === arr2.length) {
        for (let i = 0; i < arr1.length; i++) {
            const element = arr1[i];
            if (!(element === arr2[i])) {
                isEqual = false
                break;
            }
        }
    } else {

        isEqual = false;

    };

    return isEqual
}

const compareLinks = (reduxLinks, stateLinks) => {
    let isEqual = true;
    let reduxArr = [];
    let stateArr = [];

    for (let link in reduxLinks) {

        if (stateLinks[link] === undefined) {
            isEqual = false
            break;
        } else {
            stateLinks[link].forEach((el, index) => {
                for (let el in stateLinks[link][index]) {
                    if (typeof stateLinks[link][index] !== 'undefined' || typeof reduxLinks[link][index] !== 'undefined') {

                        if (reduxLinks[link][index] !== undefined) {
                            reduxArr.push(reduxLinks[link][index][el]);
                            stateArr.push(stateLinks[link][index][el]);
                        } else {
                            isEqual = false
                            break;
                        }



                    }

                }
            });
        }


    }
    return isEqual
}

export const compareStates = (redux, state, parseLinks) => {
    let parsedLinks = parseLinks(state.linkArr);
    if (compareArr(redux.config, state.config)) {
        if (compareArr(redux.sectionTitles, state.sectionTitles)) {
            if (compareLinks(redux.links, parsedLinks)) {
                return true;
            } else return false;
        } else return false;


    } else return false;
}
