/*
Thư viện js xử lý về control
Quannm: 20180101
*/


if (typeof jQuery === 'undefined') {
    throw new Error('Thư viện yêu cầu cài đặt Jquery')
}


$(function () {

    $("input[datatype='Date'],input[datatype='Month']").datepicker({
        changeMonth: true,
        changeYear: true,
        onClose: function (dateText, inst) {
            if (dateText != "") {
                var a_date = dateText.split("/");
                var value = "";
                if (dateText != "__/__/____") {
                    if (this.getAttribute("datatype") == "Month")
                        value = a_date[1] + "/" + a_date[2];
                    else (this.getAttribute("datatype") == "Date")
                    value = a_date[1] + "/" + a_date[0] + "/" + a_date[2];
                }
                $(this).val(value);
            }
        }
    });

    //selector

    $(document).keydown(function (event) {
        var keyCode = Emcsoft.Common.getKeyCode(event);

        if (event.keyCode === 112) {
            e.preventDefault();
            return false;
        }

        var element = $("button[hotkey]");

        $.each(element, function (index, el) {
            var hotkey = this.getAttribute("hotkey");
            var disableKey = this.getAttribute("disableKey");
            if (disableKey == null || disableKey == undefined) {
                disableKey = "C";
            }

            if (hotkey != "" || hotkey != null) {
                if (hotkey == keyboardMap[keyCode] && disableKey == "K") {
                    this.click();
                }
            }
        });
    });

    $("input,select,textarea,button").click(function (event) {

        this.style.textAlign = 'center';
        var control = this;

        var bVal = control.value;

        var position = Emcsoft.Common.getCaret(this);
        if (event.ctrlKey) return;

        var keyCode = Emcsoft.Common.getKeyCode(event);

        var dataType = this.getAttribute("datatype"); 

        if (dataType == "String") {

            var lke = this.getAttribute("lke");
            if (lke == "" || lke == undefined) {
                return false;
            }

            $(control).val(Emcsoft.Common.transformValue(bVal, lke));
            Emcsoft.Common.setlectRang(control, 0, 0);
            this.onchange(event);
            event.preventDefault();
        }
        else if (dataType == "Date") {
            if (control.value == "") {
                $(control).val("__/__/____");
                Emcsoft.Common.setlectRang(control, 0, 0);
                event.preventDefault();
            }
        }
        else if (dataType == "Month") {
            if (control.value == "") {
                $(control).val("__/____");
                Emcsoft.Common.setlectRang(control, 0, 0);
                event.preventDefault();
            }
        }
    });

    $("input,select,textarea,button").keydown(function (event) {

        var position = Emcsoft.Common.getCaret(this);
        if (event.ctrlKey) return;

        var keyCode = Emcsoft.Common.getKeyCode(event);
        if (event.shiftKey) {
            if (keyCode == 9) {
                SetPrevious(this);
                event.preventDefault ? event.preventDefault() : event.returnValue = false;
                return false;
            }
        }

        var dataType = this.getAttribute("datatype");
        var dec = this.getAttribute("dec");
        var char = String.fromCharCode(keyCode);

        switch (keyCode) {
            case keycode.TAB:
            case keycode.ENTER:
                {
                    SetNext(this);
                    event.preventDefault ? event.preventDefault() : event.returnValue = false;
                    break;
                }

            case keycode.BACKSPACE:
                {
                    if (position < 0) {
                        return false;
                    }

                    if (position == "Money") {
                        var dec = parseInt(dec == "" ? 0 : dec);

                        if (char == "," && position < $(this).val().length)
                            position = position - 1;
                        var newchar = $(this).val().substring(0, position - 1) + $(this).val().substring(position);
                        var format = Emcsoft.Common.stringToFormatNumber(newchar, dec);
                        $(this).val(format);
                        Emcsoft.Common.setlectRang(this, position, position);
                        event.preventDefault();
                        return true;

                    }
                    else if (typeData == "Date" || typeData == "Month") {
                        if (position == 3 || (position == 6 && typeData == "Date"))
                            position = position - 1;
                        var val = $(this).val().substring(0, position - 1) + "_" + $(this).val().substring(position);
                        $(this).val(val);

                        Emcsoft.Common.setlectRang(this, position - 1, position - 1);
                        e.preventDefault();
                        break;
                    }
                    break;
                }

            case keyCode.DELETE:
                {

                    if (dataType == "Money") {
                        var dec = parseInt(dec == "" ? 0 : dec);

                        if (char == "," && position < $(this).val().length)
                            position = position + 1;

                        var newchar = $(this).val().substring(0, position) + $(this).val().substring(position + 1);
                        var format = Emcsoft.Common.stringToFormatNumber(newchar, dec);

                        $(this).val(format);
                        Emcsoft.Common.setlectRang(this, position, position);
                        e.preventDefault();
                        return true;
                    }
                    else if (typeData == "Date" || typeData == "Month") {
                        if (typeData == "Date" && position >= 10) { e.preventDefault(); return true; }
                        if (typeData == "Month" && position >= 7) { e.preventDefault(); return true; }

                        if (position == 2 || (position == 5 && typeData == "Date")) {
                            position = position + 1;
                        }

                        var val = $(this).val().substring(0, position) + "_" + $(this).val().substring(position + 1);
                        $(this).val(val);
                        Common.setlectRang(this, position + 1, position + 1);
                        e.preventDefault();
                    }

                    break;
                }

        }

    });



    $("input,textarea").keypress(function (event) {
        if (event.ctrlKey || event.altKey || event.metaKey)
            return true;

         //debugger;
        var dataType = this.getAttribute("datatype");
        var keyCode = Emcsoft.Common.getKeyCode(event);

        var position = Emcsoft.Common.getCaret(this);
        var selectStart = this.selectionStart;
        var selectEnd = this.selectionEnd;

        var newchar = String.fromCharCode(keyCode);
        var dec = this.getAttribute("dec");


        if (!Emcsoft.Common.isNullOrEmty(dataType)) {

            switch (dataType) {
                case "Number":
                    {
                        var dec = this.getAttribute("dec");
                        if (Emcsoft.Common.isNullOrEmty(dec)) {
                            dec = 0;
                        }
                        else dec = Emcsoft.Common.toInt(dec);

                        if (dec > 0) {
                            var check = "0123456789.";
                            if (check.indexOf(newchar) < 0 || (newchar == "0" && old == "0")
                                || (newchar == "." && old.indexOf(".") >= 0)) {
                                e.preventDefault();
                                return false;
                            }
                        }
                        else {
                            if (keyCode != 46 && keyCode != 110)
                                if (!Emcsoft.Common.isKeyDigit(keyCode)) {
                                    event.preventDefault ? event.preventDefault() : event.returnValue = false;
                                    return false;
                                }


                        }

                        break;
                    }



                case "string":
                    {
                        var lke = this.getAttribute("lke");
                        if (lke == "" || lke == undefined) {
                            return false;
                        }

                        $(this).val(Emcsoft.Common.transformValue(bVal, lke));
                        Emcsoft.Common.setlectRang(this, 0, 0);
                        event.preventDefault();
                        return false;
                    }

                case "Money":
                    {
                        var old = $(this).val();
                        var dec = parseInt(dec == "" ? 0 : dec);
                        var check = "0123456789";
                        if (dec > 0)
                            check = check + ".";
                        if (check.indexOf(newchar) < 0 || (newchar == "0" && old == "0")
                            || (newchar == "." && old.indexOf(".") >= 0) || (newchar == "-" && old.indexOf("-") >= 0)) {
                            e.preventDefault();
                            return false;
                        }

                        old = old.substr(0, position) + newchar + old.substr(position);
                        newchar = Emcsoft.Common.stringToFormatNumber(old, dec);
                        $(this).val(newchar);
                        e.preventDefault();
                        return false;

                        break;
                    }

                case "Date":
                case "Month":
                    {

                        if (dataType == "Date" && position >= 10) { event.preventDefault(); return true; }
                        if (dataType == "Month" && position >= 7) { event.preventDefault(); return true; }

                        if (keyCode != 46)
                            if (!Emcsoft.Common.isKeyDigit(keyCode)) { event.preventDefault(); return true; }

                        var charLost = "";

                        if (position == 2 || (position == 5 && dataType == "Date")) {
                            if (this.value.toString().substring(position, position + 1) == "/")
                                charLost = "";
                            else
                                charLost = "/";
                            position++;
                        }
                        var newVal = this.value.toString().substring(0, position) + charLost +
                            Emcsoft.Common.formCodeToChar(keyCode) + this.value.toString().substring(position + 1);

                        $(this).val(newVal);
                        Emcsoft.Common.setlectRang(this, position + 1, position + 1);
                        event.preventDefault();

                        break;
                    }
            }
        }
    });


    function SetPrevious(b_ctr) {
        try {
            var ctr_truoc = b_ctr.getAttribute("previousControl");
            if (ctr_truoc != null && ctr_truoc != '') {
                if (Emcsoft.Common.NVL(ctr_truoc.style.display) != "none"
                    && !ctr_truoc.disabled
                    && Emcsoft.Common.NVL(ctr_truoc.style.visibility) != "hidden"
                    && $(this).attr("aria-hidden") != true
                ) {
                    b_ctr.focus();
                    return true;
                }
            }

            var grid_truoc = b_ctr.getAttribute("previousGrid");
            if (grid_truoc != null && grid_truoc != '') {
                Grid_Active(form_Fs_Grid_ID("", grid_truoc));
                return true;
            }

            Previous(b_ctr);
        } catch (err) {
        }
    }

    function Previous(b_ctr) {

        var b_form = document.forms[0], b_vtri = 0, b_tim = -1;
        for (var i = b_form.elements.length - 1; i > 0; i--) {
            if (b_tim < 0 && b_form.elements[i].type != 'hidden'
                && b_form.elements[i].focus && Emcsoft.Common.NVL(b_form.elements[i].style.display) != "none"
                && !b_form.elements[i].disabled
                && Emcsoft.Common.NVL(b_form.elements[i].style.visibility) != "hidden"
                && $(this).attr("aria-hidden") != true) {
                b_tim = i;
            }

            if (b_ctr == b_form.elements[i]) {
                b_vtri = i - 1;
                break;
            }
        }

        for (var i = b_vtri; i >= 0; i--) {
            if (b_form.elements[i].type != 'hidden' && b_form.elements[i].focus
                && Emcsoft.Common.NVL(b_form.elements[i].style.display) != "none"
                && !b_form.elements[i].disabled
                && Emcsoft.Common.NVL(b_form.elements[i].style.visibility) != "hidden"
                && $(this).attr("aria-hidden") != true) {
                b_tim = i;
                break;
            }
        }

        if (b_tim >= 0)
            b_form.elements[b_tim].focus();
    }



    function SetNext(b_ctr) {
        try {
            //debugger;
            var ctr_sau = b_ctr.getAttribute("nextControl");
            if (ctr_sau != null && ctr_sau != '') {
                var b_ctr = form_Fctr_VTEN_DTUONG("", ctr_sau);

                if (Emcsoft.Common.NVL(b_ctr.style.display) != "none"
                    && !b_ctr.disabled
                    && Emcsoft.Common.NVL(b_ctr.style.visibility) != "hidden"
                    && $(this).attr("aria-hidden") != true) {
                    b_ctr.focus();
                    return true;
                }
            }

            var grid_sau = b_ctr.getAttribute("nextGrid");
            if (grid_sau != null && grid_sau != '') {
                Grid_Active(form_Fs_Grid_ID("", grid_sau));
                return true;
            }

            P_TIEP(b_ctr);
        } catch (err) {
            form_P_LOI(err);
        }
    }

    function P_TIEP(b_ctr) {
        var b_form = document.forms[0], b_vtri = 0, b_tim = -1;

        for (var i = 0; i < b_form.elements.length - 1; i++) {
            if (b_tim < 0 && b_form.elements[i].type != 'hidden'
                && b_form.elements[i].focus
                && Emcsoft.Common.NVL(b_form.elements[i].style.display) != "none"
                && !b_form.elements[i].disabled
                && Emcsoft.Common.NVL(b_form.elements[i].style.visibility) != "hidden"
                && $(this).attr("aria-hidden") != true) {
                b_tim = i;
            }

            if (b_ctr == b_form.elements[i]) {
                b_vtri = i + 1;
                break;
            }
        }

        for (var i = b_vtri; i < b_form.elements.length; i++) {
            if (b_form.elements[i].type != 'hidden' && b_form.elements[i].focus
                && Emcsoft.Common.NVL(b_form.elements[i].style.display) != "none"
                && !b_form.elements[i].disabled
                && Emcsoft.Common.NVL(b_form.elements[i].style.visibility) != "hidden"
                && $(this).attr("aria-hidden") != true) {
                b_tim = i;
                break;
            }
        }

        if (b_tim >= 0)
            b_form.elements[b_tim].focus();
    }


});



