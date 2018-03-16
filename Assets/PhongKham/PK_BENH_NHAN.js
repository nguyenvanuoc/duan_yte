
var PK_BENH_NHAN = function (pLog) {
    //Quannm: Thêm url
    this.URL = "";

    this.ID_DVI = '';
    this.ID_BENH_NHAN = '';
    this.HO_DEM = '';
    this.TEN = '';
    this.GIOI_TINH = '';
    this.NGAY_SINH = '';
    this.NGHE_NGHIEP = '';
    this.HON_NHAN = '';
    this.SO_NHA = '';
    this.DIA_CHI = '';
    this.SO_DIEN_THOAI = '';
    this.EMAIL = '';
    this.SO_CMT_HC = '';
    this.HOI_BENH = '';
    this.ID_TAI_KHOAN = '';
    this.TG_TIEP_NHAN = '';
    this.GHI_CHU = '';
    this.TRANG_THAI = '';
    this.HINH_ANH = '';

    // Liên kết ngoài
    this.TEN_DIA_BAN = null

    this.isLog = pLog;
    this.ChiTiet = null;
    this.DanhSach = [];
    var that = this;

    this.add = function () {
        var _send = {
            ID_DVI: that.ID_DVI,
            ID_BENH_NHAN: that.ID_BENH_NHAN,
            HO_DEM: that.HO_DEM,
            TEN: that.TEN,
            GIOI_TINH: that.GIOI_TINH,
            NGAY_SINH: that.NGAY_SINH,
            NGHE_NGHIEP: that.NGHE_NGHIEP,
            HON_NHAN: that.HON_NHAN,
            SO_NHA: that.SO_NHA,
            DIA_CHI: that.DIA_CHI,
            SO_DIEN_THOAI: that.SO_DIEN_THOAI,
            EMAIL: that.EMAIL,
            SO_CMT_HC: that.SO_CMT_HC,
            HOI_BENH: that.HOI_BENH,
            ID_TAI_KHOAN: that.ID_TAI_KHOAN,
            TG_TIEP_NHAN: that.TG_TIEP_NHAN,
            GHI_CHU: that.GHI_CHU,
            TRANG_THAI: that.TRANG_THAI,
            HINH_ANH: that.HINH_ANH
        };
        var _rs = null;
        var request = $.ajax({
            url: this.URL+"/TiepNhan/benhnhan_add",
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

    this.find_01 = function (pTrangThai,pTuKhoa) {
        var _rs = null;
        var _send = { 'pTrangThai':pTrangThai,'pTuKhoa': pTuKhoa };
        var request = $.ajax({
            url: this.URL +"/TiepNhan/benhnhan_find_01",
            type: "POST",
            data: JSON.stringify(_send),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            async: false
        });

        request.done(function (_response) {
            _rs = _response;
            that.log('_obj', _rs);
            if (_rs.CODE == 'SUC') {
                that.DanhSach = _rs.OBJECT;
            }
            
        });

        request.fail(function (jqXHR, textStatus) {
            alert("Lỗi tại server: " + textStatus);
        });

        return _rs;
    }

    this.get = function () {
        var _rs = null;
        var _send = { ID_BENH_NHAN: that.ID_BENH_NHAN };
        var request = $.ajax({
            url: this.URL +"/TiepNhan/benhnhan_get",
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
                that.ID_DVI = _obj.OBJECT.ID_DVI;
                that.ID_BENH_NHAN = _obj.OBJECT.ID_BENH_NHAN;
                that.TEN = _obj.OBJECT.TEN;
                that.GIOI_TINH = _obj.OBJECT.GIOI_TINH;
                that.NGAY_SINH = _obj.OBJECT.NGAY_SINH.substring(0,10);
                that.NGHE_NGHIEP = _obj.OBJECT.NGHE_NGHIEP;
                that.HON_NHAN = _obj.OBJECT.HON_NHAN;
                that.DIA_CHI = _obj.OBJECT.DIA_CHI;
                that.SO_DIEN_THOAI = _obj.OBJECT.SO_DIEN_THOAI;
                that.SO_CMT_HC = _obj.OBJECT.SO_CMT_HC;
                that.GHI_CHU = _obj.OBJECT.GHI_CHU;
                that.TRANG_THAI = _obj.OBJECT.TRANG_THAI;

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
            ID_DVI: that.ID_DVI,
            ID_BENH_NHAN: that.ID_BENH_NHAN,
            HO_DEM: that.HO_DEM,
            TEN: that.TEN,
            GIOI_TINH: that.GIOI_TINH,
            NGAY_SINH: that.NGAY_SINH,
            NGHE_NGHIEP: that.NGHE_NGHIEP,
            HON_NHAN: that.HON_NHAN,
            SO_NHA: that.SO_NHA,
            DIA_CHI: that.DIA_CHI,
            SO_DIEN_THOAI: that.SO_DIEN_THOAI,
            EMAIL: that.EMAIL,
            SO_CMT_HC: that.SO_CMT_HC,
            HOI_BENH: that.HOI_BENH,
            ID_TAI_KHOAN: that.ID_TAI_KHOAN,
            TG_TIEP_NHAN: that.TG_TIEP_NHAN,
            GHI_CHU: that.GHI_CHU,
            TRANG_THAI: that.TRANG_THAI,
            HINH_ANH: that.HINH_ANH
        };
        var _rs = null;
        var request = $.ajax({
            url: this.URL +"/TiepNhan/benhnhan_edit",
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
        var _send = { ID_BENH_NHAN: that.ID_BENH_NHAN };
        var _rs = null;
        var request = $.ajax({
            url: this.URL +"/TiepNhan/benhnhan_delete",
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

    this.finish = function () {
        var _send = { ID_BENH_NHAN: that.ID_BENH_NHAN };
        var _rs = null;
        var request = $.ajax({
            url: this.URL +"/TiepNhan/benhnhan_finish",
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