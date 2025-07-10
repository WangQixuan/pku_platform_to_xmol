$(window).bind("load", function () {
    chrome.storage.local.get("reagent_info", function(result) {
        var reagent_info = result.reagent_info;
        if (reagent_info !== undefined) {
            chrome.storage.local.remove("reagent_info", function() {
                $('#ivSearchForm > div > div.col-md-5 > a:nth-child(1)')[0].click();
                var runcheck = setInterval(function () {
                    if ($('input[name=cas]').length != 0) {
                        clearInterval(runcheck);
                        $('input[name=cas]').val(reagent_info['casno']);
                        $('input[name=brand]').val(reagent_info['品牌']);
                        $('input[name=supplier]').val(reagent_info['供货商名称']);
                        $('input[name=purity]').val(reagent_info['纯度']);
                        $('input[name=specificationUnit]').val(reagent_info['包装规格']);
                        $('input[name=category]').val(reagent_info['产品分类']);
                        $('input[name=code]').val(reagent_info['货号']);
                        $('input[name=price]').val(reagent_info['单价']);
                        setTimeout(function (){
                            $('input[name=nameZh]').val(reagent_info['中文品名']);
                            $('input[name=nameEn]').val(reagent_info['英文品名']);
                        },300);
                    }
                }, 200);
            });
        }
    });
})