//Một số hàm xử lý về control khác

var keycode = {
    BACKSPACE: 8,
    COMMA: 188,
    DELETE: 46,
    DOWN: 40,
    END: 35,
    ENTER: 13,
    ESCAPE: 27,
    HOME: 36,
    LEFT: 37,
    PAGE_DOWN: 34,
    PAGE_UP: 33,
    PERIOD: 190,
    RIGHT: 39,
    SPACE: 32,
    TAB: 9,
    UP: 38,

    F2: 113,  //Tìm kiếm
    F3: 114,  //submit
    F4: 115   //Delete
};

var keyboardMap = [
    "", // [0]
    "", // [1]
    "", // [2]
    "CANCEL", // [3]
    "", // [4]
    "", // [5]
    "HELP", // [6]
    "", // [7]
    "BACK_SPACE", // [8]
    "TAB", // [9]
    "", // [10]
    "", // [11]
    "CLEAR", // [12]
    "ENTER", // [13]
    "ENTER_SPECIAL", // [14]
    "", // [15]
    "SHIFT", // [16]
    "CONTROL", // [17]
    "ALT", // [18]
    "PAUSE", // [19]
    "CAPS_LOCK", // [20]
    "KANA", // [21]
    "EISU", // [22]
    "JUNJA", // [23]
    "FINAL", // [24]
    "HANJA", // [25]
    "", // [26]
    "ESCAPE", // [27]
    "CONVERT", // [28]
    "NONCONVERT", // [29]
    "ACCEPT", // [30]
    "MODECHANGE", // [31]
    "SPACE", // [32]
    "PAGE_UP", // [33]
    "PAGE_DOWN", // [34]
    "END", // [35]
    "HOME", // [36]
    "LEFT", // [37]
    "UP", // [38]
    "RIGHT", // [39]
    "DOWN", // [40]
    "SELECT", // [41]
    "PRINT", // [42]
    "EXECUTE", // [43]
    "PRINTSCREEN", // [44]
    "INSERT", // [45]
    "DELETE", // [46]
    "", // [47]
    "0", // [48]
    "1", // [49]
    "2", // [50]
    "3", // [51]
    "4", // [52]
    "5", // [53]
    "6", // [54]
    "7", // [55]
    "8", // [56]
    "9", // [57]
    "COLON", // [58]
    "SEMICOLON", // [59]
    "LESS_THAN", // [60]
    "EQUALS", // [61]
    "GREATER_THAN", // [62]
    "QUESTION_MARK", // [63]
    "AT", // [64]
    "A", // [65]
    "B", // [66]
    "C", // [67]
    "D", // [68]
    "E", // [69]
    "F", // [70]
    "G", // [71]
    "H", // [72]
    "I", // [73]
    "J", // [74]
    "K", // [75]
    "L", // [76]
    "M", // [77]
    "N", // [78]
    "O", // [79]
    "P", // [80]
    "Q", // [81]
    "R", // [82]
    "S", // [83]
    "T", // [84]
    "U", // [85]
    "V", // [86]
    "W", // [87]
    "X", // [88]
    "Y", // [89]
    "Z", // [90]
    "OS_KEY", // [91] Windows Key (Windows) or Command Key (Mac)
    "", // [92]
    "CONTEXT_MENU", // [93]
    "", // [94]
    "SLEEP", // [95]
    "NUMPAD0", // [96]
    "NUMPAD1", // [97]
    "NUMPAD2", // [98]
    "NUMPAD3", // [99]
    "NUMPAD4", // [100]
    "NUMPAD5", // [101]
    "NUMPAD6", // [102]
    "NUMPAD7", // [103]
    "NUMPAD8", // [104]
    "NUMPAD9", // [105]
    "MULTIPLY", // [106]
    "ADD", // [107]
    "SEPARATOR", // [108]
    "SUBTRACT", // [109]
    "DECIMAL", // [110]
    "DIVIDE", // [111]
    "F1", // [112]
    "F2", // [113]
    "F3", // [114]
    "F4", // [115]
    "F5", // [116]
    "F6", // [117]
    "F7", // [118]
    "F8", // [119]
    "F9", // [120]
    "F10", // [121]
    "F11", // [122]
    "F12", // [123]
    "F13", // [124]
    "F14", // [125]
    "F15", // [126]
    "F16", // [127]
    "F17", // [128]
    "F18", // [129]
    "F19", // [130]
    "F20", // [131]
    "F21", // [132]
    "F22", // [133]
    "F23", // [134]
    "F24", // [135]
    "", // [136]
    "", // [137]
    "", // [138]
    "", // [139]
    "", // [140]
    "", // [141]
    "", // [142]
    "", // [143]
    "NUM_LOCK", // [144]
    "SCROLL_LOCK", // [145]
    "WIN_OEM_FJ_JISHO", // [146]
    "WIN_OEM_FJ_MASSHOU", // [147]
    "WIN_OEM_FJ_TOUROKU", // [148]
    "WIN_OEM_FJ_LOYA", // [149]
    "WIN_OEM_FJ_ROYA", // [150]
    "", // [151]
    "", // [152]
    "", // [153]
    "", // [154]
    "", // [155]
    "", // [156]
    "", // [157]
    "", // [158]
    "", // [159]
    "CIRCUMFLEX", // [160]
    "EXCLAMATION", // [161]
    "DOUBLE_QUOTE", // [162]
    "HASH", // [163]
    "DOLLAR", // [164]
    "PERCENT", // [165]
    "AMPERSAND", // [166]
    "UNDERSCORE", // [167]
    "OPEN_PAREN", // [168]
    "CLOSE_PAREN", // [169]
    "ASTERISK", // [170]
    "PLUS", // [171]
    "PIPE", // [172]
    "HYPHEN_MINUS", // [173]
    "OPEN_CURLY_BRACKET", // [174]
    "CLOSE_CURLY_BRACKET", // [175]
    "TILDE", // [176]
    "", // [177]
    "", // [178]
    "", // [179]
    "", // [180]
    "VOLUME_MUTE", // [181]
    "VOLUME_DOWN", // [182]
    "VOLUME_UP", // [183]
    "", // [184]
    "", // [185]
    "SEMICOLON", // [186]
    "EQUALS", // [187]
    "COMMA", // [188]
    "MINUS", // [189]
    "PERIOD", // [190]
    "SLASH", // [191]
    "BACK_QUOTE", // [192]
    "", // [193]
    "", // [194]
    "", // [195]
    "", // [196]
    "", // [197]
    "", // [198]
    "", // [199]
    "", // [200]
    "", // [201]
    "", // [202]
    "", // [203]
    "", // [204]
    "", // [205]
    "", // [206]
    "", // [207]
    "", // [208]
    "", // [209]
    "", // [210]
    "", // [211]
    "", // [212]
    "", // [213]
    "", // [214]
    "", // [215]
    "", // [216]
    "", // [217]
    "", // [218]
    "OPEN_BRACKET", // [219]
    "BACK_SLASH", // [220]
    "CLOSE_BRACKET", // [221]
    "QUOTE", // [222]
    "", // [223]
    "META", // [224]
    "ALTGR", // [225]
    "", // [226]
    "WIN_ICO_HELP", // [227]
    "WIN_ICO_00", // [228]
    "", // [229]
    "WIN_ICO_CLEAR", // [230]
    "", // [231]
    "", // [232]
    "WIN_OEM_RESET", // [233]
    "WIN_OEM_JUMP", // [234]
    "WIN_OEM_PA1", // [235]
    "WIN_OEM_PA2", // [236]
    "WIN_OEM_PA3", // [237]
    "WIN_OEM_WSCTRL", // [238]
    "WIN_OEM_CUSEL", // [239]
    "WIN_OEM_ATTN", // [240]
    "WIN_OEM_FINISH", // [241]
    "WIN_OEM_COPY", // [242]
    "WIN_OEM_AUTO", // [243]
    "WIN_OEM_ENLW", // [244]
    "WIN_OEM_BACKTAB", // [245]
    "ATTN", // [246]
    "CRSEL", // [247]
    "EXSEL", // [248]
    "EREOF", // [249]
    "PLAY", // [250]
    "ZOOM", // [251]
    "", // [252]
    "PA1", // [253]
    "WIN_OEM_CLEAR", // [254]
    "" // [255]
];

