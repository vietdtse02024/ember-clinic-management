import BaseCompenent from 'ember-clinic-management/components/common/base-component';
import ProductValidations from 'ember-clinic-management/validations/product/product';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';
import $ from 'jquery';
import { FunctionNames } from 'ember-clinic-management/utils/enums';
import numeral from 'numeral';

import { copy } from '@ember/object/internals';

export default BaseCompenent.extend({
  resultSearch : null,
  sellType : null,
  productUnit : null,
  successMsg : null,
  errorMsg : null,
  productId : null,
  importPrice : null,
  init() {
    this._super(...arguments);
    this.changeset = new Changeset(this, lookupValidator(ProductValidations), ProductValidations, { skipValidate : true });
    this.send("searchProduct");

  },
  fillDataToEditTable : function (productId) {
    let self = this;
    let ajax = self.get('ajax');
    let url = 'functions.php?function='+ FunctionNames.PRODUCT.DATA_EDIT_TABLE;
    if (productId) {
      url = 'functions.php?function='+ FunctionNames.PRODUCT.DATA_EDIT_TABLE + '&productId=' + productId;
    }
    ajax.get(url).then((r) => {
      if (r.type === 'DATA') {
        self.set('sellType', r.sellTypeData);
        self.set('productUnit', r.productUnitData);
      }
    });
  },
  actions:{
    searchProduct() {
      let ajax = this.get('ajax');
      let self = this;
      ajax.get('product/search-product.php?productId=' + this.get('changeset').get('productIdSearch')).then((r) => {
        if (r.type === 'DATA' && r.data) {
          self.set('resultSearch', r.data);
        }
      });
    },
    editProduct(item){
      this.setProperties({
        successMsg: null,
        errorMsg: null
      });
      let ajax = this.get('ajax');
      let changeset = this.get('changeset');
      if (item) {
        this.set('editModalTitle', "Cập nhật thông tin sản phẩm");
        changeset.setProperties({
          productCode : item.ProductCode,
          productName : item.ProductName,
          productGroup : item.GroupID,
          country : item.CountryID,
          producter : item.ProducterID,
          supplier : item.SupplierID
        });
        this.setProperties({
          productGroup : item.GroupID,
          country : item.CountryID,
          producter : item.ProducterID,
          supplier : item.SupplierID,
          note : item.Descriptions,
          importPrice : numeral(item.ImportPrice).format('#,#'),
          productId : item.ID
        });
        this.fillDataToEditTable(item.ID);
      } else {
        this.set('editModalTitle', "Thêm mới sản phẩm");
        changeset.setProperties({
          productCode : null,
          productName : null,
          productGroup : null,
          country : null,
          producter : null,
          supplier : null

        });
        this.setProperties({
          productGroup : null,
          country : null,
          producter : null,
          supplier : null,
          note : null,
          productId : null,
          importPrice : 0
        });
        this.fillDataToEditTable();
      }
      this.openModal('edit');
    },
    saveEditProduct(){
      let self = this;
      let ajax = this.get('ajax');
      let changeset = this.get('changeset');
      let jsonData = {
        "productId": self.get('productId'),
        "productCode": changeset.get('productCode'),
        "productName": changeset.get('productName'),
        "supplier": changeset.get('supplier'),
        "productGroup" : changeset.get('productGroup'),
        "country" : changeset.get('country'),
        "producter" : changeset.get('producter'),
        "note" : self.get('note'),
        "importPrice": self.convertStringToNumber(self.get('importPrice').toString()),
        "sellType" : self.get('sellType')
      };
      var checkedUnitList = new Array();
      self.get('productUnit').forEach(function(r) {
        if (r.checked === 'true') {
          checkedUnitList.push(r);
        }
      });
      jsonData.productUnit = checkedUnitList;

      let snapshot = changeset.snapshot();
      changeset.validate().then(() => {
        if (changeset.get('isValid')) {
          changeset.execute();
          changeset.save();
          if (checkedUnitList.length === 0) {
            self.setProperties({
              errorMsg : "Bạn hãy chọn đơn vị sử dụng cho sản phẩm"
            });
            self.toggleModal('edit');
            return;
          }

          ajax.postJsonData('product/save-product.php', jsonData).then((r) => {
            if (r && r.result == "SUCCESS") {
              self.set('successMsg', "Cập nhật thông tin thành công");
              self.set('errorMsg', null);

            } else {
              self.set('errorMsg', r.message);
              self.set('successMsg', null);
            }
            self.send("searchProduct");

          }, function () {
            self.set('errorMsg', "Có lỗi xảy ra.");
            self.set('successMsg', null);
          });
          self.toggleModal('edit');
        }
      }).catch(() => {
        changeset.restore(snapshot);
      });


    },
    deleteProduct(productId){
      this.set('productId', productId);
      this.openModal('delete');
    },
    search() {
      this.setProperties({
        successMsg: null,
        errorMsg: null
      });
      this.send("searchProduct");
    },
    calculateRate : function(index) {
      let sellTypeData = copy(this.get('sellType'), true) ;
      let importPrice = this.convertStringToNumber(this.get('importPrice'));
      let obj = sellTypeData[index];
      let sellPrice = this.convertStringToNumber($("#price" + index).val());
      let result = (sellPrice - importPrice)/importPrice * 100;
      obj['Price'] = sellPrice.toString();
      obj['InterestRate'] = result.toString();
      this.set('sellType', sellTypeData);
    },
    calculateSellPrice : function() {
      let self = this;
      self.set('importPrice', numeral(self.get('importPrice')).format('#,#'));
      let importPrice = self.convertStringToNumber(self.get('importPrice'));
      let sellTypeData = copy(this.get('sellType'), true) ;
      sellTypeData.forEach(function(r) {
        let rate = r['InterestRate'];
        let result =  importPrice + (importPrice * self.convertStringToNumber(rate)/100);
        r['Price'] = result.toString();
      });
      self.set('sellType', sellTypeData);
    },
    checkedUnit : function(e) {
      let productUnit = copy(this.get('productUnit'), true) ;
      let obj = productUnit[e.getAttribute('index')];
      obj.checked = e.checked.toString();
      this.set('productUnit', productUnit);
    }
  }
});
