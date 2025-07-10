function load_plugin() {
    console.log(location.hash);
    if (location.hash == '#/personal/list?query=vueshop%E6%88%91%E7%9A%84%E8%AE%A2%E5%8D%95p') {
    } else if (/#\/product\/detail\?id=(\d*).*/.test(location.hash)) {
        var load_div = setInterval(function () {
            var div_info = $('div.info');
            if (div_info.length != 0) {
                clearInterval(load_div);
                var button_jq = $("<button type='button' class='el-button el-button--primary'>一键入库</button>");
                button_jq.click(submit_info);
                $('div.info').append(button_jq);
                if (location.hash.indexOf('in_storage=1') != -1) {
                    submit_info();
                }
            }
        }, 1000);

        function submit_info() {
            var e_link_re = /#\/product\/detail\?id=(\d*).*/.exec(location.hash);
            $.post('https://reagent.pku.edu.cn/Jpost', 'query=jk%E4%BA%A7%E5%93%81%E8%AF%A6%E6%83%85&%E4%BA%A7%E5%93%81id=' + e_link_re[1], function (e_item_data) {
                chrome.storage.local.set({
                    "reagent_info": JSON.parse(e_item_data).data[0]
                }, function () {
                    if (chrome.runtime.lastError) {
                        console.error("存储失败:", chrome.runtime.lastError);
                    } else {
                        window.open("https://www.x-mol.com/group/iv/index");
                    }
                });
                if (location.hash.indexOf('in_storage=1') != -1) {
                    window.close();
                }
            });
        }
    }
}

$(window).bind("load", load_plugin);
$(window).bind("hashchange", load_plugin);