function dataBinDrop(el, dataSource) {
    // debugger;
    var dropID = $(el);
    dropID.children().remove();
    if (dataSource == undefined || dataSource == "") {
        return;
    }

    $.each(dataSource, function (index, val) {
        dropID.append($('<option></option>').val(val.MA).html(val.TEN));
    });
}

function CheckError(error) {
    Emcsoft.Msg.stopWait();
    if (typeof (error) == "object") {
        return false;
    }
    if (Emcsoft.Common.NVL(error) == "") return false;
    return (error.indexOf("loi:") >= 0 && error.lastIndexOf(":loi") >= 0);
}


function ShowError(error) {
    try {
        Emcsoft.Msg.stopWait();
        var error = (typeof (error) != "string") ? error.message : error;
        error = Emcsoft.Common.NVL(error);
        if (error == "") return;
        var b_d = error.indexOf("loi:"),
            b_c = error.lastIndexOf(":loi");
        if (b_d >= 0 && b_c < 0)
            error = error.substr(b_d + 4, error.length - 4);
        else if (b_d < 0 && b_c >= 0)
            error = error.substr(0, error.length - 5);
        else if (b_d >= 0 && b_c > 0)
            error = error.substr(b_d + 4, error.length - 8);
        if (error != "") Emcsoft.Msg.show("Cảnh báo", error);
    }
    catch (err) { }
}




