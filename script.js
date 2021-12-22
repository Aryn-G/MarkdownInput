var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var patterns = {
    boldItalic: /\*\*\*(.*?)\*\*\*/gs,
    bold: /\*\*(.*?)\*\*/gs,
    italic: /\*(.*?)\*/gs,
    underline: /__(.*?)__/gs,
    underlineItalics: /__\*(.*?)\*__/gs,
    underlineBold: /__\*\*(.*?)\*\*__/gs,
    underlineBoldItalics: /__\*\*\*(.*?)\*\*\*__/gs,
    strikethrough: /~~(.*?)~~/gs,
    codeMultiline: /```(.*?)```/gs,
    codeLine: /`(.*?)`/gs,
    blockQuoteMultiline: />>> (.*)/gs,
    blockQuoteLine: /^> (.*)$/gm,
    url: /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/gm,
    newLine: /(<br>)/g
};
var formatInput = function (content) {
    return content
        .replace(patterns.boldItalic, "<span star>***</span><strong><em>$1</em></strong><span star>***</span>")
        .replace(patterns.bold, "<span star>**</span><strong>$1</strong><span star>**</span>")
        .replace(patterns.italic, "<span star>*</span><em>$1</em><span star>*</span>")
        .replace(patterns.underline, "<span star>__</span><u>$1</u><span star>__</span>")
        .replace(patterns.underlineItalics, "<span star>__*</span><u><em>$1</em></u><span star>*__</span>")
        .replace(patterns.underlineBold, "<span star>__**</span><u><strong>$1</strong></u><span star>**__</span>")
        .replace(patterns.underlineBoldItalics, "<span star>__***</span><u><strong><em>$1</strong></em></u><span star>***__</span>")
        .replace(patterns.strikethrough, "<span star>~~</span><del>$1</del><span star>~~</span>")
        .replace(patterns.codeLine, '<code class="facade">`$1`</code>')
        .replace(patterns.blockQuoteLine, '<span hid>> </span><span class="blockquote">$1</span>')
        .replace(patterns.url, '<a href="$1" target="_blank">$1</maineditoriv>')
        .replace(patterns.newLine, "<span>$1</span>$1");
};
var formatMsg = function (content) {
    return content
        .replace(patterns.boldItalic, "<strong><em>$1</em></strong>")
        .replace(patterns.bold, "<strong>$1</strong>")
        .replace(patterns.italic, "<em>$1</em>")
        .replace(patterns.underline, "<u>$1</u>")
        .replace(patterns.underlineItalics, "<u><em>$1</em></u>")
        .replace(patterns.underlineBold, "<u><strong>$1</strong></u>")
        .replace(patterns.underlineBoldItalics, "<u><strong><em>$1</strong></em></u>")
        .replace(patterns.strikethrough, "<del>$1</del>")
        .replace(patterns.codeLine, '<code class="facade">$1</code>')
        .replace(patterns.blockQuoteLine, '<span class="blockquote">$1</span>')
        .replace(patterns.url, '<a href="$1" target="_blank">$1</a>')
        .replace(patterns.newLine, "<span>$1</span>$1");
};
function selCoords() {
    var range = window.getSelection().getRangeAt(0);
    var rect = range.getClientRects();
    return {
        x: (rect[0].left - rect[0].right) / -2 + rect[0].left,
        y: rect[0].top
    };
}
var Editor = /** @class */ (function () {
    function Editor(_editorElement, _tooltipElement, _counterElement, _maxLength, _submitionCallback) {
        this.editorElement = _editorElement;
        this.tooltipElement = _tooltipElement;
        this.counterElement = _counterElement;
        this.history = [];
        this.current = 0;
        this.previousCommand = 0;
        this.submit = _submitionCallback.bind(this);
        this.pushHistory({
            textContent: this.editorElement.textContent,
            selection: {
                start: this.editorElement.textContent.length,
                end: this.editorElement.textContent.length
            }
        });
        this.updateHTML(0);
        this.addEventListener(this.editorElement, "keydown", this.handle.bind(this));
        this.addEventListener(this.editorElement, "paste", this.handlePaste.bind(this));
        this.addEventListener(this.editorElement, "input", this.handleInput.bind(this));
        this.addEventListener(this.editorElement, "click", this.handleClick.bind(this));
        // this.addEventListener("blur", () => {
        //   // hide tooltip
        //   tooltip.style.display = "none";
        // });
    }
    Editor.restoreSelection = function (containerEl, savedSel) {
        var charIndex = 0, range = document.createRange();
        range.setStart(containerEl, 0);
        range.collapse(true);
        var nodeStack = [containerEl], node, foundStart = false, stop = false;
        while (!stop && (node = nodeStack.pop())) {
            if (node.nodeType == 3) {
                var nextCharIndex = charIndex + node.length;
                if (!foundStart &&
                    savedSel.start >= charIndex &&
                    savedSel.start <= nextCharIndex) {
                    range.setStart(node, savedSel.start - charIndex);
                    foundStart = true;
                }
                if (foundStart &&
                    savedSel.end >= charIndex &&
                    savedSel.end <= nextCharIndex) {
                    range.setEnd(node, savedSel.end - charIndex);
                    stop = true;
                }
                charIndex = nextCharIndex;
            }
            else {
                var i = node.childNodes.length;
                while (i--) {
                    nodeStack.push(node.childNodes[i]);
                }
            }
        }
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    };
    Editor.saveSelection = function (containerEl) {
        var range = window.getSelection().getRangeAt(0);
        var preSelectionRange = range.cloneRange();
        preSelectionRange.selectNodeContents(containerEl);
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        var start = preSelectionRange.toString().length;
        return {
            start: start,
            end: start + range.toString().length
        };
    };
    Editor.prototype.execCommand = function (command) {
        if (command == "undo") {
            this.undo();
        }
        else if (command == "redo") {
            this.redo();
        }
        else if (command == "bold") {
            this.bold();
        }
        else if (command == "italic") {
            this.italic();
        }
        else if (command == "underline") {
            this.underline();
        }
        else if (command == "strikethrough") {
            this.strikethrough();
        }
        else if (command == "code") {
            this.code();
        }
    };
    // history related stuff
    Editor.prototype.pushHistory = function (value) {
        // if history has more than 100 items, remove the oldest one
        if (this.history.length > 100) {
            this.history.shift();
        }
        // if history current is not the same as the last item in the history
        if (this.current !== this.history.length - 1) {
            // remove all items after the current item
            this.history.splice(this.current + 1);
        }
        // add the new item to the history
        this.history.push(value);
        this.current = this.history.length - 1;
    };
    Editor.prototype.undo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.current > 0)) return [3 /*break*/, 2];
                        this.previousCommand = 1;
                        this.current--;
                        this.editorElement.textContent = this.history[this.current].textContent;
                        this.updateHTML(this.previousCommand);
                        return [4 /*yield*/, Promise.resolve()];
                    case 1:
                        _a.sent();
                        Editor.restoreSelection(this.editorElement, this.history[this.current].selection);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    // redo
    Editor.prototype.redo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.current < this.history.length - 1)) return [3 /*break*/, 2];
                        this.previousCommand = 1;
                        this.current++;
                        this.editorElement.textContent = this.history[this.current].textContent;
                        this.updateHTML(this.previousCommand);
                        return [4 /*yield*/, Promise.resolve()];
                    case 1:
                        _a.sent();
                        Editor.restoreSelection(this.editorElement, this.history[this.current].selection);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Editor.prototype.bold = function () {
        if (!this.updateLength())
            return;
        var pos = Editor.saveSelection(this.editorElement);
        var sel = this.editorElement.textContent.slice(pos.start, pos.end);
        if (this.editorElement.textContent
            .slice(pos.start - 2, pos.end + 2)
            .match(/(?=\*{2}).*(\*{2})/g)) {
            this.handleVal(this.editorElement.textContent.slice(0, pos.start - 2) +
                sel +
                this.editorElement.textContent.slice(pos.end + 2), {
                start: pos.start - 2,
                end: pos.end - 2
            });
        }
        else {
            this.handleVal(this.editorElement.textContent.slice(0, pos.start) +
                "**" +
                sel +
                "**" +
                this.editorElement.textContent.slice(pos.end), {
                start: pos.start + 2,
                end: pos.end + 2
            });
        }
    };
    Editor.prototype.italic = function () {
        if (!this.updateLength())
            return;
        var pos = Editor.saveSelection(this.editorElement);
        var sel = this.editorElement.textContent.slice(pos.start, pos.end);
        if (this.editorElement.textContent
            .slice(pos.start - 3, pos.end + 3)
            .match(/(?=\*{3}).*(\*{3})/g)) {
            this.handleVal(this.editorElement.textContent.slice(0, pos.start - 1) +
                sel +
                this.editorElement.textContent.slice(pos.end + 1), {
                start: pos.start - 1,
                end: pos.end - 1
            });
        }
        else if (this.editorElement.textContent
            .slice(pos.start - 2, pos.end + 2)
            .match(/(?=\*{2}).*(\*{2})/g)) {
            this.handleVal(this.editorElement.textContent.slice(0, pos.start) +
                "*" +
                sel +
                "*" +
                this.editorElement.textContent.slice(pos.end), {
                start: pos.start + 1,
                end: pos.end + 1
            });
        }
        else if (this.editorElement.textContent
            .slice(pos.start - 1, pos.end + 1)
            .match(/(?=\*).*(\*)/g)) {
            this.handleVal(this.editorElement.textContent.slice(0, pos.start - 1) +
                sel +
                this.editorElement.textContent.slice(pos.end + 1), {
                start: pos.start - 1,
                end: pos.end - 1
            });
        }
        else {
            this.handleVal(this.editorElement.textContent.slice(0, pos.start) +
                "*" +
                sel +
                "*" +
                this.editorElement.textContent.slice(pos.end), {
                start: pos.start + 1,
                end: pos.end + 1
            });
        }
    };
    Editor.prototype.underline = function () {
        if (!this.updateLength())
            return;
        var pos = Editor.saveSelection(this.editorElement);
        var sel = this.editorElement.textContent.slice(pos.start, pos.end);
        if (this.editorElement.textContent
            .slice(pos.start - 2, pos.end + 2)
            .match(/(?=_{2}).*(_{2})/g)) {
            this.handleVal(this.editorElement.textContent.slice(0, pos.start - 2) +
                sel +
                this.editorElement.textContent.slice(pos.end + 2), {
                start: pos.start - 2,
                end: pos.end - 2
            });
        }
        else {
            this.handleVal(this.editorElement.textContent.slice(0, pos.start) +
                "__" +
                sel +
                "__" +
                this.editorElement.textContent.slice(pos.end), {
                start: pos.start + 2,
                end: pos.end + 2
            });
        }
    };
    Editor.prototype.strikethrough = function () {
        if (!this.updateLength())
            return;
        var pos = Editor.saveSelection(this.editorElement);
        var sel = this.editorElement.textContent.slice(pos.start, pos.end);
        if (this.editorElement.textContent
            .slice(pos.start - 2, pos.end + 2)
            .match(/(?=~{2}).*(~{2})/g)) {
            this.handleVal(this.editorElement.textContent.slice(0, pos.start - 2) +
                sel +
                this.editorElement.textContent.slice(pos.end + 2), {
                start: pos.start - 2,
                end: pos.end - 2
            });
        }
        else {
            this.handleVal(this.editorElement.textContent.slice(0, pos.start) +
                "~~" +
                sel +
                "~~" +
                this.editorElement.textContent.slice(pos.end), {
                start: pos.start + 2,
                end: pos.end + 2
            });
        }
    };
    Editor.prototype.code = function () {
        if (!this.updateLength())
            return;
        var pos = Editor.saveSelection(this.editorElement);
        var sel = this.editorElement.textContent.slice(pos.start, pos.end);
        if (this.editorElement.textContent
            .slice(pos.start - 1, pos.end + 1)
            .match(/(?=`).*(`)/g)) {
            this.handleVal(this.editorElement.textContent.slice(0, pos.start - 1) +
                sel +
                this.editorElement.textContent.slice(pos.end + 1), {
                start: pos.start - 1,
                end: pos.end - 1
            });
        }
        else {
            this.handleVal(this.editorElement.textContent.slice(0, pos.start) +
                "`" +
                sel +
                "`" +
                this.editorElement.textContent.slice(pos.end), {
                start: pos.start + 1,
                end: pos.end + 1
            });
        }
    };
    Editor.prototype.updateHTML = function (previous) {
        return __awaiter(this, void 0, void 0, function () {
            var pos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(previous != 2)) return [3 /*break*/, 2];
                        pos = Editor.saveSelection(this.editorElement);
                        this.editorElement.innerHTML = formatInput(this.editorElement.textContent || "");
                        if (!(previous == 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.resolve()];
                    case 1:
                        _a.sent();
                        Editor.restoreSelection(this.editorElement, pos);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Editor.prototype.handleVal = function (newText, newCursorPos) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.previousCommand = 1;
                        this.editorElement.textContent = newText;
                        this.updateHTML(this.previousCommand);
                        return [4 /*yield*/, Promise.resolve()];
                    case 1:
                        _a.sent();
                        Editor.restoreSelection(this.editorElement, newCursorPos);
                        this.pushHistory({
                            textContent: newText,
                            selection: newCursorPos
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Editor.prototype.handle = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.updateLength())
                    return [2 /*return*/];
                this.tooltipElement.style.display = "none";
                if (e.ctrlKey && e.keyCode == 66) {
                    //ctrl b
                    e.preventDefault();
                    this.bold();
                }
                else if (e.ctrlKey && e.keyCode == 73) {
                    //ctrl i
                    e.preventDefault();
                    this.italic();
                }
                else if (e.ctrlKey && e.keyCode == 85) {
                    //ctrl u
                    e.preventDefault();
                    this.underline();
                }
                else if (e.ctrlKey && e.keyCode == 90) {
                    e.preventDefault();
                    this.undo();
                }
                else if (e.ctrlKey && e.keyCode == 89) {
                    e.preventDefault();
                    this.redo();
                }
                else if (e.shiftKey && e.keyCode == 13) {
                    e.preventDefault();
                }
                else if (e.keyCode == 13 && !e.shiftKey) {
                    e.preventDefault();
                    //submit
                    this.submit();
                }
                else {
                    this.previousCommand = 0;
                }
                return [2 /*return*/];
            });
        });
    };
    Editor.prototype.handlePaste = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var text, pos;
            return __generator(this, function (_a) {
                e.preventDefault();
                if (!this.updateLength())
                    return [2 /*return*/];
                text = e.clipboardData.getData("text/plain");
                text = text.trim();
                pos = Editor.saveSelection(this.editorElement);
                this.handleVal(this.editorElement.textContent.slice(0, pos.start) +
                    text +
                    this.editorElement.textContent.slice(pos.end), {
                    start: pos.start + text.length,
                    end: pos.end + text.length
                });
                return [2 /*return*/];
            });
        });
    };
    // handle input
    Editor.prototype.handleInput = function (e) {
        if (!this.updateLength())
            return;
        var pos = Editor.saveSelection(this.editorElement);
        this.updateHTML(this.previousCommand);
        this.pushHistory({
            textContent: this.editorElement.textContent,
            selection: pos
        });
    };
    Editor.prototype.handleClick = function (e) {
        var cursorPos = Editor.saveSelection(this.editorElement);
        if (cursorPos.start == cursorPos.end) {
            this.tooltipElement.style.display = "none";
            return;
        }
        var pos = selCoords();
        this.tooltipElement.style.left = pos.x + "px";
        this.tooltipElement.style.top = pos.y - 32 + "px";
        this.tooltipElement.style.display = "flex";
        this.tooltipElement.dataset.editor = this.editorElement.id;
    };
    Editor.prototype.updateLength = function () {
        var value = this.editorElement.innerText;
        var pos = Editor.saveSelection(this.editorElement);
        if (value.length === 0) {
            this.counterElement.innerText = "";
        }
        else {
            this.counterElement.innerText = String(500 - value.length);
        }
        if (500 - value.length <= 0) {
            this.counterElement.classList.add("invalid");
            this.handleVal(this.editorElement.textContent.slice(0, 500), {
                start: Math.min(500, pos.start),
                end: Math.min(500, pos.end)
            });
            return false;
        }
        else {
            this.counterElement.classList.remove("invalid");
            return true;
        }
    };
    Editor.prototype.addEventListener = function (elem, event, callback) {
        elem.addEventListener(event, callback);
    };
    return Editor;
}());
var maineditor = document.getElementById("div");
var tooltip = document.getElementById("tooltip");
var editor1 = new Editor(maineditor, tooltip, document.getElementById("countn"), 500, function () {
    document.getElementById("p").innerHTML = formatMsg(maineditor.textContent);
});
var observer = new IntersectionObserver(function (entry) {
    if (entry[0].boundingClientRect.x < 0) {
        tooltip.style.transform = "translate(calc(-50% + ".concat(entry[0].boundingClientRect.x * -1, "px), -50%)");
        document.querySelectorAll("#tooltip .after")[0].style.left = "calc(50% + ".concat(entry[0].boundingClientRect.x, "px)");
    }
    else {
        tooltip.style.transform = "translate(-50%, -50%)";
        document.querySelectorAll("#tooltip .after")[0].style.left = "50%";
    }
});
observer.observe(tooltip);
var tooltipChildren = tooltip.children;
var _loop_1 = function (i) {
    tooltipChildren[i].addEventListener("click", function (e) {
        var value = tooltipChildren[i].id.replace("tooltip-", "");
        editor1.execCommand(value);
    });
};
for (var i = 0; i < tooltipChildren.length; i++) {
    _loop_1(i);
}
