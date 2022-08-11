const CommentLocation = {
    beforeAll() { return Symbol.for("before-all"); },
    before(prop) {
        if (prop) {
            return Symbol.for("before:" + prop);
        } else {
            return Symbol.for("before");
        }
    },
    afterProp(prop) { return Symbol.for("after-prop:" + prop); },
    afterColon(prop) { return Symbol.for("after-colon:" + prop); },
    afterValue(prop) { return Symbol.for("after-value:" + prop); },
    after(prop) {
        if (prop) {
            return Symbol.for("after:" + prop);
        } else {
            return Symbol.for("after");
        }
    },
    afterAll() { return Symbol.for("after-all"); },
};

function parseJSONComment(type, comment) {
    return {
        type: type == "block" || type == "inlineBlock" ? "BlockComment" : "LineComment",
        value: comment,
        inline: type == "inlineBlock" || type == "inlineLine"
    };
}

function addJSONComment(target, symbol, type, comment) {
    const comments = target[symbol];
    if (Array.isArray(comments)) {
        comments.push(parseJSONComment(type, comment));
    } else {
        setJSONComment(target, symbol, type, comment);
    }
}

function setJSONComment(target, symbol, type, comment) {
    target[symbol] = [parseJSONComment(type, comment)];
}

function clearJSONComment(target, symbol) {
    delete target[symbol];
}

function copyJSONComment(source, sourceSymbol, target, targetSymbol) {
    const sourceComments = source[sourceSymbol];
    const targetComments = target[targetSymbol];
    if (sourceComments) {
        if (targetComments) {
            targetComments.push(...sourceComments);
        } else {
            target[targetSymbol] = [...sourceComments];
        }
    }
}

function moveJSONComment(source, sourceSymbol, target, targetSymbol) {
    copyJSONComment(source, sourceSymbol, target, targetSymbol);
    clearJSONComment(source, sourceSymbol);
}

module.exports = {
    CommentLocation,
    addJSONComment,
    setJSONComment,
    clearJSONComment,
    copyJSONComment,
    moveJSONComment
}