//Xóa trắng control trong
function ResetForm(b_vungId) {
    try {
        var checkReset = "";
        var b_vung = document.getElementById(b_vungId);
        var a_ctr = b_vung.getElementsByTagName("input");
        for (var i = 0; i < a_ctr.length; i++) {
            a_ctr[i].value = "";
        }
        a_ctr = b_vung.getElementsByTagName("textarea");
        for (var i = 0; i < a_ctr.length; i++) {
            a_ctr[i].value = "";
        }
        a_ctr = b_vung.getElementsByTagName("select");
        for (var i = 0; i < a_ctr.length; i++) {
            a_ctr[i].value = "";
        }
        a_ctr = b_vung.getElementsByTagName("span");
        for (var i = 0; i < a_ctr.length; i++) {
            a_ctr[i].value = "";
        }
    }
    catch (err) { ShowError(err) }
}



function SetValues(b_vungId, val) {
    try {
        var a_json;
        if (typeof (val) == "string") {
            a_json = Emcsoft.Common.stringToJson(val);
            if (a_json.length)
                a_json = a_json[0]
            else return;
            if (a_json == "" || a_json == undefined)
                a_json = [];
        }
        else
            a_json = val;

        var b_vtri = 0, b_ten = "", a_vungId = b_vungId.split(','), b_so_tp = 0;

        var b_vung = document.getElementById(b_vungId);
        var a_ctr = b_vung.getElementsByTagName("input");
        for (var i = 0; i < a_ctr.length; i++) {
            if (a_ctr[i].id != null) {
                var nameControl = a_ctr[i].id;
                var value = a_json[nameControl];

                if (a_ctr[i].getAttribute("type") == "text" || a_ctr[i].getAttribute("type") == "password") {
                    {
                        var typeData = a_ctr[i].getAttribute("datatype");

                        if (typeData == "" || typeData == undefined) {
                            typeData = "string";
                        }

                        var dec = a_ctr[i].getAttribute("dec");

                        var saveType = a_ctr[i].getAttribute("savetype");
                        saveType = (saveType == undefined || saveType == "" ? "string" : saveType);

                        if (typeData == "Date") {
                            if (saveType == "Number")
                                $(a_ctr[i]).val(Emcsoft.Common.numberToStringDate(value));
                            else
                                $(a_ctr[i]).val(value);
                        }
                        else if (typeData == "Month") {
                            if (saveType == "Number")
                                $(a_ctr[i]).val(Emcsoft.Common.numberToStringMonth(value));
                            else
                                $(a_ctr[i]).val(value);
                        }
                        else if (typeData == "Money")
                            $(a_ctr[i]).val(Emcsoft.Common.stringToFormatNumber(value, dec));
                        else
                            $(a_ctr[i]).val(value);
                    }
                }


                else if ($(a_ctr[i]).attr("type") == "checkbox") {
                    var val = value.toUpperCase();
                    if (val == "C" || val == "TRUE")
                        a_ctr[i].checked = true;
                    else a_ctr[i].checked = false;
                }
            }
        }
        a_ctr = b_vung.getElementsByTagName("textarea");
        for (var i = 0; i < a_ctr.length; i++) {
            var nameControl = a_ctr[i].id;
            var value = a_json[nameControl];

            $(a_ctr[i]).val(value);
        }


        a_ctr = b_vung.getElementsByTagName("select");
        for (var i = 0; i < a_ctr.length; i++) {
            var nameControl = a_ctr[i].id;
            var value = a_json[nameControl];

            $(a_ctr[i]).val(value);
        }
    }
    catch (err) {
        ShowError(err);
    }
}


