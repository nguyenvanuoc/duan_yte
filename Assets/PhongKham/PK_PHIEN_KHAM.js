
var PK_PHIEN_KHAM = function (pLog) {

    this.URL = "";


    this.ID_DONVI = '';
    this.ID_PHIEN_KHAM = '';
    this.ID_BENH_NHAN = '';
    this.LY_DO_KHAM = '';
    this.HOI_BENH = '';
    this.ID_NHOM_PHIEN_KHAM = '';
    this.BAC_SY_KHAM = '';
    this.TG_TAO_PHIEN = '';
    this.TRANG_THAI = '';
    this.GHI_CHU = '';
    this.CHAN_DOAN = '';
    this.NGUOI_TAO_PHIEN = '';

    // PK
    this.NGUOI_TAO_PHIEN_TEN = '';
    this.BAC_SY_KHAM_TEN = '';

    this.isLog = pLog;
    this.ChiTiet = null;
    this.DanhSach = [];
    var that = this;

    this.add = function () {
        var _send = {
            ID_DONVI: that.ID_DONVI,
            ID_PHIEN_KHAM: that.ID_PHIEN_KHAM,
            ID_BENH_NHAN: that.ID_BENH_NHAN,
            LY_DO_KHAM: that.LY_DO_KHAM,
            HOI_BENH: that.HOI_BENH,
            ID_NHOM_PHIEN_KHAM: that.ID_NHOM_PHIEN_KHAM,
            BAC_SY_KHAM: that.BAC_SY_KHAM,
            TG_TAO_PHIEN: that.TG_TAO_PHIEN,
            TRANG_THAI: that.TRANG_THAI,
            GHI_CHU: that.GHI_CHU,
            CHAN_DOAN: that.CHAN_DOAN,
            NGUOI_TAO_PHIEN: that.NGUOI_TAO_PHIEN
        };
        var _rs = null;
        var request = $.ajax({
            url: this.URL+"/TiepNhan/phienkham_add",
            type: "POST",
            data: JSON.stringify(_send),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            async: false
        });

        request.done(function (_response) {
            _rs = _response;
        });

        request.fail(function (jqXHR, textStatus) {
            _rs = { CODE: 'ERR', MESSAGE: textStatus };
            console.log("Lỗi tại server: " + textStatus);
        });

        return _rs;
    }

    this.lichsukham_find_01 = function () {
        var _rs = null;
        var _send = { 'p_ID_BENH_NHAN': that.ID_BENH_NHAN };
        var request = $.ajax({
            url: this.URL+"/TiepNhan/lichsukham_find_01",
            type: "POST",
            data: JSON.stringify(_send),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            async: false
        });

        request.done(function (_response) {
            _rs = _response;
            that.log('Lịch sử khám', _rs);
            if (_rs.CODE == 'SUC') {
                that.DanhSach = _rs.OBJECT;
            } else {
                alert('Lỗi:' + _rs.MESSAGE + that.ID_BENH_NHAN);
            }
            
        });

        request.fail(function (jqXHR, textStatus) {
            alert("Lỗi tại server: " + textStatus);
        });

        return _rs;
    }

    this.get = function () {
        var _rs = null;
        var _send = {ID_PHIEN_KHAM: that.ID_PHIEN_KHAM};
        var request = $.ajax({
            url: this.URL+"/TiepNhan/phienkham_get",
            type: "POST",
            data: JSON.stringify(_send),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            async: false
        });

        request.done(function (_response) {
            var _obj = _response;
            that.log('_obj', _obj);
            if (_obj.CODE == 'SUC') {
                that.ID_DONVI = _obj.OBJECT.ID_DONVI;
                that.ID_PHIEN_KHAM = _obj.OBJECT.ID_PHIEN_KHAM;
                that.ID_BENH_NHAN = _obj.OBJECT.ID_BENH_NHAN;
                that.LY_DO_KHAM = _obj.OBJECT.LY_DO_KHAM;
                that.HOI_BENH = _obj.OBJECT.HOI_BENH;
                that.ID_NHOM_PHIEN_KHAM = _obj.OBJECT.ID_NHOM_PHIEN_KHAM;
                that.BAC_SY_KHAM = _obj.OBJECT.BAC_SY_KHAM;
                that.TG_TAO_PHIEN = _obj.OBJECT.TG_TAO_PHIEN;
                that.TRANG_THAI = _obj.OBJECT.TRANG_THAI;
                that.GHI_CHU = _obj.OBJECT.GHI_CHU;
                that.CHAN_DOAN = _obj.OBJECT.CHAN_DOAN;
                that.NGUOI_TAO_PHIEN = _obj.OBJECT.NGUOI_TAO_PHIEN;
            } else {
                alert('Lỗi: ' + _obj.MESSEAGE);
            }
            _rs = _obj;

        });

        request.fail(function (jqXHR, textStatus) {
            alert("Lỗi tại server: " + textStatus);
        });
        return _rs;

    }
    
    this.edit = function () {
        var _send = {
            ID_DONVI: that.ID_DONVI,
            ID_PHIEN_KHAM: that.ID_PHIEN_KHAM,
            ID_BENH_NHAN: that.ID_BENH_NHAN,
            LY_DO_KHAM: that.LY_DO_KHAM,
            HOI_BENH: that.HOI_BENH,
            ID_NHOM_PHIEN_KHAM: that.ID_NHOM_PHIEN_KHAM,
            BAC_SY_KHAM: that.BAC_SY_KHAM,
            TG_TAO_PHIEN: that.TG_TAO_PHIEN,
            TRANG_THAI: that.TRANG_THAI,
            GHI_CHU: that.GHI_CHU,
            CHAN_DOAN: that.CHAN_DOAN,
            NGUOI_TAO_PHIEN: that.NGUOI_TAO_PHIEN
        };
        var _rs = null;
        var request = $.ajax({
            url: this.URL+"/TiepNhan/phienkham_edit",
            type: "POST",
            data: JSON.stringify(_send),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            async: false
        });

        request.done(function (_response) {
            _rs = _response;
        });

        request.fail(function (jqXHR, textStatus) {
            _rs = { CODE: 'ERR', MESSAGE: textStatus };
            console.log("Lỗi tại server: " + textStatus);
        });

        return _rs;
    }

    this.delete = function () {
        var _send = {
            ID_PHIEN_KHAM: that.ID_PHIEN_KHAM
        };
        var _rs = null;
        var request = $.ajax({
            url: this.URL+"/TiepNhan/phienkham_delete",
            type: "POST",
            data: JSON.stringify(_send),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            async: false
        });

        request.done(function (_response) {
            _rs = _response;
        });
        request.fail(function (jqXHR, textStatus) {
            alert("Lỗi tại server: " + textStatus);
        });
        return _rs;
    }

    this.log = function (pTitle,pMsg) {
        if (this.isLog == 1) {
            console.log(pTitle + '>>', pMsg);
        }
    }
}