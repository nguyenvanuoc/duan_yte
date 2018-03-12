/*
Quannm: Xử lý chung về grid
*/

/// <reference path="core.js" />

function gridView(gridID, columns, a_data, config) {

    this.gridID = gridID;
    this.columns = columns;
    this.data = (a_data == undefined ? [] : a_data);
    this.config = config;
    this.grid = null;


    this.init = function () {

        var options = {
            asyncEditorLoading: false,
            cellHighlightCssClass: "selected",
            enableCellRangeSelection: true,
            enableCellNavigation: true,
            enableRowReordering: true,
            enableTextSelectionOnCells: true,
            headerRowHeight: 50,
            rowHeight: 26
        };

        var defaults = {
            pageSize: 5,
            onClientActiveCellChange: "",
            onClientDoubleClick: "",
            paging: "scroll",  //type: scroll, node, server 
            emtyRow: true,
            page: {
                eventPaging: "",
                maxNode: 5,
                showInfo: true
            }
        };

        var dataSource = this.data;
        var columns = this.columns;
        var grid;

        var minNode = 0, MaxNode, nodeCount;

        //debugger;
        defaults = $.extend({}, defaults, this.config);

        this.config = defaults;

        if (dataSource.length < this.config.pageSize && defaults.emtyRow)
            Emcsoft.Common.parseData(dataSource, this.columns, defaults.pageSize);

        $(this.gridID).css("boder", "1px dotted #808080");

        var dataBin = [];

        if (defaults.paging == 'node') {
            minNode = 0;
            nodeCount = Emcsoft.Common.round(dataSource.length / defaults.pageSize + .4, 0);

            if (nodeCount < defaults.page.maxNode) {
                defaults.page.maxNode = nodeCount;
            }

            dataBin = $.grep(dataSource, function (val, i) {
                return i >= minNode && i < defaults.pageSize
            });

        }
        else {
            dataBin = dataSource;
        }

        this.grid = grid = new Slick.Grid(this.gridID, dataBin, this.columns, options);

        this.grid.setSelectionModel(new Slick.RowSelectionModel());

        //set phân trang, mặc đinh là scroll

        if (defaults.paging == "node" || defaults.paging == "server") {

            var html = "";
            html += "<div  style=\"width: 99%; height:auto;\">";
            html += "<nav  style=\"float: right;\">";
            html += " <ul id=\"" + this.gridID.replace("#", "") + "_pagination\" class=\"pagination\" style=\"margin-top: 10px!important\">";
            html += "</ul>";
            html += "</nav>";
            html += "</div>";
            $(this.gridID).after($(html));
            SetNodeHTML(minNode, defaults.page.maxNode);

            $(this.gridID + "_txt").val(1);

            $(this.gridID + "_pagination li").eq(0).addClass("disabled");
            $(this.gridID + "_pagination li").eq(1).addClass("disabled");

            $(gridID + "_pagination" + " li").eq(2).addClass("active");

        }


        this.grid.onActiveCellChanged.subscribe(function (event, arg) {

            if (!Emcsoft.Common.isNullOrEmty(defaults.onClientActiveCellChange)) {

                var row = arg.row;
                if (row == undefined)
                    return null;
                var cell = arg.cell;
                if (cell == undefined)
                    return null;
                var a_data = arg.grid.getDataItem(row);
                var colName = arg.grid.getColumns()[cell].field;
                var val = a_data[colName];

                window[defaults.onClientActiveCellChange](row, cell, val, a_data);
            }

        });

        this.grid.onCellChange.subscribe(function (row, cell, item) {
            debugger;
        });

        //trước khi edit
        this.grid.onBeforeEditCell.subscribe(function (row, cell, item, columns) {
            debugger;
        });

        //event double click
        this.grid.onDblClick.subscribe(function (row, cell) {

            debugger;
        });

        function SetNodeHTML(form, to) {

            var $elNode = $(gridID + "_pagination");
            $elNode.attr("page", form.toString() + "," + to.toString());
            $elNode.children().remove();
            var _html = "";
            _html += "<li ><a class=\"page-link\" title=\"Trang đầu\"  href=\"#\">&laquo;&laquo;</a></li>";
            _html += "<li ><a class=\"page-link\" title=\"Trang tiếp\"  href=\"#\">&laquo;</a></li>";
            for (var i = 0; i < to - form; i++) {
                _html += "<li ><a class=\"page-link\" href=\"#\">" + (form + i + 1).toString() + "</a></li>";
            }
            _html += "<li ><a class=\"page-link\" title=\"Trang trước\"  href=\"#\">&raquo;</a></li>";
            _html += "<li ><a class=\"page-link\" title=\"Trang cuối\"  href=\"#\">&raquo;&raquo;</a></li>";

            if (defaults.page.showInfo) {
                _html += "<li showInfo='C'> <div style=\"margin-right: 8px; font-weight: normal; float: left;\">";
                _html += "<label style=\"font-weight: normal; margin:5px; \">Trang</label>";
                _html += "<input  onkeypress=\"return onlyNumber(event, this)\" id=\"" + gridID.replace("#", "") + "_txt\" datatype=\"number\" type=\"text\" class=\"controls textinput\" style=\"width:50px; border: 1px solid #ccc; border-radius:4px; padding:3px; height:30px;\" />";
                _html += "<label id=\"" + gridID.replace("#", "") + "_total\" total=\"" + nodeCount.toString() + "\" style=\"font-weight:normal; margin:5px;\">/ " + nodeCount.toString() + " trang</label></div></li>";
            }
            $elNode.append($(_html));



            $(gridID + "_pagination li").click(function (e) {

                //debugger;
                var $el = $(this);
                var txt = $el.text();
                var infor = this.getAttribute("showInfo");
                if (infor == "C") {
                    return false;
                }



                switch (txt) {

                    case "»":
                        {

                            if (minNode + defaults.page.maxNode >= nodeCount) {
                                return false;
                            }
                            minNode++;


                            var page = $(gridID + "_pagination li").filter(".active");


                            var act = 2;
                            if (page.length > 0)
                                if (page[0].innerText != "")
                                    act = parseInt(page[0].innerText) + 1 - minNode;

                            SetNodeHTML(minNode, minNode + defaults.page.maxNode);

                            $(gridID + "_pagination" + " li").eq(act + 1).addClass("active");

                            $(gridID + "_txt").val(act + 1);

                            var crrPage = parseInt(page[0].innerText);

                            var form = (crrPage - 1) * defaults.pageSize;
                            var to = form + parseInt(defaults.pageSize);


                            if (defaults.paging == "server") {
                                if (!Emcsoft.Common.isNullOrEmty(defaults.page.eventPaging)) {
                                    window[defaults.page.eventPaging](form, to);
                                }
                            }
                            else {

                                var dataFilter = $.grep(dataSource, function (val, i) {
                                    return i >= form && i < to
                                });


                                if (dataFilter.length < defaults.pageSize && defaults.emtyRow)
                                    Emcsoft.Common.parseData(dataFilter, columns, defaults.pageSize);

                                grid.setData(dataFilter, false);
                                grid.render();
                            }
                            if (minNode + defaults.page.maxNode >= nodeCount) {

                                $(gridID + "_pagination li").eq(defaults.page.maxNode + 2).addClass("disabled");
                                $(gridID + "_pagination li").eq(defaults.page.maxNode + 3).addClass("disabled")
                                return false;
                            }



                            break;
                        }

                    case "»»":
                        {


                            minNode = (nodeCount - defaults.page.maxNode < 0 ? 0 : nodeCount - defaults.page.maxNode);



                            SetNodeHTML(minNode, nodeCount);

                            $nextPage = $(gridID + "_pagination li").eq(defaults.page.maxNode + 2);
                            $lastPage = $(gridID + "_pagination li").eq(defaults.page.maxNode + 3);


                            $(gridID + "_pagination" + " li").eq(2).addClass("active");

                            $nextPage.addClass("disabled");
                            $lastPage.addClass("disabled");

                            $(gridID + "_txt").val(1);

                            var page = $(gridID + "_pagination li").filter(".active");

                            var crrPage = parseInt(page[0].innerText);

                            var form = (crrPage - 1) * defaults.pageSize;
                            var to = form + parseInt(defaults.pageSize);

                            if (defaults.paging == "server") {
                                if (!Emcsoft.Common.isNullOrEmty(defaults.page.eventPaging)) {
                                    window[defaults.page.eventPaging](form, to);
                                }
                            }
                            else {
                                var dataFilter = $.grep(dataSource, function (val, i) {
                                    return i >= form && i < to
                                });

                                if (dataFilter.length < defaults.pageSize && defaults.emtyRow)
                                    Emcsoft.Common.parseData(dataFilter, columns, defaults.pageSize);

                                grid.setData(dataFilter, false);
                                grid.render();
                            }
                            break;
                        }

                    case "«":
                        {


                            if (minNode <= 0) {
                                return false;
                            }

                            minNode--;

                            var page = $(gridID + "_pagination li").filter(".active");


                            var act = 2;
                            if (page.length > 0)
                                if (page[0].innerText != "")
                                    act = parseInt(page[0].innerText) - minNode - 1;

                            SetNodeHTML(minNode, minNode + defaults.page.maxNode);


                            $(gridID + "_pagination" + " li").eq(act + 1).addClass("active");

                            $(gridID + "_txt").val(act + 1);



                            var crrPage = parseInt(page[0].innerText);

                            var form = (crrPage - 1) * defaults.pageSize;
                            var to = form + parseInt(defaults.pageSize);

                            if (defaults.paging == "server") {
                                if (!Emcsoft.Common.isNullOrEmty(defaults.page.eventPaging)) {
                                    window[defaults.page.eventPaging](form, to);
                                }
                            }
                            else {
                                var dataFilter = $.grep(dataSource, function (val, i) {
                                    return i >= form && i < to
                                });

                                if (dataFilter.length < defaults.pageSize && defaults.emtyRow)
                                    Emcsoft.Common.parseData(dataFilter, columns, defaults.pageSize);

                                grid.setData(dataFilter, false);
                                grid.render();
                            }

                            if (minNode <= 0) {
                                $(gridID + "_pagination li").eq(0).addClass("disabled");
                                $(gridID + "_pagination li").eq(1).addClass("disabled")
                                return false;
                            }

                            break;
                        }

                    case "««":
                        {
                            minNode = 0;


                            SetNodeHTML(minNode, defaults.page.maxNode);

                            $(gridID + "_pagination li").eq(0).addClass("disabled");
                            $(gridID + "_pagination li").eq(1).addClass("disabled")
                            $(gridID + "_pagination" + " li").eq(2).addClass("active");
                            $(gridID + "_txt").val(2);



                            var page = $(gridID + "_pagination li").filter(".active");

                            var crrPage = parseInt(page[0].innerText);

                            var form = (crrPage - 1) * defaults.pageSize;
                            var to = form + parseInt(defaults.pageSize);

                            if (defaults.paging == "server") {
                                if (!Emcsoft.Common.isNullOrEmty(defaults.page.eventPaging)) {
                                    window[defaults.page.eventPaging](form, to);
                                }
                            }
                            else {
                                var dataFilter = $.grep(dataSource, function (val, i) {
                                    return i >= form && i < to
                                });

                                if (dataFilter.length < defaults.pageSize && defaults.emtyRow)
                                    Emcsoft.Common.parseData(dataFilter, columns, defaults.pageSize);

                                grid.setData(dataFilter, false);
                                grid.render();
                            }

                            break;
                        }

                    default:

                        $(gridID + "_pagination" + " li").removeClass("active");
                        this.setAttribute("class", "active");

                        $(gridID + "_txt").val(this.innerText);

                        if (Emcsoft.Common.toInt(this.innerText) == nodeCount) {
                            if ($(gridID + "_pagination li").eq(defaults.page.maxNode + 2).hasClass("disabled")) {
                                $(gridID + "_pagination li").eq(defaults.page.maxNode + 2).addClass("disabled");
                            }
                            if ($(gridID + "_pagination li").eq(defaults.page.maxNode + 3).hasClass("disabled")) {
                                $(gridID + "_pagination li").eq(defaults.page.maxNode + 3).addClass("disabled")
                            }
                        }

                        var crrPage = parseInt(this.innerText);

                        var form = (crrPage - 1) * defaults.pageSize;
                        var to = form + parseInt(defaults.pageSize);

                        if (defaults.paging == "server") {
                            if (!Emcsoft.Common.isNullOrEmty(defaults.page.eventPaging)) {
                                window[defaults.page.eventPaging](form, to);
                            }
                        }
                        else {
                            var dataFilter = $.grep(dataSource, function (val, i) {
                                return i >= form && i < to
                            });

                            if (dataFilter.length < defaults.pageSize && defaults.emtyRow)
                                Emcsoft.Common.parseData(dataFilter, columns, defaults.pageSize);

                            grid.setData(dataFilter, false);
                            grid.render();
                        }

                        break;
                }
            });
        }

        return this.grid;
    }

    this.dataBin = function (data) {
        if (this.grid == null) {
            throw new Error("Chưa khởi tạo grid");
        }

        var jsonData = [];
        if (typeof (data) == "string") {
            if (data != "") {
                jsonData = $.parseJSON(data);
            }
        }
        else
            jsonData = data;

        if (jsonData.length < this.config.pageSize && this.config.emtyRow)
            Emcsoft.Common.parseData(jsonData, this.columns, this.config.pageSize);

        this.data = jsonData;

        if (this.config.paging == "node") {
            var page = $(gridID + "_pagination li").filter(".active");


            var crrPage = 2;
            if (page.length > 0)
                if (page[0].innerText != "")
                    crrPage = parseInt(page[0].innerText);

            if (isNaN(crrPage)) {
                crrPage = 1;
            }
            var form = (crrPage - 1) * this.config.pageSize;
            var to = form + parseInt(this.config.pageSize);


            var dataFilter = $.grep(this.data, function (val, i) {
                return i >= form && i < to
            });


        }

        else

            dataFilter = this.data;

        this.grid.setData(dataFilter, false);
        this.grid.render();
    }


    this.deleteRow = function (index, countRowDel) {
        var data = this.getData();
        if (count == undefined)
            data.splice(indexRow, 1);
        else
            data.splice(indexRow, countRowDel);

        this.grid.setData(data);
        this.grid.render();
        this.grid.scrollRowIntoView(0, false);
    }


    this.getData = function () {
        var a_data = this.grid.getData(), a_data_r = [];
        var index = 0;
        for (var i = 0; i < a_data.length; i++) {
            if (!this.isNullOrEmtyRow(i)) {
                a_data_r[index] = a_data[i];
                index++;
            }
        }
        return a_data_r;
    }


    this.getValue = function (indexRow, colName) {
        var items = this.grid.getDataItem(indexRow);
        if (colName != undefined && colName != "") {
            var val = [];
            for (var i = 0; i < colName.length; i++) { 
                val[col] = items[colName[i]];
            }
            return val;
        }
        else
            return items;
    }

    this.getColumnIndex = function (colName) {
        var col = this.columns;
        col = Common.stringToJson(col);
        var pos = -1;
        for (var i = 0; i < col.length; i++) {
            if (col[i].field == colName) {
                pos = i;
            }
        }
        return pos;
    }

    this.setActiveRow = function (index) {
        this.grid.setSelectedRows([index]);
    }

    this.setActiveCell = function (rowIndex, cellIndex) {
        var cellIndex = this.getColumnIndex(cell);
        if (cellIndex == -1) return;
        this.grid.setActiveCell(rowIndex, cellIndex);
    }

    this.isNullOrEmtyRow = function (indexRow) {
        var valAct = this.getValue(indexRow);
        var flag = true;
        var columns = this.getObjectColumns();
        for (var i = 0; i < columns.length; i++) {
            if (eval("valAct[\"" + columns[i].field + "\"]!=''"))
                return false;
        }
        return flag;
    },
        this.setNewGrid = function () {
            var pageSize = this.config.pageSize();
            var data = new Array(), columns = this.getObjectColumns();
            if (this.config.emtyRow)
                Emcsoft.Common.parseData(data, columns, pageSize);

            this.grid.setData(data, false);
            this.grid.render();
        },
        this.getData = function (filter) {
            var a_data = this.grid.getData(), a_data_r = [];
            var index = 0;
            for (var i = 0; i < a_data.length; i++) {
                if (!this.isNullOrEmtyRow(i)) {
                    a_data_r[index] = a_data[i];
                    index++;
                }
            }
            return a_data_r;
        },
        this.getRowIndexFilter = function (colName, aVal, filter) {
            var data = this.getData();
            for (var j = 0; j < data.length; j++) {
                var log = true;
                for (var k = 0; k < colName.length; k++) {
                    var val = data[j][colName[k].toString()];
                    if (eval("val == null || !(val " + filter[k] + " aVal[k])")) { log = false; break; }
                }
                if (log)
                    return j;
            }
            return -1;
        },
        this.getRowIndexActive = function () {
            if (this.grid.getActiveCell() == null)
                return -1;
            var row = this.grid.getSelectedRows()[0];
            return row;
        },
        this.getValueActive = function (colName) {
            var rowIndex = this.getRowIndexActive();
            var items = this.grid.getDataItem(rowIndex);
            if (colName != undefined && colName != "") {
                var val = [];
                for (var i = 0; i < colName.length; i++) { 
                    val[col] = items[colName[i]];
                }
                return val;
            }
            else
                return items;
        },
        this.getValu = function (rowIndex, colName) {
            var items = this.grid.getDataItem(rowIndex);
            if (colName != undefined && colName != "") {
                var val = [];
                for (var i = 0; i < colName.length; i++) { 
                    val[col] = items[colName[i]];
                }
                return val;
            }
            else
                return items;
        },
        this.getValueFilter = function (colName, aVal, aCondi) {
            var data = this.getData();
            var aData = new Array();
            var k = 0;
            for (var i = 0; i < data.length; i++) {
                var log = true;
                for (var j = 0; j < colName.length; j++) {
                    var val = data[i][colName[j]];
                    var type = typeof (val);
                    if (type == "boolean")
                        val = val.toString() ;
                    if (eval("val == null || !(val " + aCondi[j] + " aVal[j])")) { log = false; break; }
                }
                if (log) {
                    aData[k] = data[i];
                    k++;
                }
            }
            return aData;
        },
        this.getObjectColumns = function () {
            return  this.columns;
        },
        this.getColumnIndex = function (colName) {
            var col = this.getObjectColumns();
            var pos = -1;
            for (var i = 0; i < col.length; i++) {
                if (col[i].field.toUpperCase() == colName.toUpperCase()) {
                    pos = i;
                }
            }
            return pos;
        },
        this.getColumnByIndex = function (index) {
        var col = this.getObjectColumns();
        col = Emcsoft.Common.stringToJson(col);
            return col[index].field;
        },
        this.updateRow = function (rowIndex, colNames, values) {
            var data = this.getData();
            if (data.length < 0 && rowIndex > data.length) return;

            for (var i = 0; i < colNames.length; i++) {
                data[rowIndex][colNames[i]] = values[i];
            }
            this.grid.updateRow(rowIndex);

            $("#" + this.gridID + " input[type=\"checkbox\"][name=\"checkgrid\"]").change(function () {
                var row = $(this).attr("row"), name = $(this).attr("field");
                var checked = $(this).prop('checked');
                $(this).attr("value", (checked ? "TRUE" : "FALSE"));
                data[row][name.toString()] = (checked ? "TRUE" : "FALSE");
            });
        },
        this.updateCell = function (rowIndex, cell, val) {
            var pos = this.getColumnIndex(cell);
            if (pos == -1) {
                Emcsoft.Msg.show("Thông báo", "Không lấy được vị trí cột");
                return;
            }
            var data = this.getData();
            if (data.length < 0 && rowIndex > data.length) return; 
            data[rowIndex][cell] = val;
            this.grid.updateCell(rowIndex, pos);
        },
        this.updateData = function (colNames, values) {
            var a_data = this.getData();
            for (var i = 0; i < a_data.length; i++) {
                if (!this.isNullOrEmtyRow(i)) {
                    for (var j = 0; j < colNames.length; j++) {
                        a_data[i][colNames[j]] = values[j];
                    }
                    this.grid.updateRow(i);
                }
            }

            $("#" + this.gridID + " input[type=\"checkbox\"][name=\"checkgrid\"]").change(function () {
                var row = $(this).attr("row"), name = $(this).attr("field");
                var checked = $(this).prop('checked');
                $(this).attr("value", (checked ? "TRUE" : "FALSE"));
                a_data[row][name.toString()] = (checked ? "TRUE" : "FALSE");
            });
        },
        this.rowUpData = function () {
            var a_data = this.getData();
            var i = this.getRowIndexActive();
            if (this.isNullOrEmtyRow(i)) return false;
            var pageSize = parseInt(this.config.pageSize);
            var val = this.getValueActive();
            a_data.splice(i, 1);
            if (i == 0) i = a_data.length + 1;
            a_data.splice(i - 1, 0, val);
            var columns = this.getObjectColumns();
            if (this.config.emtyRow)
                Emcsoft.Common.parseData(a_data, columns, pageSize);
            this.grid.setData(a_data);
            this.grid.render();
            this.setActiveRow(i - 1);
        },
        this.rowDownData = function () {
            var a_data = this.getData();
            var i = this.getRowIndexActive();
            if (this.isNullOrEmtyRow(i)) return false;
            var val = this.getValueActive();
            a_data.splice(i, 1);
            if (i == a_data.length) i = -1;
            a_data.splice(i + 1, 0, val);

            var columns = Common.stringToJson(this.get_columns());
            var pageSize = parseInt(this.get_pageSize());
            Common.parseData(a_data, columns, pageSize);
            this.grid.setData(a_data);
            this.grid.render();
            this.setActiveRow(i + 1);
        },
        this.getDataLength = function () {
            return this.grid.getDataLength();
        },

        this.resetActiveRow = function () {
            this.setActiveRow(-1);
            this.resetActiveCell();
        },
        this.resetActiveCel = function () {
            this.grid.resetActiveCell();
        },

        this.insertRow = function (rowIndex, row) {
            var data = this.getData();
            if (rowIndex == undefined && rowIndex == "")
                rowIndex = data.length + 1;
            if (row == undefined || row == "") {
                row = [];
                var col = this.getObjectColumns();
                for (var i = 0; i < col.length; i++)
                    row[col[i].field] = "";
            }

            data.splice(rowIndex, 0, row);
            var columns = this.getObjectColumns();
            var pageSize = parseInt(this.config.pageSize);

            if (this.config.emtyRow) {
                Emcsoft.Common.parseData(data, columns, pageSize);
            }

            this.grid.setData(data);
            this.grid.render();
            this.grid.scrollRowIntoView(rowIndex, false);
        }
}

function onlyNumber(event, ctr) {
    var keyCode = Emcsoft.Common.getKeyCode(event);
    if (keyCode != 46 && keyCode != 110) {

        if (keyCode == keycode.ENTER || keyCode == keycode.TAB) {
            var gridID = ctr.id.split("_")[0];
            var $elNode = $("#" + gridID + "_pagination");

            var currentPage = ctr.value;
            var newValue = String.fromCharCode(keyCode);
            var total = Emcsoft.Common.toInt($("#" + gridID + "_total").attr("total"));

            if (total < 0) {
                return;
            }

            if (Emcsoft.Common.toInt(newValue) > total) {
                ctr.value = total.toString();
            }
        }
        else if (!Emcsoft.Common.isKeyDigit(keyCode)) {
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
            return false;
        }
    }
}





