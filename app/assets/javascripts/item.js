$(document).on('turbolinks:load', ()=> {
  // 画像用のinputを生成する関数
  let buildFileField = (index)=> {
    let html = `<div data-index="${index}" class="js-file_group">
                    <input class="js-file" type="file"
                    name="item[item_images_attributes][${index}][src]"
                    id="item_images_attributes_${index}_src"><br>
                    <div class="js-remove">削除</div>
                  </div>`;
    return html;
  }

  // file_fieldのnameに動的なindexをつける為の配列
  let fileIndex = [1,2,3,4,5,6,7,8,9,10];
  
  $('.form-image__box').on('change', '.js-file', function(e) {
    // fileIndexの先頭の数字を使ってinputを作る
    $('.form-image__box').append(buildFileField(fileIndex[0]));
    fileIndex.shift();
    // 末尾の数に1足した数を追加する
    fileIndex.push(fileIndex[fileIndex.length - 1] + 1)
  });
    
    //削除の処理
    $('.form-image__box').on('click', '.js-remove', function() {
      $(this).parent().remove();
      // 画像入力欄が0個にならないようにしておく
      if ($('.js-file').length == 0) $('.form-image__box').append(buildFileField(fileIndex[0]));
    });
});