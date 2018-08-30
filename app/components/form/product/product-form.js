import BaseCompenent from 'ember-clinic-management/components/common/base-component';
import ProductValidations from 'ember-clinic-management/validations/product/product';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';
import $ from 'jquery';
import { FunctionNames } from 'ember-clinic-management/utils/enums';


export default BaseCompenent.extend({
  resultSearch : null,
  sellType : null,
  productUnit : null,
  successMsg : null,
  errorMsg : null,
  productId : null,
  test : 5230/100,
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
      ajax.get('search-product.php?productId=' + this.get('changeset').get('productIdSearch')).then((r) => {
        if (r.type === 'DATA' && r.data) {
          self.set('resultSearch', r.data);
        }
      });
    },
    editProduct(item){
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
          supplier : item.SupplierID,
          importPrice : item.ImportPrice
        });
        this.setProperties({
          productGroup : item.GroupID,
          country : item.CountryID,
          producter : item.ProducterID,
          supplier : item.SupplierID,
          note : item.Descriptions,
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
          supplier : null,
          importPrice : null
        });
        this.setProperties({
          productGroup : null,
          country : null,
          producter : null,
          supplier : null,
          note : null,
          productId : null
        });
        this.fillDataToEditTable();
      }
      $("#edit").modal({
        refresh: true
      });
    },
    saveEditCustomer(){
      let self = this;
      let ajax = this.get('ajax');
      let changeset = this.get('changeset');
      let jsonData = {
        "customerName": changeset.get('customerName'),
        "phoneNo": changeset.get('phoneNo'),
        "email": changeset.get('email'),
        "province" : changeset.get('province'),
        "district" : changeset.get('district'),
        "address" : changeset.get('address'),
        "note" : self.get('note'),
        "customerId": self.get('customerId')
      };

      ajax.postJsonData('save-customer.php', jsonData).then((r) => {
        if (r && r.result == "SUCCESS") {
          self.set('successMsg', "Cập nhật thông tin thành công");
          self.set('errorMsg', null);

        } else {
          self.set('errorMsg', r.message);
          self.set('successMsg', null);
        }
        self.searchCustomer();

      }, function () {
        self.set('errorMsg', "Có lỗi xảy ra.");
        self.set('successMsg', null);
      });
      $('#edit').modal('toggle');
    },
    deleteProduct(productId){
      this.set('productId', productId);
      $("#delete").modal({
        refresh: true
      });
    },
    search() {
      this.setProperties({
        successMsg: null,
        errorMsg: null
      });
      this.send("searchProduct");
    },
    calculateRate : function(index) {
      let rate = $("#rate" + index);
      let sellPrice = $("#price" + index);
    }
  }
});
