// main.js
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const C = require("crocks");
const R = require("ramda");
const fs = require("fs");

// Input Source

// Config File

/***************************** */
// Entry Code 
/***************************** */
exports.parser = htmlData => startParse(htmlData);

const startParse = htmlData => R.compose(
    R.chain(selectorAndGrabAtIndex(selectAllTables)(0)),
    R.map(getParentNode),
    safeFindElementWithInnerHtml("h2")("Sell Orders"),
  getDocFromData
)(htmlData);



// reducers -> (state,action) -> state
const reducer = (state, action) => {
    switch(action) {
    case ACTION_FIND_ELEMENT:
        return state;
        break;
    default:
        return state;
    }
};


/***************************** */
// Generic JSDom Utilities
/***************************** */
const getJSDomFromData = data => new JSDOM(data);
const docLens = R.lensPath(["window","document"]);
const getDocFromDom = R.view(docLens);

const getDocFromData = R.compose(
    getDocFromDom,
    getJSDomFromData
);


// Find elements by searching for innerHTML
const safeFindElementWithInnerHtml = el => text => R.compose(
    safeUndefined,
    findElementWithInnerHTML(el)(text)
);
const findElementWithInnerHTML = el => text => R.compose(
    R.find(x=>x.innerHTML === text),
    nodeListToArray, 
    selectAllElements(el)
);

const safeUndefined = C.safe(x => x!==undefined);

const selectorAndGrabAtIndex = selector => index => R.compose(
    getElementAtIndex(index),
    selector
);

// convert a node list to a array
const nodeListToArray = nodeList => [].slice.call(nodeList);

// Select elements and array helpers
const lengthQs = index => nodeList => nodeList.length > index;

const getElementAtIndex = index => R.compose(
    R.map(x => x[index]),
    C.safe(lengthQs(index))
);

// Get the parent Nonde
const getParentNode = node => node.parentNode;


// Element Query All SElectors
const selectAllElements = el => doc => { return doc.querySelectorAll(el); };

const selectAllTables = selectAllElements('table');
const selectAllRows = selectAllElements('tr');
const selectAllCells = selectAllElements('td');
const selectAllByClassName = className => selectAllElements('.'+className);