function ValidateMonthYear(month) {
    if (month.indexOf("_") >= 0) {
        Emcsoft.Msg.show("Cảnh báo", "Ký tự phân cách tháng năm là dấu /");
        return false;
    }
    var aMonth = month.split("/");
    if (aMonth.length > 2) {
        Emcsoft.Msg.show("Cảnh báo", "Nhập đúng định dạng thang/nam");
        return false;
    }
    if (aMonth.length == 1) {
        if (!$.isNumeric(aMonth[0])) {
            Emcsoft.Msg.show("Cảnh báo", "Năm là kiểu số");
            return false;
        }
        return aMonth[0];
    }
    if (aMonth[1] == "") {
        Emcsoft.Msg.show("Cảnh báo", "Chưa nhập năm");
        return false;
    }
    if (!$.isNumeric(aMonth[1])) {
        Msg.show("Cảnh báo", "Năm là kiểu số");
        return false;
    }
    if (aMonth[0] == "") {
        Emcsoft.Msg.show("Cảnh báo", "Tháng chưa nhập");
        return false;
    }
    if (!$.isNumeric(aMonth[0])) {
        Emcsoft.Msg.show("Cảnh báo", "tháng là kiểu số");
        return false;
    }
    var _year = parseInt(aMonth[1]), _month = parseInt(aMonth[0]);
    if (_year < 1000) {
        Emcsoft.Msg.show("Cảnh báo", "năm không hợp lệ");
        return false;
    }
    if (_month < 0 && _month > 12) {
        Emcsoft.Msg.show("Cảnh báo", "Tháng không hợp lệ");
        return false;
    }
    return aMonth[1] + aMonth[0];
}



