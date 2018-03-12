 

/*
JS Core
Fuction cơ bản Js
*/

//Emcsoft.Common

var Emcsoft = Emcsoft || window["Emcsoft"] || {};

Emcsoft.Common = function () {

    return {

        getKeyCode: function (event, eventType) {
            if (window.event) {
                event = window.event;
            }
            if (eventType == "keypress")
                return (event.charCode == undefined ? event.keyCode : event.charCode);
            else
                return event.keyCode;
        },
        isNumber: function (value) {
            return typeof value === 'number' && isFinite(value);
        },
        isKeyDigit: function (keyCode) {
            return (0x30 <= keyCode && keyCode <= 0x39);
        },

        isNumeric: function (value) {
            return !isNaN(parseFloat(value)) && isFinite(value);
        },

        isString: function (value) {
            return typeof value === 'string';
        },


        isBoolean: function (value) {
            return typeof value === 'boolean';
        },


        isElement: function (value) {
            return value ? value.nodeType === 1 : false;
        },


        isTextNode: function (value) {
            return value ? value.nodeName === "#text" : false;
        },


        isDefined: function (value) {
            return typeof value !== 'undefined';
        },

        getCaret: function (el) {
            if (el.selectionStart) {
                return el.selectionStart;
            }
            else if (document.selection) {
                el.focus();
                var r = document.selection.createRange();
                if (r == null) {
                    return 0;
                }

                var re = el.createTextRange(),
                    rc = re.duplicate();
                re.moveToBookmark(r.getBookmark());
                rc.setEndPoint('EndToStart', re);
                return rc.text.length;
            }
            return 0;
        },
        setlectRang: function (input, selectionStart, selectionEnd) {
            if (input.setSelectionRange) {
                input.focus();
                input.setSelectionRange(selectionStart, selectionEnd);
            }
            else if (input.createTextRange) {
                var range = input.createTextRange();
                range.collapse(true);
                range.moveStart('character', selectionStart);
                range.select();
            }
        },
        round: function (number, tp) {
            return Math.round(number * Math.pow(10, tp)) / Math.pow(10, tp);
        },

        daysOfMonth: function (moth, year) {
            var mon = parseInt(moth, 10);
            var yar = parseInt(year, 10);
            switch (mon) {
                case 2:
                    if ((yar % 4 == 0) && (yar % 400 != 0))
                        return 29;
                    else
                        return 28;
                    break;
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    return 31;
                    break;
                default:
                    return 30;
            }
        },

        isNullOrEmty: function (value) {
            if (value == null || value == "" || value == undefined)
                return true;
            else
                return false;
        },

        transformValue: function (currentVal, listVal) {
            if (this.isNullOrEmty(listVal)) return currentVal;
            var aVal = listVal.split(","), bPost = -1, i;
            for (i = 0; i < aVal.length; i++) {
                if (currentVal == aVal[i]) { bPost = i + 1; break; }
            }
            if (bPost < 0 || bPost >= aVal.length) bPost = 0;
            return aVal[bPost];
        },
        stringToJson: function (val) {
            if (val == "" || val == undefined) return "";
            return jQuery.parseJSON(val);
        },
        jsonToString: function (obj) {
            if ("JSON" in window) {
                return JSON.stringify(obj);
            }

            var t = typeof (obj);
            if (t != "object" || obj === null) {
                if (t == "string") obj = '"' + obj + '"';

                return String(obj);
            } else {
                var n, v, json = [], arr = (obj && obj.constructor == Array);

                for (n in obj) {
                    v = obj[n];
                    t = typeof (v);
                    if (obj.hasOwnProperty(n)) {
                        if (t == "string") {
                            v = '"' + v + '"';
                        } else if (t == "object" && v !== null) {
                            v = jQuery.stringify(v);
                        }

                        json.push((arr ? "" : '"' + n + '":') + String(v));
                    }
                }

                return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
            }
        },
        formCodeToChar: function (keyCode) {
            return String.fromCharCode(keyCode);
        },
        NVL: function (val, newval) {
            if (val == undefined || val == null) return "";
            else return val;
        },
        deCode: function (val, condi, valT, valF) {
            if (val == condi)
                return valT;
            else return valF;
        },
        toBool: function (val) {
            return Boolean.parse(val);
        },
        toInt: function (val) {
            return parseInt(val);
        },
        stringNumberToNumber: function (val) {
            if (val == "") return 0;
            while (val.indexOf(',') >= 0) val = val.replace(',', '');
            return val * 1.0;
        },
        isEmtyDate: function (val) {
            if (val == null) return true;
            val = this.NVL(val);
            while (val.indexOf('/') >= 0) val = val.replace('/', '');
            return (val == "");
        },
        numberToStringDate: function (val) {
            if (val == 0 || val == undefined)
                return "";
            var sNumber = val.toString();
            var year = sNumber.substr(0, 4), b_month = sNumber.substr(4, 2), b_day = sNumber.substr(6, 2);
            return b_day + "/" + b_month + "/" + year;
        },
        numberToStringMonth: function (val) {
            if (val == 0 || val == undefined)
                return "";
            var sNumber = val.toString();
            var year = sNumber.substr(0, 4), b_month = sNumber.substr(4, 2);
            return b_month + "/" + year;
        },
        stringDateToDate: function (val) {
            if (this.isEmtyDate(val)) val = "";
            var day = parseInt(val.substr(0, 2), 10), month = parseInt(val.substr(3, 2), 10), year = parseInt(val.substr(6, 4), 10);
            var result = new Date(year, month, day);
            return result;
        },
        dateToStringDate: function (val) {
            var day = b_ngay.getDate().toString(), month = (b_ngay.getMonth() + 1).toString();
            if (day.length < 2) day = "0" + day
            if (month.length < 2) month = "0" + month;
            return day + '/' + month + '/' + val.getFullYear().toString();
        },
        checkDate: function (b_value, typeData) {
            if (b_value.indexOf("_") >= 0) {
                Msg.show("Cảnh báo", "Giá trị nhập không hợp lệ");
                return false;
            }
            var a_value = b_value.split('/');
            var b_thang = 0, b_nam = 0;
            var ok = false;
            if (typeData.toString() == "Date") {
                b_thang = parseInt(a_value[1].toString());
                b_nam = a_value[2].toString();
                ok = true;
            }
            else {
                b_thang = parseInt(a_value[0].toString());
                b_nam = a_value[1].toString();
                ok = false;
            }

            if (b_thang < 0 || b_thang > 12) {
                Msg.show("Cảnh báo", "Tháng không hợp lệ");
                return false;
            }

            if (b_nam.length <= 3) {
                Msg.show("Cảnh báo", "Năm không hợp lệ");
                return false;
            }
            if (ok) {
                var b_ngay = this.daysOfMonth(b_thang, b_nam);
                var day = parseInt(a_value[0]);
                if (day < 0 || day > b_ngay) {
                    Msg.show("Cảnh báo", "Ngày không hợp lệ");
                    return false;
                }
            }
            return true;
        },
        stringMonthToNumber: function (month) {
            var a_month = month.split("/");
            return a_month[1] + a_month[0];
        },
        stringDateToNumber: function (val) {
            if (this.NVL(val) == "") return "";
            return val.substr(6, 4) + val.substr(3, 2) + val.substr(0, 2);
        },
        stringToNumber: function (val, dec) {
            val = this.stringToFormatNumber(val, dec);
            if (val == "") return "";
            while (val.indexOf(',') >= 0) val = val.replace(',', '');
            return val * 1.0;
        },
        formatNumberToNumber: function (numFormat) {
            if (typeof (numFormat) == "number")
                numFormat = numFormat.toString();
            if (numFormat == "") return "";
            while (numFormat.indexOf(',') >= 0) numFormat = numFormat.replace(',', '');
            return numFormat * 1.0;
        },
        stringToFormatNumber: function (val, dec) {
            if (typeof (val) == "number")
                val = val.toString();
            if (val == null || val == "") return "";
            var b_moi = "", b_chan = "", b_tp = "", b_dau = "", b_cham = "", b_s, i;
            for (i = 0; i < val.length; i++) {
                b_s = val.substr(i, 1);
                if (b_s == ".") b_cham = ".";
                else if (b_s == "-") b_dau = "-";
                else if ("0123456789".indexOf(b_s) >= 0) {
                    if (b_cham == ".") b_tp = b_tp + b_s;
                    else if (b_chan == "0") b_chan = b_s;
                    else b_chan = b_chan + b_s;
                }
            }
            if (b_chan.length > 3) {
                while (b_chan != "") {
                    i = b_chan.length - 3;
                    if (i < 0) i = 0;
                    if (b_moi != "") b_moi = b_chan.substr(i) + "," + b_moi;
                    else b_moi = b_chan.substr(i);
                    if (i == 0) b_chan = ""; else b_chan = b_chan.substr(0, i);
                }
            }
            else b_moi = b_chan;
            if (dec != null)
                if (dec > 0 && b_tp.length > dec) b_tp = b_tp.substr(0, dec);
            b_moi = b_dau + b_moi + b_cham + b_tp;
            return b_moi;
        },
        getParam: function () {
            var params = {};
            window.location.search
                .replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) {
                    params[key] = value;
                }
                );
            return params;
        },
        parseData: function (data, column, max) {
            if (data.length > max) return data;
            var len = data.length;;
            for (var j = 0; j <= max - len; j++) {
                var obj = "";
                for (k = 0; k < column.length; k++) {
                    if (column[k].typeEditor == "CheckBox")
                        obj += "\"" + column[k].field + "\":\"FALSE\",";
                    else
                        obj += "\"" + column[k].field + "\":\"\",";
                }
                obj = "{" + obj.substr(0, obj.length - 1) + "}";
                var temp = this.stringToJson(obj);
                data.push(temp);
            }
            return data;
        }
    }
}();



