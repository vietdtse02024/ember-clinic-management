import Component from '@ember/component';
import $ from 'jquery';
import Changeset from 'ember-changeset';
import { FunctionNames } from 'ember-clinic-management/utils/enums';
import { inject as service } from '@ember/service';
import BarcodeValidations from 'ember-clinic-management/validations/product/barcode';
import lookupValidator from "ember-changeset-validations";
import numeral from 'numeral';

export default Component.extend({
  ajax: service(),
  barcode : "",
  paperWitdth: 312,
  paperHeight: 71,
  productUnits : null,
  init() {
    this._super(...arguments);
    $("#tab-product").addClass('active');
    this.changeset = new Changeset(this, lookupValidator(BarcodeValidations), BarcodeValidations, { skipValidate : true });
    this.send('initProductInit');
  },
  actions:{
    createPdf : function(){
      let self = this;
      let changeset = self.get('changeset');
      let snapshot = changeset.snapshot();
      let ajax = self.get('ajax');
      changeset.validate().then(() => {
        if (changeset.get('isValid')) {
          changeset.execute();
          changeset.save();
          let url = 'functions.php?function='+ FunctionNames.PRODUCT.BARCODE_INFO + '&productCode=' + changeset.get('productCode') + '&unitId=' + changeset.get('unitId');
          ajax.get(url).then((r) => {
            if (r.type === 'DATA') {
              let price = numeral(r['price']).format('#,#'), productName = r['productName'];
              let width = self.get('paperWitdth');
              let height = self.get('paperHeight');
              let docDefinition = {
                pageSize: {width: width, height: height},
                pageOrientation: 'landscape',
                pageMargins: [0, 0],
                content: [
                  {
                    columns: [
                      {
                        text: 'Nhà thuốc 20',
                      },
                      {
                        text: 'Nhà thuốc 20',
                      },
                      {
                        text: 'Nhà thuốc 20',
                      },
                    ],
                    margin: [0, 8, 0, 0],
                    width: width/3,
                    fontSize : 8,
                    alignment: 'center'
                  },
                  {
                    columns: [
                      {
                        image: $("#barcodeImg").attr('src'),
                        width: width/3,
                      },
                      {
                        image: $("#barcodeImg").attr('src'),
                        width: width/3,
                      },
                      {
                        image: $("#barcodeImg").attr('src'),
                        width: width/3,
                      },

                    ],
                    alignment: 'center',

                  },
                  {
                    columns: [
                      {
                        text: productName,
                      },
                      {
                        text: productName,
                      },
                      {
                        text: productName,
                      },

                    ],
                    width: width/3,
                    fontSize : 6,
                    alignment: 'center'
                  },
                ],
              };
              if (changeset.get('priceChecked') == 1) {
                docDefinition.content.push({
                  columns: [
                    {
                      text: 'Giá: ' + price + "đ",
                    },
                    {
                      text: 'Giá: ' + price + "đ",
                    },
                    {
                      text: 'Giá: ' + price + "đ",
                    },

                  ],
                  width: width/3,
                  fontSize : 6,
                  alignment: 'center'
                });

              }
              let pdfDocGenerator = pdfMake.createPdf(docDefinition);
              pdfDocGenerator.getBlob((blob) => {
                var url = URL.createObjectURL(blob);
                printJS(url);
              });
            }
          });

        }
      }).catch(() => {
        changeset.restore(snapshot);
      });
    },
    initProductInit : function () {
      let self = this;
      let ajax = self.get('ajax');
      let changeset = self.get('changeset');
      if (changeset.get('productCode')) {
        self.set('barcode', changeset.get('productCode'));
        let url = 'functions.php?function='+ FunctionNames.PRODUCT.INIT_PRODUCT_UNIT + '&productCode=' + changeset.get('productCode');
        ajax.get(url).then((r) => {
          if (r.type === 'DATA') {
            self.set('productUnits', r.productUnits);
            self.set('productUnit', null);
            changeset.set('unitId', null);
          }
        });
      }

    }
  }

});