function GetValues(b_vungId) {
    var b_gtri = "{";

    var b_vung = document.getElementById(b_vungId);
    var a_ctr = b_vung.getElementsByTagName("input");
    for (var i = 0; i < a_ctr.length; i++) {
        var nameControl = a_ctr[i].id;

        b_gtri = b_gtri + "\"" + nameControl + "\":";
        var value = "";
        var type = a_ctr[i].getAttribute("type");
        var dec = 0;

        if (type == "text" || type == "password") {
            dec = a_ctr[i].getAttribute("dec");
            value = Emcsoft.Common.NVL(a_ctr[i].value);

            if (a_ctr[i].id == nameControl.toUpperCase() && value == "") {
                Emcsoft.Msg.show("Thông báo", "Không được nhập trống " + a_ctr[i].getAttribute("msg"));
                a_ctr[i].focus();
                return false;
            }
            else {
                if (dec > 0 || type == "Money") {
                    var val = Emcsoft.Common.stringNumberToNumber(value);
                    b_gtri = b_gtri + parseInt(val) + ",";

                } else if (type == "Date" || type == "Month") {
                    if (value.indexOf("_") >= 0) {
                        Emcsoft.Msg.show("Cảnh báo", "Ngày/Tháng không hợp lê");
                        return false;
                    }
                    saveType = $(a_ctr[i]).attr("savetype");
                    if (saveType == "" || saveType == undefined)
                        saveType = "String";
                    if (saveType == "String")
                        b_gtri += "\"" + value + "\",";
                    else if (saveType == "Number")
                        if (type == "Date")
                            b_gtri += "\"" + Emcsoft.Common.stringDateToNumber(value) + "\",";
                        else b_gtri += "\"" + Emcsoft.Common.stringMonthToNumber(value) + "\",";
                }
                else
                    b_gtri = b_gtri + "\"" + value.toString() + "\",";
            }
        }
        else if ($(a_ctr[i]).attr("type") == "checkbox") {
            value = a_ctr[i].checked;
            b_gtri = b_gtri + "\"" + value.toString() + "\",";
        }
    }

    a_ctr = b_vung.getElementsByTagName("select");
    for (var i = 0; i < a_ctr.length; i++) {

        var nameControl = a_ctr[i].id;
        b_gtri = b_gtri + "\"" + nameControl + "\":";
        var value = Emcsoft.Common.NVL(a_ctr[i].value);
        b_gtri = b_gtri + "\"" + value.toString() + "\",";

    }

    a_ctr = b_vung.getElementsByTagName("textarea");
    for (var i = 0; i < a_ctr.length; i++) {
        var nameControl = a_ctr[i].id;
        b_gtri = b_gtri + "\"" + nameControl + "\":";

        var value = Emcsoft.Common.NVL(a_ctr[i].value);
        value = value.replace(/\n/g, "\\n");
        value = value.replace(/\t/g, "\\t");
        value = value.replace(/\b/g, "\\b");
        value = value.replace(/\f/g, "\\f");

        b_gtri = b_gtri + "\"" + value.toString() + "\",";
    }

    if (b_gtri.length > 1)
        b_gtri = b_gtri.substr(0, b_gtri.length - 1);
    b_gtri = b_gtri + "}";
    return Emcsoft.Common.stringToJson(b_gtri);
}