Emcsoft.Msg = function () {
    return {
        getError: function (msg) {
            if (typeof (msg) == "object")
                msg = msg.message;
            var b_d = msg.indexOf("loi:"),
                b_c = msg.lastIndexOf(":loi");
            if (b_d >= 0 && b_c < 0)
                msg = msg.substr(b_d + 4, msg.length - 4);
            else if (b_d < 0 && b_c >= 0)
                msg = msg.substr(0, msg.length - 5);
            else if (b_d >= 0 && b_c > 0)
                msg = msg.substr(b_d + 4, msg.length - 8);
            return msg;
        },
        show: function (msg) {
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_PRIMARY,
                title: "Cảnh báo",
                message: msg,
                buttons: [{
                    label: 'OK',
                    action: function (dialogItself) {
                        dialogItself.close();
                    }
                }]
            });
        },

        wait: function () {
            $('<div id="che_trang" class="ui-widget-overlay ui-front"></div>').appendTo("BODY");
            var doi = $('<div id="doi_trangnen"><div class="css_tbao" style="width: 230px; height: 60px; padding-top: 5px; top: 45%; left: 43%;z-index:' +
                '10000; display: block; position: absolute;">' +
                '<div  class="loadding">' +
                '</div> <div style="float:left; width: 74%;  margin-top:18px;  color:black!important;"> ' +
                ' Vui lòng chờ trong giây lát !</div>' +
                '</div>');
            doi.appendTo("BODY");
        },
        stopWait: function () {
            $("div[id*=doi_trangnen]").remove();
            $("div[id*=che_trang]").remove();
        }
    };
}();


